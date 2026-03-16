"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger the mild launch effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`
        fixed top-0 w-full z-50 
        bg-white/80 backdrop-blur-md border-b border-gray-100
        transition-all duration-1000 ease-out
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image
            src={"/images/logos/logo2.png"}
            alt="Vehiql Logo"
            width={160}
            height={80}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* CENTER LINKS - Only on Home Page */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-500 hover:text-[#1cc29f] transition-colors duration-300"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-500 hover:text-[#1cc29f] transition-colors duration-300"
            >
              How It Works
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium text-gray-500 hover:text-[#1cc29f] transition-colors duration-300"
            >
              Docs
            </Link>
          </div>
        )}

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              {/* Desktop Dashboard Button */}
              <Button
                variant="ghost"
                className="hidden md:inline-flex items-center gap-2 text-gray-600 hover:text-[#1cc29f] hover:bg-[#1cc29f]/10 transition-all duration-300"
              >
                Dashboard
              </Button>
              {/* Mobile Dashboard Icon */}
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden text-gray-600"
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border-2 border-white shadow-sm",
                  userButtonPopoverCard: "shadow-xl border border-gray-100",
                  userPreviewMainIdentifier: "font-semibold text-gray-700",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton mode="modal">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button 
                className="bg-[#1cc29f] hover:bg-[#15a386] text-white border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>

      {/* Loading Bar - Matches the Teal theme */}
      {isLoading && (
        <div className="absolute bottom-0 w-full">
          <BarLoader width={"100%"} color="#1cc29f" height={2} />
        </div>
      )}
    </header>
  );
}