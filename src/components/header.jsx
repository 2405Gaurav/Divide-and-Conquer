"use client";

import { useStoreUserEffect } from "@/useStoreUserEffect";
import {
  SignedIn,
  SignInButton,
  SignUpButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isLoading } = useStoreUserEffect();
  
  //we need to only display the fature and how it works,but only when we are on the Hoome page
  //for this we will use the usePathname hook from next/navigation and check if the pathname is / then only we will display the fature and how it works
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b border-emerald-100 bg-white/95 backdrop-blur z-50">
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        
        {/* LEFT → Logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Image
            src="/images/logo2.png"
            alt="logo"
            width={140}
            height={40}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* CENTER → Features & How it works (Conditional) */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
            > 
              Features 
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
            > 
              How it works 
            </Link> 
          </div> 
        )}

        {/* RIGHT → Auth Buttons */}
        <div className="flex items-center gap-4">
          
          {/* Show when user is NOT logged in */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50">
                Sign In
              </Button>
            </SignInButton>
            
            <SignUpButton mode="modal">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* Show when user IS logged in */}
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50">
                Dashboard
              </Button>
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10 border border-emerald-200"
                }
              }}
            />
          </SignedIn>
        </div>
      </nav>

      {/* Loading Bar with Green Theme */}
      {isLoading && (
        <div className="absolute bottom-0 w-full">
          <BarLoader width="100%" height={3} color="#10b981" />
        </div>
      )}
    </header>
  );
};

export default Header;