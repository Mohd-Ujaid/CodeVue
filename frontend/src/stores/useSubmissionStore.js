import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,
  correctSubmissions: null,

  getAllSubmissions: async () => {
    try {
      set({isLoading: true});
      const res = await axiosInstance.get("/submission/get-all-submissions");

      console.log("All submissions response:in 000000000000000", res.data);

      set({submissions: res.data.submissions});

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting all submissions", error);
      toast.error("Error getting all submissions");
    } finally {
      set({isLoading: false});
    }
  },

  getSubmissionForProblem: async problemId => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );
      console.log("Submission for problem response 2:", res.data);

      set({submission: res.data.submissions});
    } catch (error) {
      console.log("Error getting submissions for problem 3", error);

      toast.error("Error getting submissions for problem");
    } finally {
      set({isLoading: false});
    }
  },

  getSubmissionCountForProblem: async problemId => {
    try {
      console.log("Getting submission count for problem:", problemId);
      const res = await axiosInstance.get(
        `/submission/get-submission-count/${problemId}`
      );
      console.log("Submission count response: 2", res.data);
      // console.log("Submission count response===========:", res.data.count);

      set({submissionCount: res.data.count});
      set({correctSubmissions: res.data.sub});
    } catch (error) {
      console.log("Error getting submission count for problem", error);
      toast.error("Error getting submission count for problem");
    }
  },
}));
