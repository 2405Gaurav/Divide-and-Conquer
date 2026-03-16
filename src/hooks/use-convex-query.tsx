// hooks are functions that let other functions use state, lifecycle logic, and custom hooks.
// hooks are used to share logic between components and also to keep the code clean and organized.
// A reusable function that uses other hooks inside it.
"use client";

import { useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import type { FunctionReference, FunctionReturnType } from "convex/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQuery = FunctionReference<"query", any, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyMutation = FunctionReference<"mutation", any, any>;

export const useConvexQuery = <Q extends AnyQuery>(
  query: Q,
  ...args: unknown[]
) => {
  type T = FunctionReturnType<Q>;
  // Only pass args[0] if arguments were actually provided
  const res = useQuery(
    query,
    args.length > 0
      ? (args[0] as Record<string, unknown>)
      : undefined
  );
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (res == undefined) {
      setIsLoading(true);
    } else {
      try {
        setData(res as T);
        setError(null);
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [res]);

  return {
    data,
    error,
    isLoading,
  };
};

export const useConvexMutation = <M extends AnyMutation>(mutation: M) => {
  type T = FunctionReturnType<M>;
  const mutationFn = useMutation(mutation);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (...args: unknown[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mutationFn(
        ...(args as [Record<string, unknown>])
      );
      setData(response as T);
      return response;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      toast.error(e.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};