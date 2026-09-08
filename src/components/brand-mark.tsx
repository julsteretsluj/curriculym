import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Official mark assets — icon is square; wordmark is ~4:1. */
const WORDMARK_RATIO = 959 / 240;

export function BrandMark({
  className,
  size = 28,
  variant = "icon",
  href = "/",
  priority = false,
}: {
  className?: string;
  /** Icon: square edge. Wordmark: height in px. */
  size?: number;
  variant?: "icon" | "wordmark";
  href?: string | null;
  priority?: boolean;
}) {
  const mark =
    variant === "wordmark" ? (
      <Image
        src="/curriculym-wordmark.png"
        alt="curriculym"
        width={Math.round(size * WORDMARK_RATIO)}
        height={size}
        className={cn("h-auto w-auto object-contain object-left", className)}
        style={{ height: size, width: "auto" }}
        priority={priority}
      />
    ) : (
      <Image
        src="/curriculym-logo.png"
        alt="Curriculym"
        width={size}
        height={size}
        className={cn("shrink-0 object-contain", className)}
        priority={priority}
      />
    );

  if (!href) return mark;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Curriculym home">
      {mark}
    </Link>
  );
}
