import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDbUser } from "@/lib/db-user";
import {
  displayNameFor,
  ensureChannelMemberships,
  ensureChatSeed,
} from "@/lib/chat";

export async function GET() {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureChatSeed(user.tenantId);
  await ensureChannelMemberships(user.id, user.tenantId);

  const memberships = await prisma.chatMember.findMany({
    where: { userId: user.id },
    include: {
      channel: {
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            include: { sender: { include: { profile: true } } },
          },
        },
      },
    },
    orderBy: { channel: { name: "asc" } },
  });

  const channels = memberships.map((m) => {
    const last = m.channel.messages[0];
    return {
      id: m.channel.id,
      name: m.channel.name,
      audience: m.channel.audience,
      unread: m.unread,
      preview: last?.body ?? "No messages yet",
      lastAt: last?.createdAt?.toISOString() ?? null,
      lastFrom: last ? displayNameFor(last.sender) : null,
    };
  });

  return NextResponse.json({
    me: {
      id: user.id,
      name: displayNameFor(user),
    },
    channels,
  });
}
