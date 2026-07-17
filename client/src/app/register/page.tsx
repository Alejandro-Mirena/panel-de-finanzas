"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    console.log("Register:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">$</span>
            </div>
            <span className="font-semibold text-xl">Finanzas</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Creá tu cuenta</h1>
          <p className="text-muted text-sm">Empezá a organizar tus finanzas en minutos</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nombre</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Tu nombre"
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Contraseña</label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Confirmar contraseña</label>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl font-medium transition-all hover:scale-[1.02]"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-card-border text-center">
            <p className="text-muted text-sm">
              ¿Ya tenés cuenta?{" "}
              <Link href="/login" className="text-primary hover:text-primary-light transition-colors font-medium">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
