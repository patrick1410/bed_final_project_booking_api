import express from "express";

import { getBookings } from "../services/bookings/getBookings.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

export default router;
