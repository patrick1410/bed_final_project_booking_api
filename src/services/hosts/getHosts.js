import { PrismaClient } from "@prisma/client";

export const getHosts = async (name) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return hosts;
};
