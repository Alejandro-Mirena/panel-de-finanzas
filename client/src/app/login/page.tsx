"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";
import PasswordInput from "@/components/common/PasswordInput";

const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch {}
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Bienvenido de vuelta</h1>
          <p className="text-muted text-sm">
            Inicia sesion para acceder a tu panel
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
              <button
                onClick={clearError}
                className="ml-2 text-red-400 hover:text-red-300 cursor-pointer"
              >
                x
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Contraseña
              </label>
              <PasswordInput
                registration={register("password")}
                error={errors.password?.message}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 cursor-pointer bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all hover:scale-[1.02]"
            >
              {loading ? "Iniciando sesion..." : "Iniciar sesion"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-card-border text-center">
            <p className="text-muted text-sm">
              No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary-light transition-colors font-medium"
              >
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
