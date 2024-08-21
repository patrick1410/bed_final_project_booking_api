import { PrismaClient } from "@prisma/client";

export const updateBookingById = async (id, updatedBookingObj) => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.updateMany({
    where: { id },
    data: updatedBookingObj,
  });

  return booking.count > 0 ? id : null;
};
