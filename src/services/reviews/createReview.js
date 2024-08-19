import { PrismaClient } from "@prisma/client";

export const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const newReview = await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  return newReview;
};
