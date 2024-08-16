import express from "express";

import { getHosts } from "../services/hosts/getHosts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

export default router;
