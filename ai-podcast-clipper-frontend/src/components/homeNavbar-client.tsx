"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomeNavBarClient({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="border- sticky top-0 z-50 border-black bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center">
          <div className="font-sans text-xl font-medium tracking-tight">
            <span className="text-white">Podcast</span>
            <span className="font-light text-gray-500">/</span>
            <span className="font-light text-gray-100">clipper</span>
          </div>
        </Link>

        {/* Center - Desktop Nav */}
        <nav className="hidden flex-1 justify-center gap-8 text-base lg:flex">
          <Link href="#features" className="text-white hover:text-gray-200">
            Features
          </Link>
          <Link href="#features" className="text-white hover:text-gray-200">
            How it Works
          </Link>
          <Link href="#features" className="text-white hover:text-gray-200">
            Testimonials
          </Link>
          <Link href="#features" className="text-white hover:text-gray-200">
            Contact
          </Link>
        </nav>

        {/* Right - Login/Dashboard Button */}
        <div className="hidden items-center justify-end lg:flex">
          <Link href={isLoggedIn ? "/dashboard" : "/login"}>
            <Button variant="outline" size="sm">
              {isLoggedIn ? "Dashboard" : "Login"}
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background space-y-3 border-t px-4 py-4 lg:hidden">
          <Link href="#features" onClick={toggleMenu} className="block">
            Features
          </Link>
          <Link href="#how-it-works" onClick={toggleMenu} className="block">
            How it Works
          </Link>
          <Link href="#testimonials" onClick={toggleMenu} className="block">
            Testimonials
          </Link>
          <Link href="#footer" onClick={toggleMenu} className="block">
            Contact
          </Link>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            onClick={toggleMenu}
          >
            <Button variant="outline" size="sm" className="w-full">
              {isLoggedIn ? "Dashboard" : "Login"}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
