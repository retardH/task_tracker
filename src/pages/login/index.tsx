import logo from "@/assets/logo.svg";
import red from "@/assets/Red Mottif.svg"
import blue from "@/assets/Blue Mottif.svg"
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

import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
const formSchema = z.object({
  staffId: z.string({
    required_error: "Staff ID is require",
  }),
  password: z.string({
    required_error: "Password is require",
  }).min(8),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffId: "",
      password:""
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className="w-full h-[100dvh] flex items-center justify-center ">
      <img src= {red} alt=""  className="absolute top-0 left-0 w-[200px]"/>
      <img src= {blue} alt=""  className="absolute bottom-0 right-0 w-[200px]"/>
      <section className="w-[500px] h-[400px] bg-zinc-100 shadow-sm rounded-md p-4 ">
        {/* <h2 className="text-zinc-950">Login to Continue</h2> */}
        <div className="flex w-full items-center justify-center gap-3">
          <img src={logo} alt="" className="rounded-sm w-[50px]" />
          <h2 className="text-4xl font-bold text-primary">Smart Task Master</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
                      <div className="relative">
                        <Input {...field} type={showPassword ? 'text' : 'password'} placeholder="" />
                        <button type="button" onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {showPassword? <EyeClosedIcon/> :<EyeOpenIcon/>}
                        </button>
                      </div>
                    </FormControl> 
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="mt-6 w-full">
            Continue
          </Button>
          </form>
          
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
