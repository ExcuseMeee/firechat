import { Feed } from "@/components/Feed";

async function sleep(ms: number){
  return new Promise(r => setTimeout(r, ms))
}

export default async function Chat() {

  // await sleep(5000)

  return (
    <div>
      <Feed />
    </div>
  )
}