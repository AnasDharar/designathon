"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion";
import { api } from "@/lib/api";

export default function GeneratePage() {
  const [vibes, setVibes] = useState([]);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadVibes = async () => {
      try {
        const response = await api.get("/api/vibes");
        if (!isMounted) return;
        setVibes(response || []);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load vibes.");
      }
    };
    loadVibes();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGenerate = async () => {
    if (!selectedVibe || !prompt.trim()) return;
    setGenerating(true);
    setError("");
    setResult(null);
    try {
      const payload = await api.post("/api/vibes/generate-ui", {
        vibe_id: selectedVibe.id,
        prompt: prompt.trim(),
      });
      setResult({ promptText: payload.prompt_text });
    } catch (err) {
      setError(err.message || "Generation failed.");
    } finally {
      setGenerating(false);
    }
  };

  const copyPrompt = async () => {
    if (!result?.promptText) return;
    try {
      await navigator.clipboard.writeText(result.promptText);
    } catch {
      setError("Could not copy prompt. Please copy it manually.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-1">UI Prompt Generator</h1>
        <p className="text-secondary mb-8">Select a vibe, describe your screen, and generate a prompt for any image AI.</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card hover={false}>
            <h3 className="text-sm font-medium text-foreground mb-4">Select Vibe</h3>
            <div className="space-y-2">
              {vibes.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                    selectedVibe?.id === vibe.id
                      ? "bg-accent/10 border border-accent/30 text-foreground"
                      : "bg-surface-2 border border-transparent text-secondary hover:bg-surface-3"
                  }`}
                >
                  <span className="font-medium">{vibe.title}</span>
                </button>
              ))}
              {vibes.length === 0 && <p className="text-xs text-muted">No vibes available yet.</p>}
            </div>
          </Card>

          <Card hover={false}>
            <Textarea
              label="UI Prompt"
              placeholder="Design a fintech dashboard hero with KPI cards and chart grid..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              variant="gradient"
              className="w-full mt-4"
              onClick={handleGenerate}
              disabled={!selectedVibe || !prompt.trim() || generating}
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "✦ Generate UI Prompt"
              )}
            </Button>
            {error ? <p className="text-sm text-red-400 mt-3">{error}</p> : null}
          </Card>
        </div>

        <div className="lg:col-span-2">
          {!result && !generating && (
            <Card hover={false} className="h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-4xl mb-4 flex justify-center"><ImageIcon size={36} /></p>
                <p className="text-secondary">Select a vibe and enter a prompt to generate a reusable UI prompt</p>
              </div>
            </Card>
          )}
          {generating && (
            <Card hover={false} className="h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 mx-auto mb-6 rounded-full border-2 border-accent border-t-transparent"
                />
                <p className="text-foreground font-medium mb-2">Generating UI prompt...</p>
              </div>
            </Card>
          )}
          {result && !generating && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <Card hover={false}>
                <Badge variant="accent" className="mb-3">Generated Prompt</Badge>
                <div className="rounded-2xl border border-border bg-surface-2 p-4">
                  <pre className="text-sm text-secondary whitespace-pre-wrap leading-relaxed">{result.promptText}</pre>
                </div>
                <Button variant="secondary" className="mt-4" onClick={copyPrompt}>
                  Copy Prompt
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
