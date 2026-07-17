const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API Error");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, name: string, password: string) =>
      fetchApi<{ token: string; user: any }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
      }),
  },
  transactions: {
    getAll: (params?: { startDate?: string; endDate?: string; categoryId?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.startDate) searchParams.append("startDate", params.startDate);
      if (params?.endDate) searchParams.append("endDate", params.endDate);
      if (params?.categoryId) searchParams.append("categoryId", params.categoryId);
      const query = searchParams.toString();
      return fetchApi<any[]>(`/transactions${query ? `?${query}` : ""}`);
    },
    create: (data: any) =>
      fetchApi<any>("/transactions", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchApi<any>(`/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchApi<void>(`/transactions/${id}`, { method: "DELETE" }),
    getStats: () => fetchApi<any>("/transactions/stats"),
  },
  categories: {
    getAll: () => fetchApi<any[]>("/categories"),
    create: (data: any) =>
      fetchApi<any>("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
