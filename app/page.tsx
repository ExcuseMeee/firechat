import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { redirect } from "next/navigation";
import { SignIn } from "@/components/SignIn";

export default function Home() {

  const profile = auth.currentUser
  if(profile){
    redirect("/chat")
  }else{
    console.log("not signed in")
  }

  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
      <SignIn />
    </div>
  );
}
