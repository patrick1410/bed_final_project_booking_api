import { Router } from "express";
import { login } from "../services/auth/login.js";
import BadRequestError from "../errors/badRequestError.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and password are required!"); // Throw an error if username or password is missing
    }

    const token = await login(username, password);

    if (!token) {
      res.status(401).json({ message: "Invalid credentials!" });
    } else {
      res.status(200).json({ message: "Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
