//hooks are the function that lets other function use state,life syscle logic and custom 
//hooks are used to share logic between components and also to keep the code clean and organized
//A reusable function that uses other hooks inside it.
"use client";   

import { useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";

export const useConvexQuery = (query, ...args) => {
    // Only pass args[0] if arguments were actually provided
    const res = useQuery(query, args.length > 0 ? args[0] : undefined);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // ... rest of your code
    useEffect(() => {

        if(res==undefined){
            setIsLoading(true);
        }else{
            try{

                setData(res);
                // setIsLoading(false);
                setError(null);
            }catch(error){
                setError(error);
                toast.error(error.message);
            }finally{
                setIsLoading(false);
            }
        }
    }, [res])

    return {
        data,
        error,
        isLoading
    }
}



export const useConvexMutation = (mutation) => {
  const mutationFn = useMutation(mutation);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mutationFn(...args);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      toast.error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};