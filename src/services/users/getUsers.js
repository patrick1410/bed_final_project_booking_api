import { PrismaClient } from "@prisma/client";

export const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
      email: {
        contains: email,
      },
    },
  });

  return users;
};
