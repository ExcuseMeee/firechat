"use client";

import { AudioLines } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & {};

export const ImageWithFallback = ({ src, ...rest }: ImageWithFallbackProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <>
      {isError ? (
        <AudioLines className="w-2/3 h-2/3" />
      ) : (
        <Image {...rest} src={src} onError={() => setIsError(true)} />
      )}
    </>
  );
};
