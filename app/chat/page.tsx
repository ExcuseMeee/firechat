import { InputBox } from "@/components/InputBox";
import Link from "next/link";
import { ChatFeed } from "@/components/ChatFeed";

export default function Chat() {
  return (
    <section className="border border-red-500 w-full h-full">
      <ChatFeed />
      <InputBox />
      <Link href={"/"}>BACk</Link>
    </section>
  );
}
