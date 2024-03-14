import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";

type UserIconProps = AvatarProps & {
  imageUrl: string;
};

export const UserIcon = ({ imageUrl, ...rest }: UserIconProps) => {
  return (
    <Avatar {...rest} className={cn("h-10 w-10", rest.className)}>
      <AvatarImage src={imageUrl} alt={"ALTDWAD"} />
      <AvatarFallback>
        <User className="w-1/2 h-1/2 max-w-8 max-h-8" />
      </AvatarFallback>
    </Avatar>
  );
};
