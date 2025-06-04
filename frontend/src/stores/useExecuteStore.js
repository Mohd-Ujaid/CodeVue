import {create} from "zustand";
import {axiosInstance} from "../libs/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useExecutionStore = create(set => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    source_code,
    language_id,
    problemDifficulty,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({isExecuting: true});

      const res = await axiosInstance.post(
        "http://localhost:8080/api/v1/execute-code",
        {
          source_code,
          language_id,
          problemDifficulty,
          stdin,
          expected_outputs,
          problemId,
        }
      );

      if (res && res.data) {
        console.log("Execution response:---->", res.data);
      } else {
        console.log("No response data received");
      }

      set({submission: res.data.submission});

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({isExecuting: false});
    }
  },
}));
