import express from "express";

import authMiddleware from "../middleware/auth.js";
import { getProperties } from "../services/properties/getProperties.js";
import { getPropertyById } from "../services/properties/getPropertyById.js";
import { createProperty } from "../services/properties/createProperty.js";
import { deleteProperty } from "../services/properties/deleteProperty.js";
import NotFoundError from "../errors/notFoundError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties(location, pricePerNight, amenities);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      throw new NotFoundError("Property", id);
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds,
    } = req.body;

    const newProperty = await createProperty(
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
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deleteProperty(id);

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} was deleted!`,
      });
    } else {
      throw new NotFoundError("Property", id);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
