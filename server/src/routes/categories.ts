import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { Transaction } from "../entity/Transaction";
import { authMiddleware } from "../middleware/auth";
import { IsNull } from "typeorm";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const categoryRepository = AppDataSource.getRepository(Category);

    let categories = await categoryRepository.find({ where: { userId } });

    if (categories.length === 0) {
      const templates = await categoryRepository.find({
        where: { userId: IsNull() },
      });

      if (templates.length > 0) {
        const clones = categoryRepository.create(
          templates.map((t) => ({
            name: t.name,
            color: t.color,
            icon: t.icon,
            userId,
          }))
        );
        categories = await categoryRepository.save(clones);
      }
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { name, color, icon } = req.body;
    const categoryRepository = AppDataSource.getRepository(Category);

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = categoryRepository.create({ name, color, icon, userId });
    await categoryRepository.save(category);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { name, color, icon } = req.body;
    const categoryRepository = AppDataSource.getRepository(Category);

    const category = await categoryRepository.findOne({
      where: { id: id as string, userId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name !== undefined) {
      if (!name) {
        return res.status(400).json({ message: "Name cannot be empty" });
      }
      category.name = name;
    }
    if (color !== undefined) category.color = color;
    if (icon !== undefined) category.icon = icon;

    await categoryRepository.save(category);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const categoryRepository = AppDataSource.getRepository(Category);
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const category = await categoryRepository.findOne({
      where: { id: id as string, userId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const inUse = await transactionRepository.count({
      where: { categoryId: id as string },
    });

    if (inUse > 0) {
      return res.status(400).json({
        message: "No se puede eliminar: hay transacciones que usan esta categoria",
      });
    }

    await categoryRepository.remove(category);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
});

export default router;
