import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import toast from "react-hot-toast";

export const useDiscussionStore = create((set, get) => ({
  isLoading: false,
  discussions: [],
  discussion: null,

  getAllDiscussions: async () => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.get("/discussion/get-all-discussions");
      console.log("All discussions response:", res.data);
      set({discussions: res.data.discussions});
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting all discussions", error);
      toast.error("Error getting all discussions");
    } finally {
      set({isLoading: false});
    }
  },

  getDiscussionById: async discussionId => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.get(
        `/discussion/get-discussion/${discussionId}`
      );
      console.log("Discussion by ID response:", res.data);
      set({discussion: res.data.discussion});
    } catch (error) {
      console.log("Error getting discussion by ID", error);
      toast.error("Error getting discussion by ID");
    } finally {
      set({isLoading: false});
    }
  },
  createDiscussion: async data => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.post(
        "/discussion/post-all-discussion",
        data
      );
      console.log("Create discussion response:", res.data);
      set(state => ({
        discussions: [...state.discussions, res.data.discussion],
      }));
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error creating discussion", error);
      toast.error("Error creating discussion");
    } finally {
      set({isLoading: false});
    }
  },
}));
