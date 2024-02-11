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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import useAuthActions from "@/lib/hooks/useAuthActions";
import { KeyRound, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Invalid password" }),
  username: z.string().min(1, { message: "Invalid username" }),
});

type FormData = z.infer<typeof formSchema>;

export const SignUp = () => {
  const router = useRouter();
  const { signUp, isLoading } = useAuthActions();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: FormData) {
    try {
      await signUp(values.email, values.password, values.username);
      router.push("/chat");
    } catch (error) {
      console.log("[onSubmit] signup failed", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create an account to start chatting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full mt-5 flex justify-center space-x-1"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <KeyRound />}
              <span>Create Account</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
