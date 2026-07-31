import { AppDataSource } from "./data-source";
import { Category } from "./entity/Category";

const defaultCategories = [
  { name: "Comida", icon: "🍔", color: "#f97316" },
  { name: "Transporte", icon: "🚗", color: "#3b82f6" },
  { name: "Vivienda", icon: "🏠", color: "#8b5cf6" },
  { name: "Servicios", icon: "💡", color: "#eab308" },
  { name: "Entretenimiento", icon: "🎬", color: "#ec4899" },
  { name: "Salud", icon: "🏥", color: "#22c55e" },
  { name: "Ropa", icon: "👕", color: "#06b6d4" },
  { name: "Educacion", icon: "📚", color: "#14b8a6" },
  { name: "Salario", icon: "💼", color: "#22c55e" },
  { name: "Freelance", icon: "💻", color: "#3b82f6" },
  { name: "Regalos", icon: "🎁", color: "#ec4899" },
];

export async function seedCategories() {
  const categoryRepository = AppDataSource.getRepository(Category);
  const count = await categoryRepository.count();

  if (count > 0) {
    console.log("Categories already seeded");
    return;
  }

  const categories = categoryRepository.create(defaultCategories);
  await categoryRepository.save(categories);
  console.log(`${defaultCategories.length} default categories created`);
}
