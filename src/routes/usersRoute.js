import express from "express";

import { getUsers } from "../services/users/getUsers.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
