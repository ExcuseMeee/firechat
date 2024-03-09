import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { Profile } from "../auth/Profile"

type HeaderProps = HTMLAttributes<HTMLDivElement> & {}

export const Header = ({...rest}: HeaderProps) => {
  return (
    <header {...rest} className={cn("flex justify-between items-center w-screen", rest.className)}>
      <div className={"border border-blue-500"}>Firechat</div>
      <Profile className="hover:cursor-pointer m-0" />
    </header>
  )
}