import express from "express";
import {
  adminDifficultyStats,
  adminGrowthStats,
  getGrowthStats,
  // adminStats,
  getStats,
  getUserinfo,
  getUserStats,
} from "../controllers/userStats.controller.js";
import {authMiddleware, checkAdmin} from "../middleware/auth.middleware.js";

const userStatsRoute = express.Router();

userStatsRoute.get("/", authMiddleware, getStats);
userStatsRoute.get("/user", authMiddleware, getUserStats);
userStatsRoute.get("/users/info", authMiddleware, getUserinfo);
userStatsRoute.get("/user/growth/", authMiddleware, getGrowthStats);

// admin routes
userStatsRoute.get("/admin/growth", authMiddleware, adminGrowthStats);
userStatsRoute.get("/admin/problems", authMiddleware, adminDifficultyStats);

export default userStatsRoute;
