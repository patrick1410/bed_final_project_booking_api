import { PrismaClient } from "@prisma/client";

export const updatePropertyById = async (id, updatedProperty) => {
  try {
    const prisma = new PrismaClient();

    const { amenityIds, ...rest } = updatedProperty;

    // Here we can't use updateMany() because we need to update the amenities field if it is passed
    const property = await prisma.property.update({
      where: { id },
      data: {
        ...rest,
        amenities: amenityIds
          ? {
              set: amenityIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    return property;
  } catch (error) {
    if (error.code === "P2025") {
      // Handle the specific error for "Record not found."
      return null;
    }
    throw error;
  }
};
