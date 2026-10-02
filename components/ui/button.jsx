import React from "react";
import { cn } from "./utils";

export function buttonVariants({ variant = "default", size = "default", className = "" } = {}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = {
    default: "bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:opacity-95 shadow-md shadow-pink-200/60 active:scale-[0.98]",
    secondary: "bg-pink-50 text-pink-700 hover:bg-pink-100/80 border border-pink-200/80",
    outline: "border border-[#F0DFD7] bg-white/90 text-[#35252E] hover:bg-pink-50/50 hover:border-pink-200 shadow-sm",
    destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-200",
    ghost: "hover:bg-pink-50 text-[#7E6A74] hover:text-pink-700",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-11 px-8 text-base",
    icon: "h-9 w-9",
  };

  return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default, className);
}

export function Button({ className, variant = "default", size = "default", ...props }) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
