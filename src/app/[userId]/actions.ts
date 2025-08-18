"use server";

import { prisma } from "@/lib/prisma";

export const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } });
  return user;
};

export const getAllMemos = async (userId: string) => {
  const memos = await prisma.memo.findMany({ where: { userId } });
  return memos;
};

export const addMemo = async (userId: string, title: string) => {
  const newMemo = await prisma.memo.create({ data: { title, userId } });
  return newMemo;
};
