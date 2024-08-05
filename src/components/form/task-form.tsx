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

const formSchema = z.object({
  staffId: z.string({
    required_error: "Staff id is required",
  }),
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
  // remark: z.string().optional(),
  // status: z.enum(["Pending", "Planned", "InProgress", "Complete"], {
  //   required_error: "Status is required",
  // }),
  // task: z.string({
  //   required_error: "Task is required",
  // }),
  // subTask: z.string({
  //   required_error: "Sub-task is required",
  // }),
  // project: z.string({
  //   required_error: "Project is required",
  // }),
});

const PersonalTaskForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
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
        </div>
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PersonalTaskForm;
