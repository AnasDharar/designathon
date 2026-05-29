"use client";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-[#fff7eb] text-[#111] border-2 border-[#111]",
  accent: "bg-[#f2b84d] text-[#111] border-2 border-[#111]",
  warm: "bg-[#ef9f75] text-[#111] border-2 border-[#111]",
  success: "bg-[#9cd7b6] text-[#111] border-2 border-[#111]",
  error: "bg-[#f3b1b1] text-[#111] border-2 border-[#111]",
};

export function Badge({ children, variant = "default", className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        "transition-colors duration-200",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
