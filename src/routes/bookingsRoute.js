import express from "express";

import authMiddleware from "../middleware/auth.js";
import { getBookings } from "../services/bookings/getBookings.js";
import { getBookingById } from "../services/bookings/getBookingById.js";
import { createBooking } from "../services/bookings/createBooking.js";
import { updateBookingById } from "../services/bookings/updateBookingById.js";
import { deleteBooking } from "../services/bookings/deleteBooking.js";
import NotFoundError from "../errors/notFoundError.js";

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
      throw new NotFoundError("Booking", id);
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const booking = await updateBookingById(id, {
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} was updated!`,
      });
    } else {
      throw new NotFoundError("Booking", id);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBooking(id);

    if (booking) {
      res.status(200).send({
        message: `Booking with id ${id} was deleted!`,
      });
    } else {
      throw new NotFoundError("Booking", id);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
