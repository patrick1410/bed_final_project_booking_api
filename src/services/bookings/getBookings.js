import { PrismaClient } from "@prisma/client";

export const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      userId: {
        contains: userId,
      },
    },
  });

  return bookings;
};
