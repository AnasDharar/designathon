"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Check, Target, Lightbulb, Dot } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion";
import { MOCK_VIBES, MOCK_CRITIQUES } from "@/lib/mockData";

export default function PracticePage() {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [critique, setCritique] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setCritique(MOCK_CRITIQUES[0]);
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-1">Practice & Critique</h1>
        <p className="text-secondary mb-8">Upload your design and get AI critique aligned to a target Vibe.</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Upload */}
          <Card hover={false}>
            <h3 className="text-sm font-medium text-foreground mb-4">Your Design</h3>
            <div
              onClick={() => setUploaded(true)}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                uploaded ? "border-success/30 bg-success/5" : "border-border hover:border-accent/50"
              }`}
            >
              <p className="text-3xl mb-2 flex justify-center">{uploaded ? <Check size={28} /> : <ImageIcon size={28} />}</p>
              <p className="text-sm text-secondary">{uploaded ? "Design uploaded" : "Click to upload your design"}</p>
            </div>
          </Card>

          {/* Vibe selector */}
          <Card hover={false}>
            <h3 className="text-sm font-medium text-foreground mb-4">Target Vibe</h3>
            <div className="space-y-2">
              {MOCK_VIBES.slice(0, 3).map((vibe) => (
                <button key={vibe.id} onClick={() => setSelectedVibe(vibe)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                    selectedVibe?.id === vibe.id ? "bg-accent/10 border border-accent/30 text-foreground" : "bg-surface-2 border border-transparent text-secondary hover:bg-surface-3"
                  }`}>
                  {vibe.title}
                </button>
              ))}
            </div>
          </Card>

          <Button variant="gradient" className="w-full" onClick={handleAnalyze} disabled={!uploaded || !selectedVibe || analyzing}>
            {analyzing ? "Analyzing..." : "Get Critique"}
          </Button>
        </div>

        <div className="lg:col-span-2">
          {!critique && !analyzing && (
            <Card hover={false} className="h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-4xl mb-4 flex justify-center"><Target size={36} /></p>
                <p className="text-secondary">Upload a design and select a target Vibe</p>
                <p className="text-xs text-muted mt-2">AI will critique alignment, hierarchy, typography, and more</p>
              </div>
            </Card>
          )}

          {analyzing && (
            <Card hover={false} className="h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-12 h-12 mx-auto mb-6 rounded-full border-2 border-accent border-t-transparent" />
                <p className="text-foreground font-medium">Analyzing your design...</p>
              </div>
            </Card>
          )}

          {critique && !analyzing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <Card hover={false}>
                <Badge variant="accent" className="mb-3">Overall Assessment</Badge>
                <p className="text-sm text-secondary leading-relaxed">{critique.summary}</p>
              </Card>

              {/* Scores */}
              <Card hover={false}>
                <h3 className="text-sm font-medium text-foreground mb-4">Critique Scores</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(critique.scores).map(([key, value]) => (
                    <div key={key} className="bg-surface-2 rounded-xl px-4 py-3">
                      <p className="text-xs text-muted capitalize mb-1">{key.replace(/([A-Z])/g, " $1")}</p>
                      <div className="flex items-center gap-2">
                        <div className="score-bar flex-1">
                          <div className="score-bar-fill" style={{ width: `${value * 100}%` }} />
                        </div>
                        <span className="text-xs font-mono text-accent">{value.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* What Works */}
              <Card hover={false}>
                <h3 className="text-sm font-medium text-success mb-3">✓ What Works</h3>
                <ul className="space-y-2">
                  {critique.feedback.whatWorks.map((item, i) => (
                    <li key={i} className="text-sm text-secondary flex gap-2"><span className="text-success"><Dot size={14} /></span>{item}</li>
                  ))}
                </ul>
              </Card>

              {/* What Drifted */}
              <Card hover={false}>
                <h3 className="text-sm font-medium text-warm mb-3">⚠ What Drifted</h3>
                <ul className="space-y-2">
                  {critique.feedback.whatDrifted.map((item, i) => (
                    <li key={i} className="text-sm text-secondary flex gap-2"><span className="text-warm"><Dot size={14} /></span>{item}</li>
                  ))}
                </ul>
              </Card>

              {/* Senior Advice */}
              <Card hover={false}>
                <h3 className="text-sm font-medium text-accent mb-3 flex items-center gap-2"><Lightbulb size={16} />Senior Designer Advice</h3>
                <ul className="space-y-2">
                  {critique.feedback.seniorAdvice.map((item, i) => (
                    <li key={i} className="text-sm text-secondary flex gap-2"><span className="text-accent"><Dot size={14} /></span>{item}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
