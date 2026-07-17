import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const categoryRepository = AppDataSource.getRepository(Category);

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepository.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, color, icon } = req.body;

    const category = categoryRepository.create({ name, color, icon });
    await categoryRepository.save(category);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});

export default router;
