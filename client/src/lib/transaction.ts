import { z } from "zod";

export const transactionSchema = z.object({
  amount: z
    .number({ error: "Ingresa un monto" })
    .min(0.01, "El monto debe ser mayor a 0"),
  type: z.enum(["income", "expense"]),
  description: z
    .string({ error: "La descripcion es requerida" })
    .min(1, "La descripcion es requerida"),
  date: z.string({ error: "La fecha es requerida" }).min(1, "La fecha es requerida"),
  categoryId: z
    .string({ error: "Selecciona una categoria" })
    .min(1, "Selecciona una categoria"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
