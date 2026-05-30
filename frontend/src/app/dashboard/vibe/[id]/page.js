"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion";
import { API_URL, VIBE_AXES } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

export default function VibeDetailPage({ params }) {
  const { id } = use(params);
  const [vibe, setVibe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadVibe = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/api/vibes/${id}`);
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.detail || `Failed to load vibe (${response.status})`);
        }
        const payload = await response.json();
        const normalized = {
          id: payload.id,
          title: payload.title,
          description: payload.description || "",
          scores: payload.scores || {
            professionalism: 0.5,
            warmth: 0.5,
            originality: 0.5,
            visualDensity: 0.5,
            interactionEnergy: 0.5,
            accessibilityBias: 0.5,
          },
          aestheticSummary: payload.aesthetic_summary || "Summary not available.",
          isPublic: Boolean(payload.is_public),
          referenceCount: Number(payload.reference_count || 0),
          createdAt: payload.created_at,
        };
        if (mounted) setVibe(normalized);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load vibe.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadVibe();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card hover={false}>
          <p className="text-sm text-secondary">Loading vibe...</p>
        </Card>
      </div>
    );
  }

  if (error || !vibe) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card hover={false}>
          <p className="text-sm text-red-400">{error || "Vibe not found."}</p>
          <Link href="/dashboard" className="text-sm text-accent mt-3 inline-block">
            Back to Dashboard
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors mb-6 inline-block">← Back to Dashboard</Link>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">{vibe.title}</h1>
            <p className="text-secondary mt-1">{vibe.description}</p>
            <div className="flex gap-2 mt-3">
              <Badge variant={vibe.isPublic ? "accent" : "default"}>{vibe.isPublic ? "Public" : "Private"}</Badge>
              <Badge>{vibe.referenceCount} references</Badge>
              <Badge>{timeAgo(vibe.createdAt)}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Edit</Button>
            <Link href="/dashboard/generate"><Button variant="gradient" size="sm">Generate →</Button></Link>
          </div>
        </div>
      </FadeIn>

      {/* Scores */}
      <FadeIn delay={0.1}>
        <Card hover={false} className="mb-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Vibe Scores</h2>
          <div className="space-y-5">
            {VIBE_AXES.map((axis) => {
              const score = vibe.scores[axis.key];
              return (
                <div key={axis.key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-secondary flex items-center gap-2"><span>{axis.icon}</span>{axis.label}</span>
                    <span className="text-sm font-mono text-accent">{score.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-warm"
                      initial={{ width: 0 }}
                      animate={{ width: `${score * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-muted">{axis.anchors.low}</span>
                    <span className="text-[10px] text-muted">{axis.anchors.high}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </FadeIn>

      {/* Aesthetic Summary */}
      <FadeIn delay={0.2}>
        <Card hover={false}>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Aesthetic Summary</h2>
          <p className="text-sm text-secondary leading-relaxed">{vibe.aestheticSummary}</p>
        </Card>
      </FadeIn>
    </div>
  );
}
