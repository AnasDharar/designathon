"use client";

import { Palette, Sparkles, Target, BarChart3, Brain, Globe } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItem } from "@/components/motion";
import { GlassCard } from "@/components/ui/Card";
import { motion } from "framer-motion";

const features = [
  {
    icon: Palette,
    title: "Create Vibes",
    description:
      "Upload references from Pinterest, Dribbble, or your own screenshots. AI analyzes them into a reusable aesthetic identity with explainable scores.",
  },
  {
    icon: Sparkles,
    title: "Generate with Intention",
    description:
      "Select a Vibe and describe what you need. AI generates UI concepts guided by your aesthetic direction not generic templates.",
  },
  {
    icon: Target,
    title: "Practice & Critique",
    description:
      "Upload your own designs and receive AI critique on vibe alignment, hierarchy, typography, spacing, and emotional consistency.",
  },
  {
    icon: BarChart3,
    title: "Vibe Scores",
    description:
      "Six axes of aesthetic interpretation professionalism, warmth, originality, density, energy, and accessibility. All explainable, all adjustable.",
  },
  {
    icon: Brain,
    title: "Design Judgment",
    description:
      "Learn what senior designers see. Understand why designs work or drift. Build taste through structured AI-powered reasoning.",
  },
  {
    icon: Globe,
    title: "Share & Explore",
    description:
      "Publish your Vibes for others to use. Explore trending aesthetic identities from the community. Fork and remix.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16"> 
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Design Intelligence, <span className="gradient-text">Not Automation</span>
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
            Vibes doesn&apos;t replace designers. It amplifies taste, accelerates learning,
            and ensures AI generation respects your aesthetic vision.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <GlassCard className="h-full group cursor-default">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
