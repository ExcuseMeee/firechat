"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";
import { anonymousLogin } from "@/lib/firebaseAuth";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, { message: "Invalid Username" }),
});

type FormData = z.infer<typeof formSchema>;

export const GuestSignIn = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      await anonymousLogin(values.username);
      router.push("/");
    } catch (error) {
      console.log("[onSubmit] failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Login</CardTitle>
        <CardDescription>Start chatting without signing up</CardDescription>
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
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full mt-5 flex justify-center space-x-1"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <User />}
              <span>Login as Guest</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
