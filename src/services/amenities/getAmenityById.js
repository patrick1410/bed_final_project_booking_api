import { PrismaClient } from "@prisma/client";

export const getAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: { id },
  });

  return amenity;
};
