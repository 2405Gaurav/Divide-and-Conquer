"use client";

import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function useStoreUserEffect() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    if (userId !== null) {
      return;
    }

    async function createUser() {
      try {
        const id = await storeUser();
        setUserId(id);
      } catch (error) {
        console.error("Failed to store user:", error);
      }
    }

    createUser();

    return () => setUserId(null);
  }, [isLoading, isAuthenticated, storeUser, user?.id, userId]);

  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
}