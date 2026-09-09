import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDbUser } from "@/lib/db-user";
import { displayNameFor, ensureChannelMemberships, ensureChatSeed } from "@/lib/chat";

export async function GET(request: Request) {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) {
    return NextResponse.json({ error: "channelId required" }, { status: 400 });
  }

  await ensureChatSeed(user.tenantId);
  await ensureChannelMemberships(user.id, user.tenantId);

  const member = await prisma.chatMember.findUnique({
    where: { channelId_userId: { channelId, userId: user.id } },
  });
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const messages = await prisma.chatMessage.findMany({
    where: { channelId },
    orderBy: { createdAt: "asc" },
    take: 200,
    include: { sender: { include: { profile: true } } },
  });

  await prisma.chatMember.update({
    where: { id: member.id },
    data: { unread: 0 },
  });

  return NextResponse.json({
    me: { id: user.id, name: displayNameFor(user) },
    messages: messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt.toISOString(),
      from: displayNameFor(m.sender),
      senderId: m.senderId,
      mine: m.senderId === user.id,
    })),
  });
}

export async function POST(request: Request) {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { channelId?: string; body?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const channelId = body.channelId?.trim();
  const text = body.body?.trim();
  if (!channelId || !text) {
    return NextResponse.json({ error: "channelId and body required" }, { status: 400 });
  }
  if (text.length > 4000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  await ensureChatSeed(user.tenantId);
  await ensureChannelMemberships(user.id, user.tenantId);

  const member = await prisma.chatMember.findUnique({
    where: { channelId_userId: { channelId, userId: user.id } },
  });
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const channel = await prisma.chatChannel.findFirst({
    where: { id: channelId, tenantId: user.tenantId },
  });
  if (!channel) {
    return NextResponse.json({ error: "Channel not found" }, { status: 404 });
  }

  const message = await prisma.chatMessage.create({
    data: {
      channelId,
      senderId: user.id,
      body: text,
    },
    include: { sender: { include: { profile: true } } },
  });

  // Bump unread for other members
  await prisma.chatMember.updateMany({
    where: { channelId, userId: { not: user.id } },
    data: { unread: { increment: 1 } },
  });

  return NextResponse.json({
    message: {
      id: message.id,
      body: message.body,
      createdAt: message.createdAt.toISOString(),
      from: displayNameFor(message.sender),
      senderId: message.senderId,
      mine: true,
    },
  });
}
