import {db} from "../libs/db.js";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const {
      source_code,
      language_id,
      problemDifficulty,
      expected_outputs,
      problemId,
      stdin,
    } = req.body;
    console.log("before");
    console.log("================================");
    console.log("difficulty", problemDifficulty);
    console.log("================================");
    console.log("body", req.body);
    console.log("after");

    const userId = req.user.id;
    console.log("userId", userId);

    // validate testcases
    console.log("stdin", stdin);

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid or Missing test cases",
      });
    }

    // prepare each testcases for judge0

    const submissions = stdin.map(input => ({
      language_id,
      problemDifficulty,
      source_code,
      stdin: input,
      // base64_encoded: false,
      // wait:false
    }));
    console.log("submissions", submissions);

    // send this batch of submission to judge0

    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map(res => res.token);

    // poll judge0 dor result of all submitted test cases

    const results = await pollBatchResults(tokens);

    console.log("result =============>>> :", results);

    // analyze test cases

    let allPassed = true;
    const detailedResults = results.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();

      const passed = stdout === expected_output;

      if (!passed) {
        allPassed = false;
      }

      return {
        testcases: i + 1,
        passed,
        stdout,
        difficulty: problemDifficulty,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB ` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    console.log("detail result : ", detailedResults);
    console.log("problem id", userId, "   ", problemId);

    // store submission summary

    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        difficulty: problemDifficulty,
        sourceCode: {code: source_code},
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map(r => r.stdout)),
        stderr: detailedResults.some(r => r.stderr)
          ? JSON.stringify(detailedResults.map(r => r.stderr))
          : null,
        compileOutput: detailedResults.some(r => r.compile_output)
          ? JSON.stringify(detailedResults.map(r => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResults.some(r => r.memory)
          ? JSON.stringify(detailedResults.map(r => r.memory))
          : null,
        time: detailedResults.some(r => r.time)
          ? JSON.stringify(detailedResults.map(r => r.time))
          : null,
      },
    });
    debugger;
    console.log("all Passed", allPassed);

    // console.log("submission")
    // console.log("submission", submission);
    console.log("this is test");
    // if all passed == true mark problem as solved in current user.

    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
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
    }

    console.log("this is also test");
    // saved individual test cases results using detailedResult

    const testCaseResults = detailedResults.map(result => ({
      submissionId: submission.id,
      testCase: result.testcases,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    console.log("detailded result ---------------------->", detailedResults);
    console.log(
      "tis is ------------------------------->",
      detailedResults.map(result => ({
        submissionId: submission.id,
        testCase: result.testcases,
        passed: result.passed,
        stdout: result.stdout,
        expected: result.expected,
        stderr: result.stderr,
        compileOutput: result.compile_output,
        status: result.status,
        memory: result.memory,
        time: result.time,
      }))
    );

    console.log("testCaseResults", testCaseResults);

    await db.testCaseResult.createMany({
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

    res.status(200).json({
      message: "code executed successfully",
      success: true,
      submission: submissionWithTestCases,
    });
    console.log("submission with test cases", submissionWithTestCases);
  } catch (err) {
    console.error("error in saving submission: ", err);
    console.error("error in execution", err);
    res.status(500).json({
      error: "Failed to execute code",
    });
  }
};
