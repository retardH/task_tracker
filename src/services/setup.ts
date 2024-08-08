import { fetcher } from "@/lib/fetcher";
import type {
  IProjectListResponse,
  ISubTaskListResponse,
  ITaskListResponse,
} from "@/models";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProjects = () => {
  return useQuery<IProjectListResponse>({
    queryKey: ["/Project"],
    queryFn: async () => {
      return await fetcher("get", "/Project");
    },
  });
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await fetcher("post", "/Project", payload);
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

export const useCreateTaskType = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await fetcher("post", "/Task", payload);
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

export const useCreateSubTaskType = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await fetcher("post", "/SubTask", payload);
    },
  });
};
