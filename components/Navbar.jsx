"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoriteContext";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { name, submitted } = useUser();
  const { favoritesCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Users", href: "/users" },
    { name: "Skills", href: "/skills" },
    { name: "Profile", href: "/profile" },
    { name: "Messages", href: "/messages" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F0DFD7] bg-[#FAF6F0]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 text-white font-extrabold text-sm shadow-sm shadow-pink-200 group-hover:scale-105 transition-transform">
            PM
          </div>
          <span className="font-bold tracking-tight text-[#2A1D24] text-base sm:text-lg">
            prawitamp<span className="text-pink-500">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-pink-100/90 text-pink-700 font-semibold shadow-xs"
                    : "text-[#7E6A74] hover:text-[#2A1D24] hover:bg-pink-50/70"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/favorites"
            className={cn(
              "ml-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
              pathname === "/favorites"
                ? "bg-rose-100 text-rose-700 border border-rose-200"
                : "text-[#7E6A74] hover:text-[#2A1D24] hover:bg-pink-50/70"
            )}
          >
            <span>Favorit</span>
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full text-xs font-semibold px-2 py-0.5 min-w-[20px]",
                favoritesCount > 0
                  ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xs"
                  : "bg-pink-100/80 text-pink-600"
              )}
            >
              {favoritesCount}
            </span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {submitted && name && (
            <div className="flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-3.5 py-1 text-xs font-medium text-pink-700">
              <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
              <span>Halo, {name}!</span>
            </div>
          )}

          <Link
            href="/contact"
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "font-semibold px-5",
            })}
          >
            Hubungi Saya
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          {submitted && name && (
            <span className="text-xs text-pink-700 font-medium bg-pink-50 px-2 py-1 rounded-full border border-pink-200">
              Halo, {name}!
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#7E6A74] hover:text-[#2A1D24] rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#F0DFD7] bg-[#FAF6F0] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm font-medium",
                pathname === link.href
                  ? "bg-pink-100 text-pink-700 font-semibold"
                  : "text-[#7E6A74] hover:bg-pink-50 hover:text-[#2A1D24]"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium",
              pathname === "/favorites"
                ? "bg-rose-100 text-rose-700"
                : "text-[#7E6A74] hover:bg-pink-50 hover:text-[#2A1D24]"
            )}
          >
            <span>Favorit</span>
            <span className="rounded-full bg-pink-500 text-white text-xs px-2 py-0.5">
              {favoritesCount}
            </span>
          </Link>
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-full bg-gradient-to-r from-pink-500 to-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
