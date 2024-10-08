import express from "express";

import authMiddleware from "../middleware/auth.js";
import { getUsers } from "../services/users/getUsers.js";
import { getUserById } from "../services/users/getUserById.js";
import { createUser } from "../services/users/createUser.js";
import { updateUserById } from "../services/users/updateUserById.js";
import { deleteUser } from "../services/users/deleteUser.js";
import BadRequestError from "../errors/badRequestError.js";
import NotFoundError from "../errors/notFoundError.js";

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
      throw new NotFoundError("User", id);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture
    ) {
      throw new BadRequestError("Please provide all fields!");
    }

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const user = await updateUserById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} was updated!`,
      });
    } else {
      throw new NotFoundError("User", id);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);

    if (user) {
      res.status(200).send({
        message: `User with id ${id} was deleted!`,
      });
    } else {
      throw new NotFoundError("User", id);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
