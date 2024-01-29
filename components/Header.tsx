import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { Profile } from "./Profile"

type HeaderProps = HTMLAttributes<HTMLDivElement> & {}

export const Header = ({...rest}: HeaderProps) => {
  return (
    <header {...rest} className={cn("flex justify-between items-center w-screen", rest.className)}>
      <div className={"border border-blue-500 mx-10 "}>Firechat</div>
      <Profile className="mx-10 hover:cursor-pointer" />
    </header>
  )
}