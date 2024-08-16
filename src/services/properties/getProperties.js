import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  // Convert pricePerNight to a Decimal
  const pricePerNightDecimal = pricePerNight && new Decimal(pricePerNight);

  // If amenities split the string to create an array of amenities else return empty array
  const amenitiesArray = amenities ? amenities.split("-") : [];

  const properties = await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight: {
        equals: pricePerNightDecimal,
      },

      // Search more specific
      AND: amenitiesArray.map((amenity) => ({
        amenities: {
          some: {
            name: amenity,
          },
        },
      })),
    },
    include: {
      amenities: true, // Include amenities in the response
    },
  });

  return properties;
};
