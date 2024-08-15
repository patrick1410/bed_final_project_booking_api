import express from "express";

import { getUsers } from "../services/users/getUsers.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
