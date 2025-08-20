"use server";

import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({ where: { id } });
  console.log(user);
  return user;
};

export const addUser = async (name: string) => {
  const newUser = await prisma.user.create({ data: { name } });
  return newUser;
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
};
