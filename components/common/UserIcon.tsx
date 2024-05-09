import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";
import { minidenticon } from "minidenticons";

type UserIconProps = AvatarProps & {
  username: string;
};

export const UserIcon = ({ username, ...rest }: UserIconProps) => {
  const svgURI =
    username === ""
      ? ""
      : "data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(username));

  return (
    <Avatar {...rest} className={cn("h-10 w-10", rest.className)}>
      <AvatarImage src={svgURI} alt={"ALTDWAD"} className="bg-white" />
      <AvatarFallback>
        <User className="w-1/2 h-1/2 max-w-8 max-h-8" />
      </AvatarFallback>
    </Avatar>
  );
};
