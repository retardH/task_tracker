export type ITask = {
  staffId: string;
  date: string;
  staffName: string;
  fromTime: string;
  toTime: string;
  status: string;
  remark: string;
  taskId: string;
  task: {
    id: string;
    name: string;
  };
  subTaskId: string;
  subTask: {
    id: string;
    name: string;
  };
  projectId: string;
  project: {
    id: string;
    name: string;
  };
};
