import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  return (
    <Tabs defaultValue="sign-in" className="w-[400px] min-h-[500px]">
      <TabsList className="w-full grid grid-cols-2 mb-5">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignIn />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
};
export default Login;
