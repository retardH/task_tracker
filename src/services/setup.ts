import { fetcher } from "@/lib/fetcher";
import type {
  IProjectListResponse,
  ISubTaskListResponse,
  ITaskListResponse,
} from "@/models";
import { useQuery } from "@tanstack/react-query";

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

export const useGetSubTaskTypes = (taskTypeId: string) => {
  return useQuery<ISubTaskListResponse>({
    queryKey: ["/SubTask", taskTypeId],
    queryFn: async () => {
      return await fetcher("get", `/SubTask/${taskTypeId}`);
    },
    enabled: !!taskTypeId,
  });
};
