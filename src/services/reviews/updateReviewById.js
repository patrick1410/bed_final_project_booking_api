import { PrismaClient } from "@prisma/client";

export const updateReviewById = async (id, updatedReviewObj) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.updateMany({
    where: { id },
    data: updatedReviewObj,
  });

  return review.count > 0 ? id : null;
};
