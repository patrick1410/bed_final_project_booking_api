import express from "express";

import { getUsers } from "../services/users/getUsers.js";
import { getUserById } from "../services/users/getUserById.js";

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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} was not found!` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
