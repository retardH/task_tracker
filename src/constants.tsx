import { type ReactNode } from "react";
import { ITask } from "./models";
import { CheckCircledIcon, LapTimerIcon } from "@radix-ui/react-icons";

// export const baseApiUrl = "http://localhost:7166/api";

export const tasks: ITask[] = [
  {
    staffId: "00003",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "00004",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "00003",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "00009",
    staffName: "Thet Htet Paing",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "026734",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "Complete",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Simple HR",
    },
  },
  {
    staffId: "00009",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-07-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "Complete",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "00009",
    staffName: "Htet Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "00004",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "App HR",
    },
  },
  {
    staffId: "00003",
    staffName: "Hein Htut Aung",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Simple HR",
    },
  },
  {
    staffId: "00003",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
  {
    staffId: "00003",
    staffName: "Kyaw Zin Lin",
    date: new Date("2024-08-06T00:00:00"),
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "Pending",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
    taskId: "1",
    task: {
      id: "1",
      name: "Development",
    },
    subTaskId: "1",
    subTask: {
      id: "1",
      name: "Api",
    },
    projectId: "1",
    project: {
      id: "1",
      name: "Smarter HR",
    },
  },
];

export const statusList = ["Pending", "Planned", "InProgress", "Complete"];

export enum EStatus {
  Pending,
  InProgress,
  Complete,
}
export const dummyTaskTypesList = [
  {
    id: 1,
    name: "Development",
  },
  {
    id: 2,
    name: "Bug Fix",
  },
  {
    id: 3,
    name: "Meeting",
  },
];

export const dummySubTaskTypesList = [
  {
    id: 1,
    name: "Api",
  },
  {
    id: 2,
    name: "Production",
  },
  {
    id: 3,
    name: "Handover",
  },
  {
    id: 4,
    name: "New",
  },
];

export const dummyPojectList = [
  {
    id: 1,
    name: "Smarter HR",
  },
  {
    id: 2,
    name: "Smart HR",
  },
  {
    id: 3,
    name: "Tracking Management",
  },
  {
    id: 4,
    name: "Insurance",
  },
  {
    id: 5,
    name: "Learning Management System",
  },
];

export const dummyComplexityList = [
  {
    id: 1,
    name: "Low",
  },
  {
    id: 2,
    name: "Medium",
  },
  {
    id: 3,
    name: "High",
  },
];
export const dummystatusList = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Planned" },
  { id: 3, name: "In Progress" },
  { id: 4, name: "Complete" },
];

export const statusWithIconMapping: Record<string, ReactNode> = {
  "In Progress": <LapTimerIcon className="h-4 w-4" />,
  Complete: <CheckCircledIcon className="h-4 w-4" />,
};
