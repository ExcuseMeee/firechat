import { AudioSelection } from "@/components/AudioSelection";
import { AuthProvider } from "@/components/providers/authProvider";
import { ChatProvider } from "@/components/providers/chatProvider";
import { SoundProvider } from "@/components/providers/soundProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ChatProvider>
        <SoundProvider>
          <div className="flex">
            <AudioSelection />
            {children}
          </div>
        </SoundProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
