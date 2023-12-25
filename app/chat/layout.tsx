import { ChatProvider } from "@/components/providers/chatProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      CHAT ROOM LAYOUT
      <ChatProvider>{children}</ChatProvider>
    </div>
  );
}
