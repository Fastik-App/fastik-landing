"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { HttpError } from "@/lib/http";

interface UseSubscribeMutationResult {
  subscribe: (email: string) => Promise<boolean>;
  loading: boolean;
}

export function useSubscribeMutation(): UseSubscribeMutationResult {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      await api.subscribers.subscribe(email);
      toast.success("You're on the list!", {
        description: "We'll reach out when early access opens.",
      });
      window.umami?.track("waitlist-signup");
      return true;
    } catch (err) {
      const message =
        err instanceof HttpError
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading };
}
