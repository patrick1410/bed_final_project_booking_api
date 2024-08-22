import { PrismaClient } from "@prisma/client";

export const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  const formattedBooking = {
    ...booking,
    totalPrice: Number(booking.totalPrice), // Format totalPrice to number
  };

  return formattedBooking;
};
