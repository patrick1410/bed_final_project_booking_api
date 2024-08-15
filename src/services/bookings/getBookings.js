import { PrismaClient } from "@prisma/client";

export const getBookings = async () => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany();

  return bookings;
};
