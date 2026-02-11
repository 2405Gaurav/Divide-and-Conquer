"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);//!->is for typescript and it tell that trust me this i not null
//but wokrs fine for the javascript wiht out !

export function ConvexClientProvider({ children }) {
  return <ConvexProvider 
  client={convex}
  // useAuth={}
  >{children}
  </ConvexProvider>;
}