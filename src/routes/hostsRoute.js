import express from "express";

import authMiddleware from "../middleware/auth.js";
import { getHosts } from "../services/hosts/getHosts.js";
import { getHostById } from "../services/hosts/getHostById.js";
import { createHost } from "../services/hosts/createHost.js";
import { updateHostById } from "../services/hosts/updateHostById.js";
import { deleteHost } from "../services/hosts/deleteHost.js";
import BadRequestError from "../errors/badRequestError.js";
import NotFoundError from "../errors/notFoundError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (!host) {
      throw new NotFoundError("Host", id);
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture ||
      !aboutMe
    ) {
      throw new BadRequestError("Please provide all fields!");
    }

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const host = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} was updated!`,
      });
    } else {
      throw new NotFoundError("Host", id);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await deleteHost(id);

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} was deleted!`,
      });
    } else {
      throw new NotFoundError("Host", id);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
