import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Profile } from "../auth/Profile";
import Link from "next/link";
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
      <Link href={"/"}>
        <div className={"flex justify-center"}>
          <Flame />
          FIRECHAT
        </div>
      </Link>
      <Profile className="hover:cursor-pointer m-0" />
    </header>
  );
};
