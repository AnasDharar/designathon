/**
 * Utility functions for Vibes
 */

/** Merge class names, filtering out falsy values */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Format a vibe score (0-1) as a display string */
export function formatScore(score) {
  return (Math.round(score * 10) / 10).toFixed(1);
}

/** Get color for a score value */
export function getScoreColor(score) {
  if (score >= 0.8) return "#22c55e";
  if (score >= 0.6) return "#8b5cf6";
  if (score >= 0.4) return "#f59e0b";
  return "#ef4444";
}

/** Truncate text with ellipsis */
export function truncate(str, length = 100) {
  if (!str) return "";
  return str.length > length ? str.slice(0, length) + "…" : str;
}

/** Generate a random ID */
export function generateId() {
  return crypto.randomUUID?.() || Math.random().toString(36).slice(2, 11);
}

/** Delay utility for async operations */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Format relative time */
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
