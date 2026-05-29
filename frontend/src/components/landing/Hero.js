"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function FloatingScore({ label, value, Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1 + delay, duration: 0.6, ease: "easeOut" }}
      className="glass rounded-xl px-4 py-3 flex items-center gap-3 min-w-[140px]"
    >
      <span className="text-lg"><Icon size={18} /></span>
      <div className="flex-1">
        <p className="text-xs text-muted font-medium">{label}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="score-bar flex-1">
            <motion.div
              className="score-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${value * 100}%` }}
              transition={{ delay: 1.5 + delay, duration: 1, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-mono text-secondary">{value.toFixed(1)}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="accent" className="mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse mr-1" />
            AI-Powered Design Intelligence
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[0.95]"
        >
          Where AI
          <br />
          Meets <span className="gradient-text">Taste</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Create reusable aesthetic identities called <em className="text-foreground not-italic font-medium">Vibes</em>.
          Generate UI with intention. Develop design judgment through AI critique.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/login">
            <Button variant="gradient" size="xl" className="min-w-[200px]">Start Creating</Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="secondary" size="xl" className="min-w-[200px]">Learn More</Button>
          </a>
        </motion.div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <FloatingScore label="Warmth" value={0.8} Icon={Flame} delay={0} />
          <FloatingScore label="Originality" value={0.9} Icon={Sparkles} delay={0.15} />
          <FloatingScore label="Energy" value={0.6} Icon={Zap} delay={0.3} />
        </div>
      </div>
    </section>
  );
}
