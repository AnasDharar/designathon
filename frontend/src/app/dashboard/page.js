"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Zap, Target, Compass, BookOpen } from "lucide-react";
import { Card, GlassCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VIBE_AXES } from "@/lib/constants";
import { FadeIn } from "@/components/motion";
import { timeAgo } from "@/lib/utils";
import { api } from "@/lib/api";

function VibeCard({ vibe }) {
  return (
    <Link href={`/dashboard/vibe/${vibe.id}`}>
      <Card className="group cursor-pointer h-full" glow>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
              {vibe.title}
            </h3>
            <p className="text-xs text-muted mt-1">{timeAgo(vibe.createdAt)}</p>
          </div>
          <Badge variant={vibe.isPublic ? "accent" : "default"}>
            {vibe.isPublic ? "Public" : "Private"}
          </Badge>
        </div>

        <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-2">{vibe.description}</p>

        <div className="space-y-2">
          {VIBE_AXES.slice(0, 3).map((axis) => {
            const score = vibe.scores[axis.key];
            return (
              <div key={axis.key} className="flex items-center gap-2">
                <span className="text-[10px] text-muted w-20 truncate">{axis.label}</span>
                <div className="score-bar flex-1">
                  <div className="score-bar-fill" style={{ width: `${score * 100}%` }} />
                </div>
                <span className="text-[10px] font-mono text-muted w-6 text-right">{score.toFixed(1)}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted">{vibe.referenceCount} references</span>
          <span className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">View ?</span>
        </div>
      </Card>
    </Link>
  );
}

function QuickAction({ icon: Icon, label, description, href, gradient }) {
  return (
    <Link href={href}>
      <GlassCard className="group cursor-pointer h-full hover:scale-[1.02] transition-transform duration-300">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background: gradient }}>
          <Icon size={22} />
        </div>
        <h3 className="font-heading font-semibold text-foreground mb-1">{label}</h3>
        <p className="text-sm text-secondary">{description}</p>
      </GlassCard>
    </Link>
  );
}

export default function DashboardPage() {
  const [vibes, setVibes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadVibes = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await api.get("/api/vibes");
        const normalized = (response || []).map((vibe) => ({
          id: vibe.id,
          title: vibe.title,
          description: vibe.description || "",
          scores: vibe.scores || {
            professionalism: 0.5,
            warmth: 0.5,
            originality: 0.5,
            visualDensity: 0.5,
            interactionEnergy: 0.5,
            accessibilityBias: 0.5,
          },
          isPublic: Boolean(vibe.is_public),
          referenceCount: Number(vibe.reference_count || 0),
          createdAt: vibe.created_at,
        }));

        if (isMounted) setVibes(normalized);
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load vibes.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadVibes();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back</h1>
          <p className="text-secondary mt-1">Create, generate, and refine your aesthetic direction.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            icon={Sparkles}
            label="Create New Vibe"
            description="Upload references and define your aesthetic"
            href="/dashboard/create"
            gradient="linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))"
          />
          <QuickAction
            icon={Zap}
            label="Generate Design"
            description="AI-powered UI generation with your vibes"
            href="/dashboard/generate"
            gradient="linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))"
          />
          <QuickAction
            icon={Target}
            label="Practice & Critique"
            description="Get AI feedback on your design work"
            href="/dashboard/practice"
            gradient="linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))"
          />
          <QuickAction
            icon={BookOpen}
            label="Resources"
            description="Learn design fundamentals with curated content"
            href="/dashboard/resources"
            gradient="linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.05))"
          />
        </div>
      </FadeIn>

      <div>
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">Your Vibes</h2>
            <Link href="/dashboard/create">
              <Button variant="ghost" size="sm">+ New Vibe</Button>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading && (
            <Card hover={false} className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-secondary">Loading vibes...</p>
            </Card>
          )}

          {!isLoading && error && (
            <Card hover={false} className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-red-400">{error}</p>
            </Card>
          )}

          {!isLoading && !error && vibes.length === 0 && (
            <Card hover={false} className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-secondary mb-3">No vibes yet. Create your first one.</p>
              <Link href="/dashboard/create">
                <Button variant="primary" size="sm">Create Vibe</Button>
              </Link>
            </Card>
          )}

          {!isLoading && !error && vibes.map((vibe) => (
            <motion.div key={vibe.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <VibeCard vibe={vibe} />
            </motion.div>
          ))}
        </div>
      </div>

      <FadeIn delay={0.3}>
        <Card className="text-center py-12" hover={false}>
          <p className="text-3xl mb-4 flex justify-center"><Compass size={34} /></p>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Explore Community Vibes</h3>
          <p className="text-sm text-secondary mb-6 max-w-md mx-auto">
            Discover trending aesthetic identities from other designers. Fork, remix, and make them yours.
          </p>
          <Link href="/dashboard/explore">
            <Button variant="secondary">Browse Vibes</Button>
          </Link>
        </Card>
      </FadeIn>
    </div>
  );
}
