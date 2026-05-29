"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="orb orb-violet" style={{ width: 400, height: 400, top: "20%", left: "-10%" }} />
        <div className="orb orb-amber" style={{ width: 350, height: 350, bottom: "10%", right: "-5%" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="glass-strong rounded-3xl p-12 md:p-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
              Ready to Define
              <br />
              Your{" "}
              <span className="gradient-text">Aesthetic?</span>
            </h2>
            <p className="text-lg text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
              Join the next generation of taste-guided AI design.
              Preserve your judgment. Amplify your vision.
            </p>
            <Link href="/login">
              <Button variant="gradient" size="xl" className="min-w-[220px] text-lg">
                ✦ Start Creating — Free
              </Button>
            </Link>
            <p className="mt-6 text-xs text-muted">
              No credit card required. Create your first Vibe in minutes.
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
