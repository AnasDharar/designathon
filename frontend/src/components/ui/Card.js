"use client";

import { cn } from "@/lib/utils";

export function Card({ children, className = "", hover = true, glow = false, ...props }) {
  return (
    <div
      className={cn(
        "bg-surface border-2 border-border p-6 shadow-[6px_6px_0_0_#111]",
        "transition-all duration-200",
        hover && "hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#111]",
        glow && "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className = "", ...props }) {
  return (
    <div
      className={cn(
        "bg-surface border-2 border-border p-6 shadow-[6px_6px_0_0_#111] transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#111]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
