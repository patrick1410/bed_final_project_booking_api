import { PrismaClient } from "@prisma/client";

export const getProperties = async () => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany();

  return properties;
};
