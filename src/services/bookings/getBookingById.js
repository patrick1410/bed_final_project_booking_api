import { PrismaClient } from "@prisma/client";

export const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  return booking;
};
