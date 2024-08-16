import express from "express";

import { getReviews } from "../services/reviews/getReviews.js";
import { getReviewById } from "../services/reviews/getReviewById.js";

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
      res.status(404).json({ message: `Review with id ${id} was not found!` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
