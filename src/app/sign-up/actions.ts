"use server";

import { prisma } from "@/lib/prisma";

export const addUser = async (name: string) => {
  const newUser = await prisma.user.create({ data: { name } });
  return newUser;
};
