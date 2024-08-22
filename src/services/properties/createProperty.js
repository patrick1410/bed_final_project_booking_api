// import { PrismaClient } from "@prisma/client";

// export const createProperty = async (
//   title,
//   description,
//   location,
//   pricePerNight,
//   bedroomCount,
//   bathRoomCount,
//   maxGuestCount,
//   hostId,
//   rating,
//   amenityIds
// ) => {
//   const prisma = new PrismaClient();

//   const newProperty = await prisma.property.create({
//     data: {
//       title,
//       description,
//       location,
//       pricePerNight,
//       bedroomCount,
//       bathRoomCount,
//       maxGuestCount,
//       hostId,
//       rating,
//       amenities: {
//         connect: amenityIds.map((id) => ({ id })),
//       },
//     },
//     include: {
//       amenities: true,
//     },
//   });

//   return newProperty;
// };

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
  amenityIds = []
) => {
  const prisma = new PrismaClient();

  const data = {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  };

  // If amenityIds are provided map over them otherwise, it's an empty array
  if (amenityIds) {
    data.amenities = {
      connect: amenityIds.map((id) => ({ id })),
    };
  }

  const newProperty = await prisma.property.create({
    data,
    include: {
      amenities: true,
    },
  });

  return newProperty;
};
