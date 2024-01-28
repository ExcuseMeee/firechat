import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Profile } from "./Profile"

type HeaderProps = HTMLAttributes<HTMLDivElement> & {}

export const Header = ({...rest}: HeaderProps) => {
  return (
    <header {...rest} className={cn("flex justify-between items-center", rest.className)}>
      <div className={"border border-blue-500 mx-8 "}>Firechat</div>
      <Profile />
    </header>
  )
}