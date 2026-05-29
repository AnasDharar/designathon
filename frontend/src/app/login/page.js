"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleContinue = () => {
    login();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="orb orb-violet"
          style={{ width: 500, height: 500, top: "-15%", right: "-10%" }}
        />
        <div
          className="orb orb-amber"
          style={{ width: 400, height: 400, bottom: "-10%", left: "-10%" }}
        />
        <div
          className="orb orb-violet-sm"
          style={{ width: 250, height: 250, top: "50%", left: "30%" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 glass-strong rounded-3xl p-12 md:p-16 max-w-md w-full mx-6 text-center"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="xl" />
        </div>

        {/* Tagline */}
        <p className="text-secondary text-lg mb-2">
          AI-Powered Design Intelligence
        </p>
        <p className="text-muted text-sm mb-10">
          Create aesthetic identities. Generate with intention. Develop taste.
        </p>

        {/* Continue button */}
        <Button
          variant="gradient"
          size="xl"
          className="w-full text-lg"
          onClick={handleContinue}
        >
          ✦ Continue to Vibes
        </Button>

        <p className="mt-6 text-xs text-muted">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>

        {/* Decorative dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: `linear-gradient(135deg, #8b5cf6, #f59e0b)`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
