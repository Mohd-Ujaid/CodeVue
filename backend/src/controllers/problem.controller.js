import {db} from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  console.log(req.user.role);

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      error: "You are not allowed to create a problem",
    });
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      // console.log(languageId);
      if (languageId === null) {
        console.error("language id is null");

        res.status(500).json({
          error: "language id is null",
        });
      }

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      const submissions = testcases.map(({input, output}) => ({
        language_id: languageId,
        source_code: solutionCode,
        stdin: input,
        expected_output: output,
      }));

      console.log("this is submission", submissions);

      const submissionResults = await submitBatch(submissions);

      console.log("submition results :", submissionResults);

      if (submissionResults === null || submissionResults === undefined) {
        console.error("submission is null or error");

        return res.status(400).json({
          error: "submission is null or undefined",
        });
      }

      const tokens = submissionResults.map(res => res.token);

      console.log("this is token : ", tokens);

      const results = await pollBatchResults(tokens);

      // const result = results[i]

      console.log("Results......  ", results);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `testcase ${i + 1} failed for language ${language}`,
          });
        }
      }

      // save the problem to the database

      try {
        const newProblem = await db.problem.create({
          data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolutions,
            userId: req.user.id,
          },
        });

        return res.status(201).json({
          sucess: true,
          message: "Problem Created Successfully",
          problem: newProblem,
        });
      } catch (err) {
        console.log("error while saving problem : ", err);

        return res.status(400).json({
          message: "error while saving problem ",
        });
      }
    }
  } catch (err) {
    console.log("error while creating problems: ", err);
    return res.status(500).json({
      message: "error while creating problem",
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!problems) {
      return res.status(404).json({
        error: "No problem found",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "Message Fetched Successfully",
      problems,
    });
  } catch (err) {
    console.log("error while fetching problems: ", err);
    return res.status(500).json({
      message: "error while fetching problem",
    });
  }
};

export const getProblemById = async (req, res) => {
  const {id} = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {id},
    });

    if (!problem) {
      return res.status(404).json({error: "Problem not found . "});
    }

    return res.status(200).json({
      sucess: true,
      message: "Message Fetched Successfully",
      problem,
    });
  } catch (err) {
    console.log("error while fetching problems by id: ", err);
    return res.status(500).json({
      error: "error while fetching problem by id",
    });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const {id} = req.params;

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    const problem = await db.problem.findUnique({where: {id}});
    if (!problem) {
      return res.status(404).json({error: "Problem not found"});
    }

    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({error: "Forbidden: Only admin can update problems"});
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json({error: `Unsupported language: ${language}`});
      }

      const submissions = testCases.map(({input, output}) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      console.log("Submissions:", submissions);

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map(res => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Validation failed for ${language} on input: ${submissions[i].stdin}`,
            details: result,
          });
        }
      }
    }

    const updatedProblem = await db.problem.update({
      where: {id},
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
      },
    });

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (err) {
    console.error("Error updating problem :", err);
    res.status(500).json({error: "Failed to updating problem"});
  }
};

export const deleteProblem = async (req, res) => {
  const {id} = req.params;
  console.log("Deleting problem with ID:", id);

  try {
    const problem = await db.problem.findUnique({where: {id}});

    if (!problem) {
      return res.status(404).json({error: "Problem Not Found"});
    }

    await db.problem.delete({where: {id}});

    res.status(200).json({
      success: true,
      message: "problem deleted successfully",
    });
  } catch (err) {
    console.error("error while deleting problem", err);

    return res.status(500).json({
      error: "error while deleting thw problem",
    });
  }
};

export const getAllProblemSolvedByUser = async (req, res) => {
  const userId = req.user.id;
  console.log("userId in getAllProblemSolvedByUser: ", userId);

  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: userId,
          },
        },
      },
    });

    res.status(200).json({
      message: "successfully fetched problems ",
      problems,
    });
  } catch (err) {
    console.error("failed to fetch problems");

    res.status(500).json({err: "failed to fetch problems"});
  }
};
