import express from "express";
import {
  answerQuestion,
  startInterview,
  submitCode,
} from "../controllers/interview.controller.js";

const interviewRoutes = express.Router();

interviewRoutes.post("/start", startInterview);
interviewRoutes.post("/answer", answerQuestion);
interviewRoutes.post("/submit-code", submitCode);

export default interviewRoutes;
