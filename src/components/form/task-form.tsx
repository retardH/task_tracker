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
import { Button } from "../ui/button";
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
import { useMutation } from "react-query";
import { IPersonalTaskCreatePayload } from "@/models";
import { fetcher } from "@/lib/fetcher";

const formSchema = z.object({
  staffId: z
    .string({
      required_error: "Staff id is required",
    })
    .min(6, "Staff id must contain at least 6 characters"),
  staffName: z.string({
    required_error: "Staff name is required",
  }),
  date: z.date({
    required_error: "Date is required",
  }),
  fromTime: z.string({
    required_error: "From time is required",
  }),
  toTime: z.string({
    required_error: "To time is required",
  }),
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
  defaultData?: z.infer<typeof formSchema>;
}

const PersonalTaskForm = ({ isEditMode = false }: PersonalTaskFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffId: "",
      staffName: "",
      date: undefined,
      fromTime: "",
      toTime: "",
      project: "",
      status: "",
      remark: "",
    },
  });

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
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    if (!isEditMode) {
      createPersonalTask.mutate({
        staffId: data.staffId,
        staffName: data.staffName,
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
          <FormField
            control={form.control}
            name="staffId"
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel>Staff Id</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="eg, 014567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="staffName"
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel>Staff Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="eg, Mg Kyaw" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
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
                <FormItem className="col-span-1">
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
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
                <FormItem className="col-span-1">
                  <FormLabel>Sub Task</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                                value={`${subTask.subTaskId}`}
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
                <FormItem className="col-span-1">
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
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
                <FormItem className="col-span-1">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* <SelectLabel>Project</SelectLabel> */}
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
          <Button type="submit" size="lg" className="ml-auto mt-6">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalTaskForm;
