import { z } from "zod";

export const taskModel = z.object({
  staffId: z.string().min(6, "Staff Id must have at least 6 characters"),
  date: z.string(),
  staffName: z.string(),
  fromTime: z.string(),
  toTime: z.string(),
  //   status: z.enum(["Pending", "In Progress", "Complete"]),
  status: z.string(),
  remark: z.string().optional(),
});

export type ITask = z.infer<typeof taskModel>;
