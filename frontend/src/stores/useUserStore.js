import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import {toast} from "react-hot-toast";

const useUserStore = create(set => ({
  users: [],
  isUsersLoading: false,

  getAllUsers: async () => {
    try {
      set({isUsersLoading: true});
      const res = await axiosInstance.get("/stats/users/info");
      console.log("All users response:=========> ", res.data.user);
      set({users: res.data.user});
    } catch (error) {
      console.error("Error getting all users", error);
      toast.error("Error in getting users");
    } finally {
      set({isUsersLoading: false});
    }
  },
}));

export default useUserStore;
