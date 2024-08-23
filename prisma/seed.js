import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { hosts } = hostData;
  const { amenities } = amenityData;
  const { properties } = propertyData;
  const { bookings } = bookingData;
  const { reviews } = reviewData;

  // SEED #1

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // SEED #2 Properties with Amenity Relationships

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        hostId: property.hostId,
        rating: property.rating,
        amenities: { connect: property.amenityIds.map((id) => ({ id })) },
      },
    });
  }

  // SEED #3

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
