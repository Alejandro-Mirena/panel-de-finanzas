import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Transaction, TransactionType } from "../entity/Transaction";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const transactionRepository = AppDataSource.getRepository(Transaction);

router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { startDate, endDate, categoryId } = req.query;

    const where: any = { userId };

    if (startDate && endDate) {
      where.date = new Date(startDate as string) <= new Date(endDate as string)
        ? { $gte: new Date(startDate as string), $lte: new Date(endDate as string) }
        : undefined;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const transactions = await transactionRepository.find({
      where,
      relations: ["category"],
      order: { date: "DESC" },
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { amount, type, description, date, categoryId } = req.body;

    const transaction = transactionRepository.create({
      amount,
      type,
      description,
      date: new Date(date),
      userId,
      categoryId,
    });

    await transactionRepository.save(transaction);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { amount, type, description, date, categoryId } = req.body;

    const transaction = await transactionRepository.findOne({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.amount = amount;
    transaction.type = type;
    transaction.description = description;
    transaction.date = new Date(date);
    transaction.categoryId = categoryId;

    await transactionRepository.save(transaction);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const transaction = await transactionRepository.findOne({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transactionRepository.remove(transaction);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
});

router.get("/stats", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const transactions = await transactionRepository.find({
      where: { userId },
      relations: ["category"],
    });

    const balance = transactions.reduce((acc, t) => {
      return t.type === TransactionType.INCOME ? acc + Number(t.amount) : acc - Number(t.amount);
    }, 0);

    const expensesByCategory = transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => {
        const categoryName = t.category?.name || "Sin categoría";
        acc[categoryName] = (acc[categoryName] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const monthlyTrend = transactions.reduce((acc, t) => {
      const month = new Date(t.date).toISOString().slice(0, 7);
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      if (t.type === TransactionType.INCOME) {
        acc[month].income += Number(t.amount);
      } else {
        acc[month].expense += Number(t.amount);
      }
      return acc;
    }, {} as Record<string, { income: number; expense: number }>);

    res.json({
      balance,
      expensesByCategory,
      monthlyTrend,
      totalTransactions: transactions.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;
