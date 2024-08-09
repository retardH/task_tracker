import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import DatePicker from "../ui/date-picker";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "../ui/select";

import {
  // dummyComplexityList,
  dummystatusList,
} from "@/constants";
import { Textarea } from "../ui/textarea";
import {
  useGetProjects,
  useGetSubTaskTypes,
  useGetTaskTypes,
} from "@/services/setup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IPersonalTaskCreatePayload,
  IPersonalTaskUpdatePayload,
  ITask,
} from "@/models";
import { fetcher } from "@/lib/fetcher";
import { getAuthInfo, getMinutesFromTimeStr } from "@/lib/utils";
import SubmitButton from "../ui/submit-button";
import { useEffect } from "react";

const formSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  fromTime: z
    .string({
      required_error: "From time is required",
    })
    .min(2, "From time is required"),
  toTime: z
    .string({
      required_error: "To time is required",
    })
    .min(2, "To time is required"),
  remark: z.string().optional(),
  task: z.string({
    required_error: "Task is required",
  }),
  subTask: z.string({
    required_error: "Sub-task is required",
  }),
  project: z.string({
    required_error: "Project is required",
  }),
  status: z.string({
    required_error: "Project is required",
  }),
  // complexity: z.string({
  //   required_error: "Project is required",
  // }),
});

interface PersonalTaskFormProps {
  isEditMode?: boolean;
  defaultData?: ITask;
  setIsOpenDialog?: (open: boolean) => void;
}
const PersonalTaskForm = ({
  isEditMode = false,
  setIsOpenDialog,
  defaultData,
}: PersonalTaskFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      fromTime: "",
      toTime: "",
      remark: defaultData?.remark ?? "",
      // task: defaultData?.taskId ?? undefined,
      // subTask: defaultData?.subTaskId ?? undefined,
      // project: defaultData?.projectId ?? undefined,
      // status: defaultData?.status ? `${defaultData.status}` : undefined,
    },
  });

  const queryClient = useQueryClient();
  const { userInfo } = getAuthInfo();

  const { data: projectsResp } = useGetProjects();
  const projectList = projectsResp?.data ?? [];

  const { data: taskTypesResp } = useGetTaskTypes();
  const taskTypesList = taskTypesResp?.data ?? [];

  const taskTypeId = form.watch("task");
  const { data: subTaskTypesResp } = useGetSubTaskTypes(taskTypeId);
  const subTaskTypesList = subTaskTypesResp?.data ?? [];

  const createPersonalTask = useMutation({
    mutationFn: async (payload: IPersonalTaskCreatePayload) => {
      return await fetcher("post", "/PersonalTask", payload);
    },
    onSuccess: () => {
      console.info("Success!");
      queryClient.invalidateQueries({
        queryKey: ["tasks", userInfo?.accountId],
        exact: true,
      });
      setIsOpenDialog?.(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updatePersonalTask = useMutation({
    mutationFn: async (payload: IPersonalTaskUpdatePayload) => {
      return await fetcher("put", `/PersonalTask/`, payload);
    },
    onSuccess: () => {
      console.info("Success!");
      queryClient.invalidateQueries({
        queryKey: ["tasks", userInfo?.accountId],
        exact: true,
      });
      setIsOpenDialog?.(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.setValue("remark", defaultData?.remark);
      form.setValue("date", new Date(defaultData.date));
      form.setValue("fromTime", defaultData.fromTime);
      form.setValue("toTime", defaultData.toTime);
      form.setValue("task", defaultData.taskId);
      form.setValue("subTask", defaultData.subTaskId);
      form.setValue("project", defaultData.projectId);
      form.setValue("status", `${defaultData.status}`);
    }
  }, [defaultData, subTaskTypesList]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const fromTimeMins = getMinutesFromTimeStr(data.fromTime);
    const toTimeMins = getMinutesFromTimeStr(data.toTime);

    if (toTimeMins < fromTimeMins) {
      form.setError("toTime", {
        message: "To time cannot be greater than from time",
      });
      return;
    }
    if (!isEditMode) {
      createPersonalTask.mutate({
        staffId: userInfo?.accountId ?? "",
        staffName: userInfo?.name ?? "",
        date: data.date.toISOString(),
        fromTime: data.fromTime,
        toTime: data.toTime,
        projectId: data.project,
        taskId: data.task,
        subTaskId: data.subTask,
        status: +data.status,
        remark: data.remark ?? "",
        otherSubTask: "",
      });
    } else {
      updatePersonalTask.mutate({
        id: defaultData?.id ?? "",
        staffId: userInfo?.accountId ?? "",
        staffName: userInfo?.name ?? "",
        date: data.date.toISOString(),
        fromTime: data.fromTime,
        toTime: data.toTime,
        projectId: data.project,
        taskId: data.task,
        subTaskId: data.subTask,
        status: +data.status,
        remark: data.remark ?? "",
        otherSubTask: "",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <h4 className="font-medium">{userInfo?.name}</h4>
            <h4 className="text-sm">{userInfo?.staffId}</h4>
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      onDateChange={field.onChange}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="fromTime"
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel>From Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" placeholder="eg, 014567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="toTime"
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel>To Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" placeholder="eg, Mg Kyaw" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="task"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* <SelectLabel>Project</SelectLabel> */}
                          {taskTypesList.map((task) => (
                            <SelectItem key={task.id} value={`${task.id}`}>
                              {task.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="subTask"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Sub Task</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      // defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub task" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* <SelectLabel>Project</SelectLabel> */}
                          {subTaskTypesList.length ? (
                            subTaskTypesList.map((subTask) => (
                              <SelectItem
                                key={subTask.subTaskId}
                                value={subTask.subTaskId}
                              >
                                {subTask.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectLabel>No Option</SelectLabel>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* <SelectLabel>Project</SelectLabel> */}
                          {projectList.map((project) => (
                            <SelectItem
                              key={project.id}
                              value={`${project.id}`}
                            >
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {dummystatusList.map((status) => (
                            <SelectItem key={status.id} value={`${status.id}`}>
                              {status.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="remark"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Remark</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} placeholder="Type here..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex w-full justify-end">
          <SubmitButton
            loading={
              createPersonalTask.isPending || updatePersonalTask.isPending
            }
            className="mt-6 w-full md:ml-auto md:w-auto"
          >
            Submit
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default PersonalTaskForm;
