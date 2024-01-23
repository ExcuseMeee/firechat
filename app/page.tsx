import Link from "next/link";
import { SignIn } from "@/components/SignIn";

export default function Home() {

  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
      <SignIn />
    </div>
  );
}
