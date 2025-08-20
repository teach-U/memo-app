"use server";

import { prisma } from "../prisma";

export const getAllMemos = async (userId: string) => {
  const memos = await prisma.memo.findMany({ where: { userId } });
  return memos;
};

export const addMemo = async (userId: string, title: string) => {
  const newMemo = await prisma.memo.create({ data: { title, userId } });
  return newMemo;
};

export const updateMemo = async (
  id: string,
  title: string,
  content: string
) => {
  await prisma.memo.update({
    data: { title, content },
    where: { id },
  });
};

export const deleteMemo = async (id: string) => {
  await prisma.memo.delete({ where: { id } });
};
