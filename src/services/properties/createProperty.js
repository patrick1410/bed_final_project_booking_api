import { PrismaClient } from "@prisma/client";

export const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating,
  amenityIds
) => {
  const prisma = new PrismaClient();

  const newProperty = await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenities: {
        connect: amenityIds.map((id) => ({ id })),
      },
    },
    include: {
      amenities: true,
    },
  });

  return newProperty;
};
