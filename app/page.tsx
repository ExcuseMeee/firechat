import { SignIn } from "@/components/SignIn";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/chat"}>CHAT</Link>
      <SignIn />
    </div>
  );
}
