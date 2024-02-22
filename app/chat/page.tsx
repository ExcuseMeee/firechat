import { InputBox } from "@/components/input/InputBox";
import Link from "next/link";
import { ChatFeed } from "@/components/chat/ChatFeed";

export default function Chat() {
  return (
    <section className="border border-red-500 w-full h-full">
      <ChatFeed />
      <InputBox />
      <Link href={"/"}>BACk</Link>
    </section>
  );
}
