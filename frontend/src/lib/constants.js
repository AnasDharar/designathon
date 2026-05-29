export const APP_NAME = "Vibes";
export const APP_TAGLINE = "Where AI Meets Taste";
export const APP_DESCRIPTION =
  "Create reusable aesthetic identities, generate UI with intention, and develop design taste through AI critique.";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const VIBE_AXES = [
  { key: "professionalism", label: "Professionalism", icon: "briefcase", anchors: { low: "Playful consumer apps", mid: "Modern SaaS", high: "Enterprise dashboards" } },
  { key: "warmth", label: "Warmth", icon: "flame", anchors: { low: "Cold, technical interfaces", mid: "Balanced, approachable", high: "Warm, organic, human" } },
  { key: "originality", label: "Originality", icon: "sparkles", anchors: { low: "Standard patterns", mid: "Creative but accessible", high: "Avant-garde, experimental" } },
  { key: "visualDensity", label: "Visual Density", icon: "diamond", anchors: { low: "Spacious, breathing room", mid: "Balanced content", high: "Dense, information-rich" } },
  { key: "interactionEnergy", label: "Interaction Energy", icon: "zap", anchors: { low: "Static, calm, minimal", mid: "Subtle transitions", high: "Highly dynamic, animated" } },
  { key: "accessibilityBias", label: "Accessibility Bias", icon: "accessibility", anchors: { low: "Low accessibility focus", mid: "WCAG AA compliant", high: "WCAG AAA, universal design" } },
];

export const DASHBOARD_NAV = [
  { label: "Home", href: "/dashboard", icon: "home" },
  { label: "Create Vibe", href: "/dashboard/create", icon: "plus" },
  { label: "Generate", href: "/dashboard/generate", icon: "sparkles" },
  { label: "Practice", href: "/dashboard/practice", icon: "target" },
  { label: "Explore", href: "/dashboard/explore", icon: "compass" },
];
