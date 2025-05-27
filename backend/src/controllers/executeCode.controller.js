import { db } from "../libs/db.js";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, expected_outputs, problemId , stdin} = req.body;
    console.log("before");
    console.log("body", req.body);
    console.log("after");

    const userId = req.user.id;
    console.log("userId", userId);

    // validate testcases
    console.log("sdin" ,stdin);

    if (
      !Array.isArray(stdin) ||
      stdin.length == 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid or Missing test cases",
      });
    }

    // prepare each testcases for judge0

    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
      // base64_encoded: false,
      // wait:false
    }));

    // send this batch of submission to judge0

    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    // poll judge0 dor result of all submitted test cases

    const results = await pollBatchResults(tokens);

    console.log("result :", results);

    // analyze test cases

    let allPassed = true;
    const detaildResults = results.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i].trim();

      const passed = stdout === expected_output;

      if (!passed) {
        allPassed = false;
      }

      return {
        testcases: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB ` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    console.log("detail result : ", detaildResults);

    // store submission summary

    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        source_code: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detaildResults.map((r) => r.stdout)),
        stderr: detaildResults.some((r) => r.stderr)
          ? JSON.stringify(detaildResults.map((r) => r.stderr))
          : null,
        compileOutput: detaildResults.some((r) => r.compile_output)
          ? JSON.stringify(detaildResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detaildResults.some((r) => r.memory)
          ? JSON.stringify(detaildResults.map((r) => r.memory))
          : null,
        time: detaildResults.some((r) => r.time)
          ? JSON.stringify(detaildResults.map((r) => r.time))
          : null,
      },
    });

    console.log("submissin",submission);
    // if all passed == true mark probleem as solved in current user.

    if (allPassed) {
      try {
        await db.problemSolved.upsert({
          where: {
            userId_probemId: {
              userId,
              problemId,
            },
          },
          update: {},
          create: {
            userId,
            problemId,
          },
        });

        // saved individual test cases results using detaildResult

        const testCaseResults = detaildResults.map((result) => ({
          submissionId: submission.id,
          testCase: result.testCase,
          passed: result.passed,
          stdout: result.stdout,
          expected: result.expected,
          stderr: result.stderr,
          compileOutput: result.compile_output,
          status: result.status,
          memory: result.memory,
          time: result.time,
        }));

        await db.testCaseResults.createMany({
          data: testCaseResults,
        });

        const submissionWithTestCases = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });
      } catch (err) {
        console.error("error in saving subbmission: ", err);
      }
    }

    res.status(200).json({
      message: "code executed successfully",
      success: true,
      submission: submissionWithTestCases,
    });
  } catch (err) {
    console.error("error in execution", err);
    res.status(500).json({
      error: "Failed to execute code",
    });
  }
};
