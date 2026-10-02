import React from "react";
import { cn } from "./utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#F0DFD7] bg-white/90 backdrop-blur-sm text-[#35252E] shadow-sm hover:shadow-md hover:border-pink-200 transition-all",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-lg font-bold leading-none tracking-tight text-[#2A1D24]", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-[#7E6A74]", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
}
