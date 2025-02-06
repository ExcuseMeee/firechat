import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Profile } from "../auth/Profile";
import { Flame } from "lucide-react";

type HeaderProps = HTMLAttributes<HTMLDivElement> & {};

export const Header = ({ ...rest }: HeaderProps) => {
  return (
    <header
      {...rest}
      className={cn(
        "flex justify-between items-center w-screen",
        rest.className
      )}
    >
      <div className={"flex justify-center"}>
        <Flame />
        FIRECHAT
      </div>

      <Profile className="hover:cursor-pointer m-0" />
    </header>
  );
};
