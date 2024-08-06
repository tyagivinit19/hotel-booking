import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import validateRequest from "../middlewares/validateRequest";
import loginValidator from "../validators/loginValidator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth";
const router = express.Router();

router.post(
  "/login",
  validateRequest(loginValidator),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({ userId: user._id });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

export default router;
