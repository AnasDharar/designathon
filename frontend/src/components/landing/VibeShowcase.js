"use client";

import { FadeIn, FadeInUp } from "@/components/motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Briefcase, Flame, Sparkles, Diamond, Zap, Accessibility } from "lucide-react";
import { motion } from "framer-motion";
import { VIBE_AXES } from "@/lib/constants";
const AXIS_ICONS = {
  briefcase: Briefcase,
  flame: Flame,
  originality: Sparkles,
  sparkles: Sparkles,
  diamond: Diamond,
  zap: Zap,
  accessibility: Accessibility,
};

const exampleVibe = {
  title: "Minimal Brutalist Editorial",
  description: "Raw, unapologetic design with strong typographic hierarchy. Inspired by editorial print meets digital brutalism.",
  scores: {
    professionalism: 0.7,
    warmth: 0.2,
    originality: 0.9,
    visualDensity: 0.4,
    interactionEnergy: 0.3,
    accessibilityBias: 0.5,
  },
};

function RadarChart({ scores, size = 240 }) {
  const axes = VIBE_AXES;
  const center = size / 2;
  const radius = size / 2 - 30;

  const points = axes.map((axis, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const value = scores[axis.key] || 0;
    return {
      x: center + radius * value * Math.cos(angle),
      y: center + radius * value * Math.sin(angle),
      labelX: center + (radius + 20) * Math.cos(angle),
      labelY: center + (radius + 20) * Math.sin(angle),
      label: axis.label,
      icon: axis.icon,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={axes
            .map((_, i) => {
              const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
              return `${center + radius * ring * Math.cos(angle)},${center + radius * ring * Math.sin(angle)}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {axes.map((_, i) => {
        const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data area */}
      <motion.path
        d={pathD}
        fill="url(#radar-gradient)"
        fillOpacity="0.15"
        stroke="url(#radar-stroke)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#8b5cf6"
          stroke="#050505"
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
        />
      ))}

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[10px] fill-secondary"
        >
          {p.label}
        </text>
      ))}

      {/* Gradient defs */}
      <defs>
        <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="radar-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function VibeShowcase() {
  return (
    <section id="showcase" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">In Action</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Anatomy of a{" "}
            <span className="gradient-text">Vibe</span>
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-xl mx-auto">
            Every Vibe is a structured aesthetic identity — analyzed, scored, and explained.
          </p>
        </FadeIn>

        <FadeInUp>
          <Card className="p-0 overflow-hidden" hover={false}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Radar chart side */}
              <div className="p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
                <RadarChart scores={exampleVibe.scores} size={280} />
              </div>

              {/* Details side */}
              <div className="p-10">
                <Badge variant="accent" className="mb-4">Example Vibe</Badge>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  {exampleVibe.title}
                </h3>
                <p className="text-sm text-secondary mb-8 leading-relaxed">
                  {exampleVibe.description}
                </p>

                {/* Score bars */}
                <div className="space-y-4">
                  {VIBE_AXES.map((axis) => {
                    const score = exampleVibe.scores[axis.key];
                    return (
                      <div key={axis.key}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-secondary flex items-center gap-1.5">
                    {(() => {
                      const Icon = AXIS_ICONS[axis.icon];
                      return Icon ? <Icon size={14} /> : null;
                    })()}
                            {axis.label}
                          </span>
                          <span className="text-xs font-mono text-muted">{score.toFixed(1)}</span>
                        </div>
                        <div className="score-bar">
                          <motion.div
                            className="score-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${score * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </FadeInUp>
      </div>
    </section>
  );
}
