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
  /** auto = swap with theme; light/dark force a specific asset (for fixed-theme surfaces). */
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

  const wordmarkLight = (
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

  const wordmarkDark = (
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

  const iconLight = (
    <Image
      src="/curriculym-logo.png"
      alt="Curriculym"
      width={size}
      height={size}
      className={cn(
        "shrink-0 object-contain",
        tone === "auto" && "dark:hidden",
        className
      )}
      priority={priority}
    />
  );

  const iconDark = (
    <Image
      src="/curriculym-logo-dark.png"
      alt="Curriculym"
      width={size}
      height={size}
      className={cn(
        "shrink-0 object-contain",
        tone === "auto" && "hidden dark:block",
        className
      )}
      priority={priority}
    />
  );

  let mark: React.ReactNode;
  if (variant === "wordmark") {
    if (tone === "light") mark = wordmarkLight;
    else if (tone === "dark") mark = wordmarkDark;
    else
      mark = (
        <span className="relative inline-flex items-center">
          {wordmarkLight}
          {wordmarkDark}
        </span>
      );
  } else if (tone === "light") {
    mark = iconLight;
  } else if (tone === "dark") {
    mark = iconDark;
  } else {
    mark = (
      <span className="relative inline-flex items-center">
        {iconLight}
        {iconDark}
      </span>
    );
  }

  if (!href) return mark;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Curriculym home">
      {mark}
    </Link>
  );
}
