import { PrismaClient } from "@prisma/client";

export const createAmenity = async (name) => {
  const prisma = new PrismaClient();
  const newAmenity = await prisma.amenity.create({
    data: {
      name,
    },
  });

  return newAmenity;
};
