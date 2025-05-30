import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import toast from "react-hot-toast";

export const useActions = create(set => ({
  isDeletingProblem: false,

  onDeleteProblem: async id => {
    try {
      set({isDeletingProblem: true});
      console.log("Deleting problem with ID:", id);
      const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);
      console.log("Deleting problem with res:", res);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error deleting problem", error);
      toast.error("Error deleting problem");
    } finally {
      set({isDeletingProblem: false});
    }
  },
}));
