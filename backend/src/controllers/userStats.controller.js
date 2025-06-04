import {db} from "../libs/db.js";

export const getStats = async (req, res) => {
  const userId = req.user;
  console.log("userId in getStats-> ", userId);
  try {
    const totalUsers = await db.user.count();

    const totalProblems = await db.problem.count();
    const totalEasyProblems = await db.problem.count({
      where: {
        difficulty: "EASY",
      },
    });
    const totalMediumProblems = await db.problem.count({
      where: {
        difficulty: "MEDIUM",
      },
    });
    const totalHardProblems = await db.problem.count({
      where: {
        difficulty: "HARD",
      },
    });

    const totalSubmissions = await db.submission.count();
    const totalAcceptedSubmission = await db.submission.count({
      where: {
        status: "Accepted",
      },
    });
    const totalWrongSubmission = await db.submission.count({
      where: {
        status: "Wrong Answer",
      },
    });
    const successRate = (totalAcceptedSubmission / totalSubmissions) * 100 || 0;

    res.status(200).json({
      success: true,
      message: "stats fetched successfully",
      stats: {
        totalUsers,
        totalProblems,
        totalEasyProblems,
        totalMediumProblems,
        totalHardProblems,
        totalSubmissions,
        totalAcceptedSubmission,
        totalWrongSubmission,
        successRate: parseFloat(successRate.toFixed(2)), // Format to 2 decimal places
      },
    });
  } catch (err) {
    console.error("error fetching stats", err);
    res.status(500).json({error: "failed to fetch stats"});
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId in getUserStats--- --> ", userId);

    const totalEasyProblemsSolved = await db.submission.count({
      where: {
        userId: userId,
        difficulty: "EASY",
        status: "Accepted",
      },
    });
    const totalMediumProblemsSolved = await db.submission.count({
      where: {
        userId: userId,
        difficulty: "MEDIUM",
        status: "Accepted",
      },
    });
    const totalHardProblemsSolved = await db.submission.count({
      where: {
        userId: userId,
        difficulty: "HARD",
        status: "Accepted",
      },
    });

    // Fetch total problems solved
    const totalAcceptedAnswer = await db.submission.count({
      where: {
        userId: userId,
        status: "Accepted",
      },
    });
    const ProblemsSolved = await db.submission.findMany({
      where: {
        userId: userId,
        status: "Accepted",
      },

      distinct: ["problemId"],
      select: {
        problemId: true,
      },
    });
    const totalProblemsSolved = ProblemsSolved.length;
    const totalWrongAnswer = await db.submission.count({
      where: {
        userId: userId,
        status: {
          equals: "Wrong Answer",
          mode: "insensitive",
        },
      },
    });

    // Fetch total submissions made
    const totalSubmissionsMade = await db.submission.count({
      where: {
        userId: userId,
      },
    });

    // Fetch total problems attempted
    const totalProblemsAttempted = await db.problem.count({
      where: {
        submission: {
          some: {
            userId: userId,
          },
        },
      },
    });

    const successRate = (totalAcceptedAnswer / totalSubmissionsMade) * 100 || 0;

    console.log("eay", totalEasyProblemsSolved);

    res.status(200).json({
      success: true,
      message: "User stats fetched successfully",
      stats: {
        totalEasyProblemsSolved,
        totalMediumProblemsSolved,
        totalHardProblemsSolved,
        totalProblemsAttempted,
        totalAcceptedAnswer,
        totalWrongAnswer,
        totalSubmissionsMade,
        totalProblemsSolved,
        successRate: parseFloat(successRate.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({error: "Failed to fetch user stats"});
  }
};

export const getUserinfo = async (req, res) => {
  try {
    // const userId = req.user.id;
    // console.log("userId in getUserinfo--- --> ", userId);

    const user = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    res.status(200).json({
      success: true,
      message: "User info fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({error: "Failed to fetch user info"});
  }
};

export const adminGrowthStats = async (req, res) => {
  const Growth = {};
  const formatted = [];
  const language = [];
  const submissionStats = [];

  try {
    const users = await db.user.findMany({
      select: {
        createdAt: true,
      },
    });

    users.forEach(user => {
      console.log("=====?", user);
      const day = new Date(user.createdAt).toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "long",
      });
      Growth[day] = (Growth[day] || 0) + 1;
    });

    const userGrowth = Object.entries(Growth).map(([date, count]) => ({
      users: count,
      day: new Date(date).toLocaleString("default", {day: "numeric"}),
      month: new Date(date).toLocaleString("default", {month: "short"}),
      year: new Date(date).toLocaleString("default", {year: "numeric"}),
      weekday: new Date(date).toLocaleString("default", {weekday: "long"}),
      xaxis: new Date(date).toLocaleString("default", {
        day: "numeric",
        month: "short",
      }),
    }));

    // difficulty

    const difficultyStats = await prisma.submission.groupBy({
      by: ["difficulty"],
      _count: {
        difficulty: true,
      },
    });

    const languageSubmissionStats = await prisma.submission.groupBy({
      by: ["language"],
      _count: {
        language: true,
      },
    });

    languageSubmissionStats.forEach(item => {
      language.push({
        language: item.language,
        count: item._count.language,
      });
    });

    console.log("===============================>", language);

    const difficultyColorMap = {
      EASY: "hsl(var(--success))",
      MEDIUM: "hsl(var(--warning))",
      HARD: "hsl(var(--destructive))",
    };

    difficultyStats.forEach(item => {
      formatted.push({
        difficulty: item.difficulty,
        count: item._count.difficulty,
        color: difficultyColorMap[item.difficulty],
      });
    });

    // submission stats

    const statusColorMap = {
      Accepted: "hsl(var(--success))",
      "Wrong Answer": "hsl(var(--destructive))",
      "Time Limit Exceeded": "hsl(var(--warning))",
      "Runtime Error": "hsl(var(--accent))",
    };

    const grouped = await prisma.submission.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    grouped.forEach(item => {
      submissionStats.push({
        status: item.status,
        count: item._count.status,
        color: statusColorMap[item.status] || "#ccc",
      });
    });

    res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      stats: {
        userGrowth: userGrowth,
        difficulties: formatted,
        submissionStats: submissionStats,
        languageSubmissionStats: language,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({error: "Failed to fetch admin stats"});
  }
};

export const adminDifficultyStats = async (req, res) => {
  // try {
  //   const difficultyStats = await prisma.problem.groupBy({
  //     by: ['difficulty'],
  //     _count: {
  //       difficulty: true,
  //     },
  //   });
  //
  //
  //   const difficultyColorMap = {
  //     EASY: "hsl(var(--success))",
  //     MEDIUM: "hsl(var(--warning))",
  //     HARD: "hsl(var(--destructive))",
  //   };
  //
  //   const formatted = [];
  //
  //   difficultyStats.forEach((item) => {
  //     formatted.push({
  //       difficulty: item.difficulty,
  //       count: item._count.difficulty,
  //       color: difficultyColorMap[item.difficulty],
  //     });
  //   });
  //
  //   res.json({ problemDifficulty: formatted });
  // }
  // catch (error) {
  //   console.error("Error fetching problem difficulty stats:", error);
  //   res.status(500).json({ error: "Failed to fetch difficulty stats" });
  // }

  try {
    const statusColorMap = {
      Accepted: "hsl(var(--success))",
      "Wrong Answer": "hsl(var(--destructive))",
      "Time Limit Exceeded": "hsl(var(--warning))",
      "Runtime Error": "hsl(var(--accent))",
    };

    const grouped = await prisma.submission.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const submissionStats = [];

    grouped.forEach(item => {
      submissionStats.push({
        status: item.status,
        count: item._count.status,
        color: statusColorMap[item.status] || "#ccc",
      });
    });

    res.json({submissionStats});
  } catch (error) {
    console.error("Error fetching submission stats:", error);
    res.status(500).json({error: "Failed to fetch submission stats"});
  }
};

export const getGrowthStats = async (req, res) => {
  const userId = req.user.id;

  const Growth = {};
  const formatted = [];
  const formattedd = [];
  const language = [];
  const submissionStats = [];

  try {
    const users = await db.Submission.findMany({
      where: {
        userId: userId,
      },
      select: {
        createdAt: true,
      },
    });

    console.log("users=======>", users);

    users.forEach(user => {
      const day = new Date(user.createdAt).toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "long",
      });
      Growth[day] = (Growth[day] || 0) + 1;
    });

    console.log("gr", Growth);

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
      select: {
        createdAt: true,
        language: true,
        difficulty: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const submissionsGrouped = submissions.reduce((acc, submission) => {
      // const date = submission.createdAt.toISOString().split('T')[0];
      const date = new Date(submission.createdAt).toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const day = new Date(submission.createdAt).toLocaleString("default", {
        day: "numeric",
      });
      const month = new Date(submission.createdAt).toLocaleString("default", {
        month: "short",
      });
      const year = new Date(submission.createdAt).toLocaleString("default", {
        year: "numeric",
      });

      const key = `${date}-${submission.language}-${submission.difficulty}`;

      if (!acc[key]) {
        acc[key] = {
          date,
          day,
          month,
          year,
          lang: submission.language,
          difficulty: submission.difficulty,
          count: 0,
        };
      }
      acc[key].count++;

      return acc;
    }, {});

    const submissionsGroupedByDay = Object.values(submissionsGrouped);

    const submissionsPerDay = Object.entries(Growth).map(([date, count]) => ({
      submissions: count,
      day: new Date(date).toLocaleString("default", {day: "numeric"}),
      month: new Date(date).toLocaleString("default", {month: "short"}),
      year: new Date(date).toLocaleString("default", {year: "numeric"}),
      weekday: new Date(date).toLocaleString("default", {weekday: "long"}),
      xaxis: new Date(date).toLocaleString("default", {
        day: "numeric",
        month: "short",
      }),
    }));
    console.log("sub=======================", submissionsPerDay);

    // difficulty

    const difficultyStats = await prisma.submission.groupBy({
      where: {
        userId: userId,
      },
      by: ["difficulty"],
      _count: {
        difficulty: true,
      },
    });
    const acceptedDifficultyStats = await prisma.submission.groupBy({
      where: {
        userId: userId,
        status: "Accepted",
      },
      by: ["difficulty"],
      _count: {
        difficulty: true,
      },
    });

    const languageSubmissionStats = await prisma.submission.groupBy({
      where: {
        userId: userId,
      },
      by: ["language"],
      _count: {
        language: true,
      },
    });

    languageSubmissionStats.forEach(item => {
      language.push({
        language: item.language,
        count: item._count.language,
      });
    });

    console.log("===============================>", language);

    const difficultyColorMap = {
      EASY: "hsl(var(--success))",
      MEDIUM: "hsl(var(--warning))",
      HARD: "hsl(var(--destructive))",
    };

    difficultyStats.forEach(item => {
      formatted.push({
        difficulty: item.difficulty,
        count: item._count.difficulty,
        color: difficultyColorMap[item.difficulty],
      });
    });

    acceptedDifficultyStats.forEach(item => {
      formattedd.push({
        difficulty: item.difficulty,
        count: item._count.difficulty,
        color: difficultyColorMap[item.difficulty],
      });
    });

    // submission stats

    const statusColorMap = {
      Accepted: "hsl(var(--success))",
      "Wrong Answer": "hsl(var(--destructive))",
      "Time Limit Exceeded": "hsl(var(--warning))",
      "Runtime Error": "hsl(var(--accent))",
    };

    const grouped = await prisma.submission.groupBy({
      where: {
        userId: userId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });

    grouped.forEach(item => {
      submissionStats.push({
        status: item.status,
        count: item._count.status,
        color: statusColorMap[item.status] || "#ccc",
      });
    });

    console.log(submissionsGroupedByDay);

    res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      stats: {
        submissionsPerDay: submissionsPerDay,
        difficulties: formatted,
        acceptedDifficultyStats: formattedd,
        submissionStats: submissionStats,
        languageSubmissionStats: language,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({error: "Failed to fetch admin stats"});
  }
};
