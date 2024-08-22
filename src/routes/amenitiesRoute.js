import express from "express";

import authMiddleware from "../middleware/auth.js";
import { getAmenities } from "../services/amenities/getAmenities.js";
import { getAmenityById } from "../services/amenities/getAmenityById.js";
import { createAmenity } from "../services/amenities/createAmenity.js";
import { updateAmenityById } from "../services/amenities/updateAmenityById.js";
import { deleteAmenity } from "../services/amenities/deleteAmenity.js";
import BadRequestError from "../errors/badRequestError.js";
import NotFoundError from "../errors/notFoundError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const amenity = await getAmenityById(id);

//     if (!amenity) {
//       res.status(404).json({ message: `Amenity with id ${id} was not found!` });
//     } else {
//       res.status(200).json(amenity);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (!amenity) {
      throw new NotFoundError("Amenity", id);
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Please provide a name!");
    }

    const newAmenity = await createAmenity(name);

    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const amenity = await updateAmenityById(id, { name });

    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} was updated!`,
      });
    } else {
      throw new NotFoundError("Amenity", id);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenity(id);

    if (amenity) {
      res.status(200).send({
        message: `Amenity with id ${id} was deleted!`,
      });
    } else {
      throw new NotFoundError("Amenity", id);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
