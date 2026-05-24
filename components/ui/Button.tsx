"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-sm cursor-pointer";

  const variants = {
    primary: "bg-[#C9A84C] text-[#0B0D17] hover:bg-[#D4B56A] active:scale-95",
    outline: "border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0B0D17] active:scale-95",
    ghost: "text-[#C9A84C] hover:text-[#D4B56A] underline underline-offset-4",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
