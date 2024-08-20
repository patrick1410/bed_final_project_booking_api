import { PrismaClient } from "@prisma/client";

export const deleteHost = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.deleteMany({
    where: { id },
  });

  return host.count > 0 ? id : null;
};
