import { PrismaClient } from "@prisma/client";

export const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });

  return amenity.count > 0 ? id : null;
};
