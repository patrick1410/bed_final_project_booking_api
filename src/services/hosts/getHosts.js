import { PrismaClient } from "@prisma/client";

export const getHosts = async () => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany();

  return hosts;
};
