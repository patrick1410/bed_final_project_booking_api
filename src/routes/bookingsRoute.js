import express from "express";

import { getBookings } from "../services/bookings/getBookings.js";
import { getBookingById } from "../services/bookings/getBookingById.js";

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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} was not found!` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
