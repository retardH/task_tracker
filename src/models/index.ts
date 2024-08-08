export interface IResponse<TData> {
  success: boolean;
  message: string;
  data: TData;
}

export interface IStaff {
  id: string;
  name: string;
  staffId: string;
}

export interface ITask {
  id: string;
  staffId: string;
  date: Date;
  staff: IStaff;
  fromTime: string;
  toTime: string;
  status: string;
  remark: string;
  taskId: string;
  mainTask: {
    id: string;
    name: string;
  };
  subTaskId: string;
  subTask: {
    mainTaskId: string;
    subTaskId: string;
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
  extends IResponse<
    { subTaskId: string; mainTaskId: string; name: string }[]
  > {}

export interface IPersonalTaskCreatePayload {
  staffId: string;
  staffName: string;
  date: string;
  fromTime: string;
  toTime: string;
  taskId: string;
  subTaskId: string;
  status: number;
  projectId: string;
  remark: string;
  otherSubTask: string;
}

export interface IPersonalTaskUpdatePayload extends IPersonalTaskCreatePayload {
  id: string;
}
export interface ILoginpayload {
  id: string;
  password: string;
}
