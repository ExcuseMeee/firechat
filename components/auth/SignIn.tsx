"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import { login } from "@/lib/firebaseAuth";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Invalid password" }),
  errorMsg: z.null().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      errorMsg: null,
    },
  });

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      router.push("/chat");
    } catch (error) {
      console.log("[onSubmit] failed", error);
      form.setError("errorMsg", { message: "Incorrect Email or Password" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Login to a preexisting account to resume chatting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="errorMsg"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full mt-5 flex justify-center space-x-1"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
              <span>Login</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
