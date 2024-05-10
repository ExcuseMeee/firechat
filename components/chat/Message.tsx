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
      <UserIcon username={message.username} className="w-12 h-12" />
      <div className="flex flex-col flex-grow">
        <div className="h-fit">
          {message.username.length === 0 ? <span className="text-gray-400">(Not Found)</span> : <span>{message.username}</span>}
        </div>
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
