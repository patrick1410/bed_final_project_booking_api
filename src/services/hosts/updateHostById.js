import { PrismaClient } from "@prisma/client";

export const updateHostById = async (id, updatedHostObj) => {
  const prisma = new PrismaClient();

  const host = await prisma.host.updateMany({
    where: { id },
    data: updatedHostObj,
  });

  return host.count > 0 ? id : null;
};
