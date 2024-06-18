"use client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, LogIn, LogOut, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthListener from "@/lib/hooks/useAuthListener";
import { UserIcon } from "@/components/common/UserIcon";
import { logout, deleteAccount } from "@/lib/firebaseAuth";

type ProfileProps = AvatarProps & {};

export const Profile = ({ ...rest }: ProfileProps) => {
  const router = useRouter();

  const { user, isLoading } = useAuthListener();

  const imageUrl = user?.photoURL ?? "";
  const username = user?.displayName ?? "";

  if (isLoading)
    return (
      <Skeleton className={cn("h-10 w-10 rounded-full", rest.className)} />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserIcon {...rest} username={username} />
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
          <div className="space-y-1">
            <DropdownMenuItem
              onClick={() => deleteAccount()}
              className="flex justify-center items-center space-x-1 hover:cursor-pointer"
            >
              <UserX className="h-5" />
              <span>Delete Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => logout()}
              className="flex justify-center items-center space-x-1 hover:cursor-pointer"
            >
              <LogOut className="h-5" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </div>
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
