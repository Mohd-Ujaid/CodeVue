import express from "express";
import {
  getDiscussions,
  postDiscussions,
} from "../controllers/discussions.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
// import executionRoute from "./executeCode.route.js";

const discussionRoutes = express.Router();

discussionRoutes.get("/get-all-discussions", authMiddleware, getDiscussions);
discussionRoutes.post("/post-all-discussions", authMiddleware, postDiscussions);

export default discussionRoutes;
