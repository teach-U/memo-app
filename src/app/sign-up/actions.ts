"use server";

import { prisma } from "@/lib/prisma";

export const getUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const addUser = async (name: string) => {
  const newUser = await prisma.user.create({ data: { name } });
  return newUser;
};
