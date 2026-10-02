import React from "react";
import { cn } from "./utils";

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-[#F0DFD7] bg-white/90 px-4 py-2 text-sm text-[#35252E] placeholder:text-[#9E8B95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:border-pink-300 transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
