import { fetcher } from "@/lib/fetcher";
import { IProjectListResponse, ITaskListResponse } from "@/models";
import { useQuery } from "react-query";

export const useGetProjects = () => {
  return useQuery<IProjectListResponse>({
    queryKey: ["/Project"],
    queryFn: async () => {
      return await fetcher("get", "/Project");
    },
  });
};

export const useGetTaskTypes = () => {
  return useQuery<ITaskListResponse>({
    queryKey: ["/Task"],
    queryFn: async () => {
      return await fetcher("get", "/Task");
    },
  });
};
