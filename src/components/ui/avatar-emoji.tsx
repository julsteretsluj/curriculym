"use client";

/** Deterministic emoji avatars — same seed always yields the same emoji. */

const AVATAR_EMOJIS = [
  "🦊", "🐼", "🐨", "🦁", "🐯", "🐸", "🐙", "🦄", "🐲", "🦉",
  "🐧", "🦋", "🐝", "🐬", "🐳", "🌻", "🌈", "⭐", "🌙", "🔥",
  "🍀", "🎨", "🎵", "📚", "🚀", "⚽", "🎾", "🎯", "🧩", "💎",
  "🌊", "🌴", "🍓", "🍋", "🍪", "🧁", "☕", "🎧", "📷", "💡",
  "🧲", "🧪", "🪐", "🌸", "🌺", "🍄", "🦜", "🐢", "🦩", "🦫",
] as const;

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function avatarEmoji(seed: string): string {
  if (!seed.trim()) return "🙂";
  return AVATAR_EMOJIS[hashSeed(seed) % AVATAR_EMOJIS.length]!;
}

export function AvatarBubble({
  seed,
  size = 40,
  className = "",
  title,
}: {
  seed: string;
  size?: number;
  className?: string;
  title?: string;
}) {
  const emoji = avatarEmoji(seed);
  const fontSize = Math.max(14, Math.round(size * 0.48));

  return (
    <div
      title={title ?? emoji}
      aria-hidden={title ? undefined : true}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8EEF8] to-[#F5F5F7] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] dark:from-[#2C2C2E] dark:to-[#1C1C1E] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
      style={{ width: size, height: size, fontSize }}
    >
      <span className="leading-none">{emoji}</span>
    </div>
  );
}
