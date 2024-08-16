import express from "express";

import { getAmenities } from "../services/amenities/getAmenities.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

export default router;
