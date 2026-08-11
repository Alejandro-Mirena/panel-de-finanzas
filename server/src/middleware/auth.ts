import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const userId = (decoded as any).id;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!user.active) {
      return res.status(403).json({ message: "Cuenta desactivada" });
    }

    (req as any).userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
