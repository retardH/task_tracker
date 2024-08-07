export interface IResponse<TData> {
  success: boolean;
  message: string;
  data: TData;
}

export interface ITask {
  staffId: string;
  date: Date;
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
}

export interface IProjectListResponse
  extends IResponse<{ id: string; name: string }[]> {}

export interface ITaskListResponse
  extends IResponse<{ id: string; name: string }[]> {}

export interface ISubTaskListResponse
  extends IResponse<{ id: string; name: string }> {}
