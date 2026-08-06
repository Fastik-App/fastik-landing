import { fetchJson } from "@/lib/http";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const api = {
  subscribers: {
    subscribe: (email: string) =>
      fetchJson(`${API_URL}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }),
  },
};
