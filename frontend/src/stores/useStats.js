import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import toast from "react-hot-toast";

export const useStatsStore = create((set, get) => ({
  isLoading: false,
  totalUsers: 0,
  totalProblems: 0,
  totalEasyProblems: 0,
  totalMediumProblems: 0,
  totalHardProblems: 0,
  totalSubmissions: 0,
  totalAcceptedSubmission: 0,
  totalWrongSubmission: 0,
  successRate: 0,

  getStats: async () => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.get(
        "http://localhost:8080/api/v1/stats/"
      );

      if (res && res.data) {
        console.log("Execution response:---->", res.data);
      } else {
        console.log("No response data received");
      }
      set({
        totalUsers: res.data.stats.totalUsers,
        totalProblems: res.data.stats.totalProblems,
        totalEasyProblems: res.data.stats.totalEasyProblems,
        totalMediumProblems: res.data.stats.totalMediumProblems,
        totalHardProblems: res.data.stats.totalHardProblems,
        totalSubmissions: res.data.stats.totalSubmissions,
        totalAcceptedSubmission: res.data.stats.totalAcceptedSubmission,
        totalWrongSubmission: res.data.stats.totalWrongSubmission,
        successRate: res.data.stats.successRate,
      });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({isExecuting: false});
    }
  },
}));
