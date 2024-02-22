"use client";

import { AudioLines } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & {};

export const ImageWithFallback = ({
  src,
  height,
  width,
  ...rest
}: ImageWithFallbackProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <>
      {isError ? (
        <AudioLines height={height} width={width} />
      ) : (
        <Image
          {...rest}
          src={src}
          height={height}
          width={width}
          onError={() => setIsError(true)}
        />
      )}
    </>
  );
};
