"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerChildren, staggerItem } from "@/components/motion";
import { MOCK_VIBES } from "@/lib/mockData";
import { VIBE_AXES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

function ExploreVibeCard({ vibe }) {
  return (
    <Card className="group cursor-pointer" glow>
      <div className="flex items-start justify-between mb-3">
        <Badge variant="accent">Community</Badge>
        <span className="text-xs text-muted">{vibe.referenceCount} refs</span>
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
        {vibe.title}
      </h3>
      <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-2">{vibe.description}</p>
      <div className="space-y-2">
        {VIBE_AXES.map((axis) => {
          const score = vibe.scores[axis.key];
          return (
            <div key={axis.key} className="flex items-center gap-2">
              <span className="text-[10px] w-20 truncate text-muted">{axis.label}</span>
              <div className="score-bar flex-1"><div className="score-bar-fill" style={{ width: `${score * 100}%` }} /></div>
              <span className="text-[10px] font-mono text-muted w-6 text-right">{score.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted mt-4">{timeAgo(vibe.createdAt)}</p>
    </Card>
  );
}

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-1">Explore Vibes</h1>
        <p className="text-secondary mb-8">Discover trending aesthetic identities from the community.</p>
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_VIBES.filter((v) => v.isPublic).map((vibe) => (
          <motion.div key={vibe.id} variants={staggerItem}>
            <ExploreVibeCard vibe={vibe} />
          </motion.div>
        ))}
      </StaggerChildren>
    </div>
  );
}
