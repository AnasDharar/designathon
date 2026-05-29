"use client";

import { FadeIn, FadeInUp } from "@/components/motion";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create Your Vibe",
    description:
      "Upload references, paste Pinterest boards or Dribbble collections. Add a title and description for your aesthetic direction.",
    detail: "AI analyzes your references using multimodal vision, extracts patterns, and generates a structured Vibe Profile with six scored axes.",
    color: "#8b5cf6",
  },
  {
    number: "02",
    title: "Generate with Direction",
    description:
      "Select your Vibe, describe what you need — a hero section, a dashboard, a landing page. AI generates concepts aligned to your taste.",
    detail: "No more generic AI output. Every generation is filtered through your aesthetic DNA — the typography, spacing, color, and energy you defined.",
    color: "#a78bfa",
  },
  {
    number: "03",
    title: "Practice & Improve",
    description:
      "Upload your own designs. AI critiques them against your target Vibe — what works, what drifted, what a senior designer would fix.",
    detail: "Build design judgment through structured feedback. Understand the 'why' behind design decisions, not just the 'what'.",
    color: "#f59e0b",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative bg-bg-secondary">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-bg to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <FadeIn className="text-center mb-20">
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Three Steps to{" "}
            <span className="gradient-text">Better Design</span>
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-light to-warm hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <FadeInUp key={step.number} delay={i * 0.15}>
                <div className="flex gap-8 items-start">
                  {/* Step number */}
                  <div className="hidden md:flex flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-bold text-lg relative"
                      style={{
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}30`,
                        color: step.color,
                      }}
                    >
                      {step.number}
                      {/* Glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                        style={{ boxShadow: `0 0 30px ${step.color}20` }}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="md:hidden text-sm font-mono text-muted mb-2 block" style={{ color: step.color }}>
                      Step {step.number}
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-secondary leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
