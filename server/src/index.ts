import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { seedCategories } from "./seed";
import authRoutes from "./routes/auth";
import transactionRoutes from "./routes/transactions";
import categoryRoutes from "./routes/categories";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "10kb" }));

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Demasiadas peticiones, intenta de nuevo en un minuto" },
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    await seedCategories();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));
