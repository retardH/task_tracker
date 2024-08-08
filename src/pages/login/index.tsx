import logo from "@/assets/logo.svg";
import red from "@/assets/Red Mottif.svg";
import blue from "@/assets/Blue Mottif.svg";
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
import {
  ExclamationTriangleIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { useLogin } from "@/services/auth";
import { useNavigate } from "react-router";
import { storeAuthInfo } from "@/lib/utils";
import SubmitButton from "@/components/ui/submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  staffId: z.string().min(6, "Id must contain at least 8 characters"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffId: "",
      password: "",
    },
  });

  const login = useLogin();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login.mutate(
      {
        id: data.staffId,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          storeAuthInfo({
            staffId: data?.data.staffId ?? "",
            name: data?.data.name ?? "",
            token: data?.data.accessToken ?? "",
          });
          navigate("/");
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  };

  return (
    <main className="flex h-[100dvh] w-full items-center justify-center">
      <img src={red} alt="" className="absolute left-0 top-0 w-[200px]" />
      <img src={blue} alt="" className="absolute bottom-0 right-0 w-[200px]" />
      <section className="w-[500px] rounded-md border border-primary/80 px-6 py-12 shadow-md">
        <div className="mb-8 flex w-full items-center justify-center gap-3">
          <img src={logo} alt="" className="w-[50px] rounded-sm" />
          <h2 className="text-4xl font-bold text-primary">Smart Task Master</h2>
        </div>
        {login.isError && (
          <Alert variant="destructive" className="mb-4">
            <ExclamationTriangleIcon />
            <AlertTitle>Invalid credentials!</AlertTitle>
            <AlertDescription>Please try again</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Staff Id</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^\d]/g, ""))
                        }
                        placeholder="Type your ID"
                      />
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
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Type your password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                        >
                          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <SubmitButton loading={login.isPending} className="w-full">
              Login to continue
            </SubmitButton>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
