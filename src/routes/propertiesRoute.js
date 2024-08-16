import express from "express";

import { getProperties } from "../services/properties/getProperties.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperties();
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

export default router;
