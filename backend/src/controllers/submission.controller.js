import {db} from "../libs/db.js";

export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      // where: {
      //   userId: userId,
      // },
      include: {
        user: {
          select: {
            name: true, // include only the name
            // Add email or id if needed
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Submission fetched successfully",
      submissions,
    });
  } catch (err) {
    console.error("Fetch submission error : ", err);
    res.status(500).json({err: "failed to fetch submissions"});
  }
};

export const getSubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submission fetched successfully",
      submissions,
    });
  } catch (err) {
    console.error("Fetch submission error : ", err);
    res.status(500).json({err: "failed to fetch submissions"});
  }
};

export const getAllTheSubmissionForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    const submission = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });
    const submissions = await db.submission.count({
      where: {
        problemId: problemId,

        status: "Accepted",
      },
    });

    res.status(200).json({
      success: true,
      message: "Submission fetched successfully",
      count: submission,
      sub: submissions,
    });
  } catch (err) {
    console.error("Fetch submission error : ", err);
    res.status(500).json({err: "failed to fetch submissions"});
  }
};
