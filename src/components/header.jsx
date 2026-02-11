"use client";

import { useStoreUserEffect } from "@/useStoreUserEffect";
import {
  SignedIn,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { BarLoader } from "react-spinners";

const Header = () => {
  const { isLoading } = useStoreUserEffect();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-backdrop-filter:bg-white/60">
      <nav className="flex justify-end p-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>

      {isLoading && <BarLoader width={100} color="#36d7b7" />}
    </header>
  );
};

export default Header;