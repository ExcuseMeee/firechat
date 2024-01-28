"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import useFireAuth from "@/lib/hooks/useFireAuth";
import { Skeleton } from "./ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

type ProfileProps = AvatarProps & {};

export const Profile = ({ ...rest }: ProfileProps) => {
  const { isLoading, user, login, logout } = useFireAuth();

  const imageUrl = user?.photoURL ?? "";

  if (isLoading)
    return (
      <Skeleton className={cn("mx-8 h-10 w-10 rounded-full", rest.className)} />
    );

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar {...rest} className={cn("mx-8", rest.className)}>
          <AvatarImage src={imageUrl} alt={"dwwd"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        {user ? (
          <div onClick={() => logout()}>LOGOUT</div>
        ) : (
          <div onClick={() => login()}>LOGIN</div>
        )}
      </PopoverContent>
    </Popover>
  );
};
