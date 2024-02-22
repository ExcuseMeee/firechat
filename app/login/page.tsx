import { GuestSignIn } from "@/components/auth/GuestSignIn";
import { SignIn } from "@/components/auth/SignIn";
import { SignUp } from "@/components/auth/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  return (
    <Tabs defaultValue="sign-in" className="w-[400px] min-h-[500px]">
      <TabsList className="w-full grid grid-cols-3 mb-5">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="guest">Guest Login</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignIn />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUp />
      </TabsContent>
      <TabsContent value="guest">
        <GuestSignIn />
      </TabsContent>
    </Tabs>
  );
}
