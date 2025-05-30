import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {
  getAllSubmission,
  getAllTheSubmissionForProblem,
  getSubmissionForProblem,
} from "../controllers/submission.controller.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmission);

submissionRoutes.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionForProblem
);

submissionRoutes.get(
  "/get-submission-count/:problemId",
  authMiddleware,
  getAllTheSubmissionForProblem
);

export default submissionRoutes;
