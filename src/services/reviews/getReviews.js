import { PrismaClient } from "@prisma/client";

export const getReviews = async () => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany();

  return reviews;
};
