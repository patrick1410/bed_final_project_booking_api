import { PrismaClient } from "@prisma/client";

export const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: name,
  });

  return amenity.count > 0 ? id : null;
};
