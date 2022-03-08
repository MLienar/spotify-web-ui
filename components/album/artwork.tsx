import Image from "next/image";

interface Props {
  src: string | StaticImageData;
  alt: string;
  onEnter?: React.MouseEventHandler<HTMLImageElement>;
  onLeave?: React.MouseEventHandler<HTMLImageElement>;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
  size?: string;
  priority?: boolean | undefined;
}

export default function Artwork({
  src,
  alt,
  onEnter = undefined,
  onLeave = undefined,
  priority = undefined,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className={"artwork "}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      priority={priority}
    />
  );
}
