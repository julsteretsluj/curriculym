import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Light wordmark ~4:1. */
const WORDMARK_RATIO = 959 / 240;

export function BrandMark({
  className,
  size = 28,
  variant = "icon",
  href = "/",
  priority = false,
  /** auto = swap with theme; light/dark force a specific wordmark (for fixed-theme surfaces). */
  tone = "auto",
}: {
  className?: string;
  /** Icon: square edge. Wordmark: height in px. */
  size?: number;
  variant?: "icon" | "wordmark";
  href?: string | null;
  priority?: boolean;
  tone?: "auto" | "light" | "dark";
}) {
  const width = Math.round(size * WORDMARK_RATIO);

  const lightImg = (
    <Image
      src="/curriculym-wordmark.png"
      alt="curriculym"
      width={width}
      height={size}
      className={cn(
        "h-auto w-auto object-contain object-left",
        tone === "auto" && "dark:hidden",
        className
      )}
      style={{ height: size, width: "auto" }}
      priority={priority}
    />
  );

  const darkImg = (
    <Image
      src="/curriculym-wordmark-dark.png"
      alt="curriculym"
      width={width}
      height={size}
      className={cn(
        "h-auto w-auto object-contain object-left",
        tone === "auto" && "hidden dark:block",
        className
      )}
      style={{ height: size, width: "auto" }}
      priority={priority}
    />
  );

  let mark: React.ReactNode;
  if (variant === "wordmark") {
    if (tone === "light") mark = lightImg;
    else if (tone === "dark") mark = darkImg;
    else
      mark = (
        <span className="relative inline-flex items-center">
          {lightImg}
          {darkImg}
        </span>
      );
  } else {
    mark = (
      <Image
        src="/curriculym-logo.png"
        alt="Curriculym"
        width={size}
        height={size}
        className={cn("shrink-0 object-contain", className)}
        priority={priority}
      />
    );
  }

  if (!href) return mark;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Curriculym home">
      {mark}
    </Link>
  );
}
