import { fetcher } from "@/lib/fetcher";
import { IPersonalTaskUpdatePayload, IResponse, ITask } from "@/models";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTasksByStaffId = (id?: string) => {
  return useQuery<IResponse<ITask[]>>({
    queryKey: ["tasks", id],
    queryFn: async () => {
      return await fetcher("get", `/PersonalTask/GetByStaffId/${id}`);
    },
    enabled: !!id,
  });
};

export const useGetAllTasks = () => {
  return useQuery<IResponse<ITask[]>>({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      return await fetcher("get", "/PersonalTask");
    },
  });
};

export const useDeleteTaskById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await fetcher("delete", `/PersonalTask/${id}`);
    },
  });
};

export const useGetSingleTaskById = (id?: string) => {
  return useQuery<IResponse<ITask>>({
    queryKey: ["task", id],
    queryFn: async () => {
      return await fetcher("get", `/PersonalTask/${id}`);
    },
    enabled: !!id,
  });
};

export const useUpdateTaskById = () => {
  return useMutation({
    mutationFn: async (payload: IPersonalTaskUpdatePayload) => {
      return await fetcher("put", `/PersonalTask`, payload);
    },
  });
};
