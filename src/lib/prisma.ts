import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connect = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
