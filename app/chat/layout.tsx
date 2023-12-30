import { ChatProvider } from "@/components/providers/chatProvider";
import { SoundProvider } from "@/components/providers/soundProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      CHAT ROOM LAYOUT
      <ChatProvider>
        <SoundProvider>{children}</SoundProvider>
      </ChatProvider>
    </div>
  );
}
