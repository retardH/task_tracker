import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  staffId: z.string({
    required_error: "Staff ID is require",
  }),
  password: z.string({
    required_error: "Password ID is require",
  }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className="w-full h-[100dvh]  flex items-center justify-center bg-primary">
      <section className="w-[500px] h-[300px] bg-zinc-100 shadow-sm rounded-md p-4 ">
        {/* <h2 className="text-zinc-950">Login to Continue</h2> */}
        <div className="flex w-full items-center justify-between">
          {/* <img src={logo} alt="" /> */}
          <h2 className="text-2xl font-bold">Task Tracker</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Staff Id</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
          <Button type="submit" className="mt-6 w-full">
            Submit
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
