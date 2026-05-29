"use client";

import { cn } from "@/lib/utils";

export function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-secondary uppercase tracking-wide">{label}</label>
      )}
      <input
        className={cn(
          "h-11 px-4 bg-[#fff7eb] border-2 border-[#111] text-foreground",
          "placeholder:text-muted text-sm",
          "transition-all duration-150",
          "focus:outline-none focus:bg-white",
          "hover:bg-white",
          error && "border-error",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-secondary uppercase tracking-wide">{label}</label>
      )}
      <textarea
        className={cn(
          "min-h-[120px] px-4 py-3 bg-[#fff7eb] border-2 border-[#111] text-foreground",
          "placeholder:text-muted text-sm resize-y",
          "transition-all duration-150",
          "focus:outline-none focus:bg-white",
          "hover:bg-white",
          error && "border-error",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
