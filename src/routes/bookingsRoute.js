import express from "express";

import { getBookings } from "../services/bookings/getBookings.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

export default router;
