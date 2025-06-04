import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import toast from "react-hot-toast";

export const useUserStatsStore = create((set, get) => ({
  totalProblemsSolved: 0,
  totalEasyProblemsSolved: 0,
  totalMediumProblemsSolved: 0,
  totalHardProblemsSolved: 0,
  totalSubmissionsMade: 0,
  totalProblemsAttempted: 0,
  totalAcceptedAnswer: 0,
  totalWrongAnswer: 0,
  userSuccessRate: 0,

  analyticsData: {
    submissionsPerDay: [],
    submissionByLanguage: [],
    submissionStats: [],
    problemDifficulty: [],
    LanguageSubmissionActivity: [],
  },

  getUserStats: async () => {
    set({isLoading: true});
    try {
      // console.log("Fetching user stats for userId:", userId);
      const res = await axiosInstance.get(
        "http://localhost:8080/api/v1/stats/user/"
      );

      if (res && res.data) {
        console.log("User stats response:---->", res.data);
      } else {
        console.log("No response data received");
      }
      set({
        totalEasyProblemsSolved: res.data.stats.totalEasyProblemsSolved,
        totalMediumProblemsSolved: res.data.stats.totalMediumProblemsSolved,
        totalHardProblemsSolved: res.data.stats.totalHardProblemsSolved,
        totalSubmissionsMade: res.data.stats.totalSubmissionsMade,
        totalProblemsAttempted: res.data.stats.totalProblemsAttempted,
        totalAcceptedAnswer: res.data.stats.totalAcceptedAnswer,
        totalWrongAnswer: res.data.stats.totalWrongAnswer,
        userSuccessRate: res.data.stats.successRate,
        totalProblemsSolved: res.data.stats.totalProblemsSolved,
      });
    } catch (err) {
      console.log("Error fetching user stats", err);
      toast.error("Error fetching user stats");
    } finally {
      set({isLoading: false});
    }
  },

  getUsergrowths: async () => {
    set({isLoading: true});
    try {
      set({isLoading: true});

      const res = await axiosInstance.get(
        "http://localhost:8080/api/v1/stats/user/growth"
      );
      set({
        analyticsData: {
          submissionsPerDay: res.data.stats?.submissionsPerDay || [],
          submissionStats: res.data.stats?.submissionStats || [],
          problemDifficulty: res.data.stats?.acceptedDifficultyStats || [],
          LanguageSubmissionActivity:
            res.data.stats?.languageSubmissionStats || [],
          submissionByLanguage: res.data.stats?.submissionByLanguage || [],
        },
      });
    } catch (err) {
      console.log("Error fetching user stats", err);
      toast.error("Error fetching user stats");
    } finally {
      set({isLoading: false});
    }
  },
}));
