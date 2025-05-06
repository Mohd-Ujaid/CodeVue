import { db } from "../libs/db";

export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submissions.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submimssion fetched successfully",
      submissions,
    });
  } catch (err) {
    console.error("Fetch submission error : ", err);
    res.status(500).json({ err: "failed to fetch submissions" });
  }
};

export const getSubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;

    const submissions = await db.submissions.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submimssion fetched successfully",
      submissions,
    });
  } catch (err) {
    console.error("Fetch submission error : ", err);
    res.status(500).json({ err: "failed to fetch submissions" });
  }
};

export const getAllTheSubmissionForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    const submission = await db.submissions.findMany({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submimssion fetched successfully",
      count: submission,
    });
  } catch (err) {
    console.error("Fetch submission error : ", err);
    res.status(500).json({ err: "failed to fetch submissions" });
  }
};
