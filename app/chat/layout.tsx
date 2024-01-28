import { AudioSelection } from "@/components/AudioSelection";
import { ChatProvider } from "@/components/providers/chatProvider";
import { SoundProvider } from "@/components/providers/soundProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <SoundProvider>
        <div className="flex">
          <AudioSelection />
          {children}
        </div>
      </SoundProvider>
    </ChatProvider>
  );
}
