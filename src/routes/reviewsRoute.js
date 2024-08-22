import express from "express";

import authMiddleware from "../middleware/auth.js";
import { getReviews } from "../services/reviews/getReviews.js";
import { getReviewById } from "../services/reviews/getReviewById.js";
import { createReview } from "../services/reviews/createReview.js";
import { updateReviewById } from "../services/reviews/updateReviewById.js";
import { deleteReview } from "../services/reviews/deleteReview.js";
import BadRequestError from "../errors/badRequestError.js";
import NotFoundError from "../errors/notFoundError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      throw new NotFoundError("Review", id);
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    if (!userId || !propertyId || !comment) {
      throw new BadRequestError("Please provide all fields!");
    }

    if (typeof rating !== "number" || rating <= 0 || rating > 5) {
      throw new BadRequestError("Rating should be a number between 1 and 5!");
    }

    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await updateReviewById(id, { rating, comment });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} was updated!`,
      });
    } else {
      throw new NotFoundError("Review", id);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReview(id);

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} was deleted!`,
      });
    } else {
      throw new NotFoundError("Review", id);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
