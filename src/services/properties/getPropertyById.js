import { PrismaClient } from "@prisma/client";

export const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      amenities: true, // Include amenities in the response
    },
  });

  return property;
};
