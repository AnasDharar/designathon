/**
 * Mock data for development — replace with API calls
 */

export const MOCK_USER = {
  id: "usr_001",
  displayName: "Designer",
  email: "designer@vibes.app",
  avatarUrl: null,
};

export const MOCK_VIBES = [
  {
    id: "vibe_001",
    title: "Minimal Brutalist Editorial",
    description:
      "Raw, unapologetic design with strong typographic hierarchy. Inspired by editorial print design meets digital brutalism.",
    scores: {
      professionalism: 0.7,
      warmth: 0.2,
      originality: 0.9,
      visualDensity: 0.4,
      interactionEnergy: 0.3,
      accessibilityBias: 0.5,
    },
    aestheticSummary:
      "A deliberately raw aesthetic that combines oversized serif typography with harsh grid structures. Monochromatic palette with occasional high-contrast accents. Embraces white space as a design element while maintaining strong editorial hierarchy.",
    referenceCount: 8,
    isPublic: true,
    status: "ready",
    createdAt: "2026-05-20T10:00:00Z",
  },
  {
    id: "vibe_002",
    title: "Warm Organic Modern",
    description:
      "Earthy tones, rounded shapes, and natural textures. Feels like a premium lifestyle brand.",
    scores: {
      professionalism: 0.6,
      warmth: 0.9,
      originality: 0.6,
      visualDensity: 0.3,
      interactionEnergy: 0.5,
      accessibilityBias: 0.7,
    },
    aestheticSummary:
      "Soft, organic forms with warm earth-tone palettes — terracotta, sage, cream. Rounded corners and fluid shapes create an approachable, human feel. Photography-heavy with natural textures and grain overlays.",
    referenceCount: 12,
    isPublic: true,
    status: "ready",
    createdAt: "2026-05-22T14:30:00Z",
  },
  {
    id: "vibe_003",
    title: "Futuristic Dark Premium",
    description:
      "Deep blacks, neon accents, and glass morphism. Think high-end tech product meets cyberpunk.",
    scores: {
      professionalism: 0.8,
      warmth: 0.2,
      originality: 0.8,
      visualDensity: 0.6,
      interactionEnergy: 0.8,
      accessibilityBias: 0.4,
    },
    aestheticSummary:
      "Deep black backgrounds with electric purple and cyan neon accents. Heavy use of glass-morphism, subtle gradients, and ambient glow effects. Futuristic typography with tight letter-spacing. Motion-rich interactions with particle effects.",
    referenceCount: 6,
    isPublic: false,
    status: "ready",
    createdAt: "2026-05-24T09:15:00Z",
  },
  {
    id: "vibe_004",
    title: "Dense Data Dashboard",
    description:
      "Information-rich interfaces with maximum utility. Every pixel earns its place.",
    scores: {
      professionalism: 0.9,
      warmth: 0.1,
      originality: 0.4,
      visualDensity: 0.9,
      interactionEnergy: 0.4,
      accessibilityBias: 0.8,
    },
    aestheticSummary:
      "Compact, information-dense layouts optimized for data consumption. Monospaced fonts for data, sans-serif for labels. Muted color palette with semantic color coding. Minimal decoration — every element serves a function.",
    referenceCount: 10,
    isPublic: true,
    status: "ready",
    createdAt: "2026-05-25T16:45:00Z",
  },
];

export const MOCK_GENERATIONS = [
  {
    id: "gen_001",
    vibeId: "vibe_001",
    prompt: "Design a brutalist hero section for an antique furniture marketing agency in India.",
    status: "ready",
    aiDirection:
      "A bold, oversized serif headline dominates the viewport with the agency name. Below, a grid of high-contrast furniture photography with harsh shadows. Navigation is minimal — just a hamburger icon and a single CTA in a contrasting color block.",
    createdAt: "2026-05-25T11:00:00Z",
  },
];

export const MOCK_CRITIQUES = [
  {
    id: "crit_001",
    vibeId: "vibe_002",
    scores: {
      vibeAlignment: 0.7,
      hierarchy: 0.8,
      typography: 0.6,
      spacing: 0.9,
      originality: 0.5,
      emotionalConsistency: 0.7,
      accessibility: 0.8,
    },
    summary:
      "Good spatial rhythm and hierarchy, but the typography choices drift from the warm organic vibe toward something more corporate. The color palette is well-aligned.",
    feedback: {
      whatWorks: [
        "Excellent use of white space creates breathing room",
        "Color palette aligns well with warm organic direction",
        "Card layout has natural, flowing hierarchy",
      ],
      whatDrifted: [
        "Typography feels too geometric and cold for this vibe",
        "Button styles are too sharp — consider more rounded corners",
        "Missing textural elements that define organic design",
      ],
      seniorAdvice: [
        "Swap Inter for a humanist sans-serif like Source Sans or even a subtle serif",
        "Add a paper or fabric texture overlay at very low opacity",
        "Soften the drop shadows — use larger blur with lower opacity",
      ],
    },
    status: "ready",
    createdAt: "2026-05-26T08:00:00Z",
  },
];
