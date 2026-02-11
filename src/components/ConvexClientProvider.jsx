"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);//!->is for typescript and it tell that trust me this i not null
//but wokrs fine for the javascript wiht out !

export function ConvexClientProvider({ children }) {
  return <ConvexProviderWithClerk 
  client={convex}
  useAuth={useAuth}
  >{children}
  </ConvexProviderWithClerk>;
}