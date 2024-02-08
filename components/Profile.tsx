"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import useFireAuth from "@/lib/hooks/useFireAuth";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AlertTriangle, LogIn, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ProfileProps = AvatarProps & {};

export const Profile = ({ ...rest }: ProfileProps) => {
  const router = useRouter();

  const { isLoading, user, logout, attachAuthListener } = useFireAuth();

  useEffect(() => {
    console.log("[profile effect] ran");
    const unsub = attachAuthListener();
    window.addEventListener("beforeunload", unsub);

    return () => {
      console.log("[profile cleanup] ran");
      unsub();
      window.removeEventListener("beforeunload", unsub);
    };
  }, []);

  const imageUrl = user?.photoURL ?? "";

  if (isLoading)
    return (
      <Skeleton
        className={cn("mx-10 h-10 w-10 rounded-full", rest.className)}
      />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar {...rest} className={cn("mx-10 h-10 w-10", rest.className)}>
          <AvatarImage src={imageUrl} alt={"dwwd"} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-center">
          {user ? (
            <span>{user.displayName ?? "No Name"}</span>
          ) : (
            <span className="flex justify-center items-center space-x-1">
              <AlertTriangle className="h-5" />
              <span>Not Signed In</span>
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem
            onClick={() => logout()}
            className="flex justify-center items-center space-x-1 hover:cursor-pointer"
          >
            <LogOut className="h-5" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => router.push("/login")}
            className="flex justify-center items-center space-x-1 hover:cursor-pointer"
          >
            <LogIn className="h-5" />
            <span>Sign In</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
