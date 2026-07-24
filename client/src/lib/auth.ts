import { create } from "zustand";
import { User } from "@/types";
import { api } from "@/lib/api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await api.auth.login(email, password);
      localStorage.setItem("token", token);
      set({ token, user, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Error al iniciar sesion" });
      throw err;
    }
  },

  register: async (email, name, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await api.auth.register(email, name, password);
      localStorage.setItem("token", token);
      set({ token, user, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Error al crear cuenta" });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  fetchUser: async () => {
    try {
      const user = await api.auth.getMe();
      set({ user });
    } catch {
      localStorage.removeItem("token");
      set({ token: null, user: null });
    }
  },

  clearError: () => set({ error: null }),
}));
