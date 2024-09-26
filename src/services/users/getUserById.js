import { PrismaClient } from "@prisma/client";

export const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      Review: true,
      Booking: true,
    },
  });

  return user;
};
