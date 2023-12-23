import { Backlog } from "@/components/Backlog";
import { LiveFeed } from "@/components/LiveFeed";
import { InputBox } from "@/components/InputBox";

// export const dynamic = "force-dynamic"

export default function Chat() {

  return (
    <div>
      {/* <LiveFeed /> */}
      <Backlog />
      <InputBox />
    </div>
  )
}