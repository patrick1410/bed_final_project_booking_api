import express from "express";

import { getHosts } from "../services/hosts/getHosts.js";

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

export default router;
