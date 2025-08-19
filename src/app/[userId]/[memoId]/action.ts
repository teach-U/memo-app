"use server";

import { prisma } from "@/lib/prisma";

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
