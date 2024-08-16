import express from "express";

import { getProperties } from "../services/properties/getProperties.js";

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

export default router;
