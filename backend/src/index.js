import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import serverless from "serverless-http";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.route.js";
import submissionRoutes from "./routes/submission.route.js";
import playlistRoutes from "./routes/playlist.routes.js";
import interviewRoutes from "./routes/interview.route.js";
import userStatsRoute from "./routes/userStats.route.js";
import discussionRoutes from "./routes/discussion.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "code-vue-git-main-mohd-ujaids-projects.vercel.app/",
      "https://code-vue-git-main-mohd-ujaids-projects.vercel.app/",
      "https://code-vue-git-main-mohd-ujaids-projects.vercel.app",
      "https://www.codevue.tech/"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello guys welcome to codevue");
});

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/problems", problemRoutes);

app.use("/api/v1/execute-code", executionRoute);

app.use("/api/v1/submission", submissionRoutes);

app.use("/api/v1/playlist", playlistRoutes);

app.use("/api/v1/discussion", discussionRoutes);

app.use("/api/v1/interview", interviewRoutes);

app.use("/api/v1/stats", userStatsRoute);
// app.use("/api/v1/Admin", userStatsRoute)

app.listen(process.env.PORT, () => {
  console.log(`server is running on port no.  ${process.env.PORT}`);
});

// export const handler = serverless(app);
// export default serverless(app);