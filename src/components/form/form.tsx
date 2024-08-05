import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
// import { Form, Label, Input, Button } from "@radix-ui/react-form";

const schema = z.object({
  date: z.string().nonempty("Date is required"),
  fromTime: z.string().nonempty("From time is required"),
  toTime: z.string().nonempty("To time is required"),
  remark: z.string().optional(),
  status: z.string().nonempty("Status is required"),
  task: z.string().nonempty("Task is required"),
  subTask: z.string().nonempty("Sub-task is required"),
  project: z.string().nonempty("Project is required"),
});

const MyForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Date
        <Controller
          name="date"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.date && <span>{errors.date.message}</span>}
      </Label>

      <Label>
        From Time
        <Controller
          name="fromTime"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.fromTime && <span>{errors.fromTime.message}</span>}
      </Label>

      <Label>
        To Time
        <Controller
          name="toTime"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.toTime && <span>{errors.toTime.message}</span>}
      </Label>

      <Label>
        Remark
        <Controller
          name="remark"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.remark && <span>{errors.remark.message}</span>}
      </Label>

      <Label>
        Status
        <Controller
          name="status"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.status && <span>{errors.status.message}</span>}
      </Label>

      <Label>
        Task
        <Controller
          name="task"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.task && <span>{errors.task.message}</span>}
      </Label>

      <Label>
        Sub-Task
        <Controller
          name="subTask"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.subTask && <span>{errors.subTask.message}</span>}
      </Label>

      <Label>
        Project
        <Controller
          name="project"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.project && <span>{errors.project.message}</span>}
      </Label>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default MyForm;
