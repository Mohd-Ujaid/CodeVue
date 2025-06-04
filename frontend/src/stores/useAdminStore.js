import {create} from "zustand";
import {axiosInstance} from "../libs/axios.js";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  isLoading: false,
  analyticsData: {
    userGrowth: [],
    submissionStats: [],
    problemDifficulty: [],
    LanguageSubmissionActivity: [],
  },

  // Fetch all analytics data for the admin dashboard
  fetchAnalyticsData: async () => {
    try {
      set({isLoading: true});
      const res = await axiosInstance.get(
        "http://localhost:8080/api/v1/stats/admin/growth"
      );
      set({
        analyticsData: {
          userGrowth: res.data.stats?.userGrowth || [],
          submissionStats: res.data.stats?.submissionStats || [],
          problemDifficulty: res.data.stats?.difficulties || [],
          LanguageSubmissionActivity:
            res.data.stats?.languageSubmissionStats || [],
        },
      });

      toast.success("Analytics data loaded successfully");
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.error("Failed to load analytics data");
    } finally {
      set({isLoading: false});
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const res = await axiosInstance.get("/users/stats");
      return res.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      toast.error("Failed to load user statistics");
      return {
        totalUsers: 1200,
        newUsersToday: 25,
        activeUsersToday: 450,
        userGrowthRate: 12,
      };
    }
  },

  // Get problem statistics
  getProblemStats: async () => {
    try {
      const res = await axiosInstance.get("/stats");
      console.log("Problem stats response:", res.data.stats);
      return res.data.stats;
    } catch (error) {
      console.error("Error fetching problem stats:", error);
      toast.error("Failed to load problem statistics");
      return {
        totalProblems: 90,
        easyProblems: 45,
        mediumProblems: 30,
        hardProblems: 15,
        newProblemsThisWeek: 5,
      };
    }
  },

  // Get submission statistics
  getSubmissionStats: async () => {
    try {
      const res = await axiosInstance.get("/submissions/stats");
      return res.data;
    } catch (error) {
      console.error("Error fetching submission stats:", error);
      toast.error("Failed to load submission statistics");
      return {
        totalSubmissions: 1500,
        acceptedSubmissions: 750,
        submissionsToday: 120,
        acceptanceRate: 50,
      };
    }
  },
}));
