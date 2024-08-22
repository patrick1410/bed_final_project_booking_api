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

  const formattedBookings = bookings.map((booking) => ({
    ...booking,
    totalPrice: Number(booking.totalPrice), // Format totalPrice to number
  }));

  return formattedBookings;
};
