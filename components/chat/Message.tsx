"use client";

import { Msg } from "@/types";
import { AudioIcon } from "@/components/common/AudioIcon";
import { UserIcon } from "../common/UserIcon";
import { PlayAudio } from "../common/PlayAudio";

type MessageProps = {
  message: Msg;
};

export const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex space-x-2 items-center my-2">
      <UserIcon imageUrl="" className="w-12 h-12" />
      <div className="flex flex-col flex-grow">
        <div className="h-fit">{message.senderId}</div>
        <div className="flex flex-wrap items-center">
          <PlayAudio sounds={message.payload} />
          {message.payload.map((src, i) => (
            <AudioIcon
              key={i}
              src={src}
              iconType={"message"}
              className="w-10 h-10"
            />
          ))}
        </div>
      </div>
    </div>
  );
};