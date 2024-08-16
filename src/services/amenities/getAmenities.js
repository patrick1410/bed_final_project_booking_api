import { PrismaClient } from "@prisma/client";

export const getAmenities = async () => {
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany();

  return amenities;
};
