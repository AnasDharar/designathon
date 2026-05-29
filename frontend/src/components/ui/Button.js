"use client";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#111] text-[#f5e8d4] border-2 border-[#111] hover:bg-[#000] shadow-[4px_4px_0_0_#111]",
  secondary:
    "bg-[#fff7eb] text-[#111] border-2 border-[#111] hover:bg-[#f0e1ca] shadow-[4px_4px_0_0_#111]",
  ghost:
    "bg-transparent text-secondary border-2 border-transparent hover:border-[#111] hover:bg-[#f0e1ca]",
  outline:
    "bg-transparent border-2 border-[#111] text-foreground hover:bg-[#f0e1ca] shadow-[4px_4px_0_0_#111]",
  gradient:
    "bg-[#f2b84d] text-[#111] border-2 border-[#111] hover:bg-[#ef9f75] shadow-[4px_4px_0_0_#111]",
};

const sizes = {
  sm: "h-9 px-3 text-xs gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  xl: "h-14 px-8 text-lg gap-3",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-150 cursor-pointer",
        "focus:outline-none focus:ring-0",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
