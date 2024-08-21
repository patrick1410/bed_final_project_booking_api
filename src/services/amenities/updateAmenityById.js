import { PrismaClient } from "@prisma/client";

export const updateAmenityById = async (id, updatedAmenityObj) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: updatedAmenityObj,
  });

  return amenity.count > 0 ? id : null;
};
