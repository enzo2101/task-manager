import { useApi } from "@/contexts/Api";
import { endpoints } from "@/contexts/setting";
import { useCallback } from "react";

const useStartTasks = () => {
  const { request } = useApi();

  const getTasks = useCallback(async () => {
    const response = await request<Array<ApiTask>>({
      method: "get",
      url: endpoints.startTasks,
    });

    return response.data;
  }, [request]);

  return { getTasks };
};

export default useStartTasks;
