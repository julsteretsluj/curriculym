import { prisma } from "@/lib/prisma";

const DEFAULT_CHANNELS = [
  {
    name: "Homeroom 8A",
    audience: "Class",
    seed: [
      { from: "Ms. Chen", body: "Reminder: bring PE kit tomorrow." },
      { from: "Aria", body: "Thanks — noted!" },
    ],
  },
  {
    name: "Sciences",
    audience: "Subject",
    seed: [{ from: "Mr. Okonkwo", body: "Lab safety form due Friday." }],
  },
  {
    name: "Robotics Club",
    audience: "ECA",
    seed: [{ from: "Coach Park", body: "Practice starts at 15:30 in STEM Lab." }],
  },
  {
    name: "Year 8 Parents",
    audience: "Family",
    seed: [{ from: "Office", body: "Sports day volunteering form is open." }],
  },
  {
    name: "Staff lounge",
    audience: "Staff",
    seed: [
      { from: "Cover desk", body: "Cover needed P4 Science — any volunteers?" },
    ],
  },
] as const;

/** Create default Harbor channels + welcome messages once per tenant. */
export async function ensureChatSeed(tenantId: string) {
  const existing = await prisma.chatChannel.count({ where: { tenantId } });
  if (existing > 0) return;

  for (const channel of DEFAULT_CHANNELS) {
    const created = await prisma.chatChannel.create({
      data: {
        tenantId,
        name: channel.name,
        audience: channel.audience,
        isPrivate: false,
      },
    });

    // System-style seed messages use a dedicated bot user per display name
    for (const msg of channel.seed) {
      const botEmail = `bot+${msg.from.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@harbor.local`;
      const bot = await prisma.user.upsert({
        where: {
          tenantId_email: { tenantId, email: botEmail },
        },
        update: {},
        create: {
          tenantId,
          email: botEmail,
          role: "STAFF",
          profile: {
            create: {
              tenantId,
              firstName: msg.from.split(" ")[0] ?? msg.from,
              lastName: msg.from.split(" ").slice(1).join(" ") || "Bot",
              displayName: msg.from,
            },
          },
        },
      });

      await prisma.chatMessage.create({
        data: {
          channelId: created.id,
          senderId: bot.id,
          body: msg.body,
        },
      });
    }
  }
}

/** Ensure the signed-in user is a member of every public channel in their tenant. */
export async function ensureChannelMemberships(userId: string, tenantId: string) {
  const channels = await prisma.chatChannel.findMany({
    where: { tenantId, isPrivate: false },
    select: { id: true },
  });

  for (const channel of channels) {
    await prisma.chatMember.upsert({
      where: {
        channelId_userId: { channelId: channel.id, userId },
      },
      update: {},
      create: { channelId: channel.id, userId },
    });
  }
}

export function displayNameFor(user: {
  email: string;
  profile?: { displayName?: string | null; firstName?: string; lastName?: string } | null;
}) {
  return (
    user.profile?.displayName?.trim() ||
    [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(" ").trim() ||
    user.email
  );
}
