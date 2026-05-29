"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Pencil, Image as ImageIcon, Brain, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion";
import { API_URL, VIBE_AXES } from "@/lib/constants";

const steps = [
  { id: 1, label: "Details", icon: Pencil },
  { id: 2, label: "References", icon: ImageIcon },
  { id: 3, label: "Analysis", icon: Brain },
  { id: 4, label: "Review", icon: Sparkles },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep >= step.id
                ? "bg-accent/15 text-accent border border-accent/30"
                : "bg-surface-2 text-muted border border-border"
            }`}
          >
            {currentStep > step.id ? "✓" : <step.icon size={16} />}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 h-px transition-colors duration-300 ${
                currentStep > step.id ? "bg-accent" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1Details({ data, setData }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground">Name Your Vibe</h2>
        <p className="text-sm text-secondary mt-2">Give it a title and description that captures the aesthetic.</p>
      </div>
      <Input
        label="Vibe Title"
        placeholder="e.g., Minimal Brutalist Editorial"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <Textarea
        label="Description"
        placeholder="Describe the aesthetic direction, mood, and intended feeling..."
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
    </motion.div>
  );
}

function Step2References({ files, onPickFiles, onDropFiles, error }) {
  const inputRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground">Add References</h2>
        <p className="text-sm text-secondary mt-2">
          Upload up to 3 images from your device. We will analyze these to generate your vibe.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => onPickFiles(Array.from(e.target.files || []))}
      />

      <div
        className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-accent/50 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onDropFiles(Array.from(e.dataTransfer.files || []));
        }}
      >
        <div className="text-4xl mb-4 flex justify-center"><ImageIcon size={36} /></div>
        <p className="text-sm text-secondary mb-2">Drop images here or click to upload</p>
        <p className="text-xs text-muted">PNG, JPG, WEBP. Maximum 3 images.</p>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Card hover={false}>
        <h3 className="text-sm font-medium text-foreground mb-3">Selected Images ({files.length}/3)</h3>
        {files.length === 0 ? (
          <p className="text-sm text-muted">No images selected yet.</p>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="text-sm text-secondary">
                {index + 1}. {file.name}
              </div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function Step3Analysis() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="text-center max-w-lg mx-auto py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-accent border-t-transparent"
      />
      <h2 className="text-2xl font-heading font-bold text-foreground mb-3">Analyzing Your References</h2>
      <p className="text-sm text-secondary mb-8">
        AI is identifying your aesthetic DNA and scoring across the six vibe axes...
      </p>
    </motion.div>
  );
}

function Step4Review({ data, result }) {
  const scores = result?.scores || {};
  const explanations = result?.score_explanations || {};

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <Badge variant="success" className="mb-4">Analysis Complete</Badge>
        <h2 className="text-2xl font-heading font-bold text-foreground">{data.title || "Your Vibe"}</h2>
        <p className="text-sm text-secondary mt-2">{data.description || "Review your generated scores below."}</p>
      </div>

      <Card hover={false} className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-6">Vibe Scores</h3>
        <div className="space-y-5">
          {VIBE_AXES.map((axis) => {
            const score = Number(scores[axis.key] ?? 0.5);
            return (
              <div key={axis.key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-secondary flex items-center gap-2">
                    <span>{axis.icon}</span>
                    {axis.label}
                  </span>
                  <span className="text-sm font-mono text-accent">{score.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={score}
                  readOnly
                  className="w-full h-1 rounded-full appearance-none bg-surface-2 accent-accent"
                />
                <p className="text-xs text-muted mt-2">{explanations[axis.key] || "No explanation available."}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card hover={false}>
        <h3 className="text-sm font-medium text-foreground mb-3">Aesthetic Summary</h3>
        <p className="text-sm text-secondary leading-relaxed">
          {result?.aesthetic_summary || "Summary is not available yet."}
        </p>
      </Card>
    </motion.div>
  );
}

export default function CreateVibePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({ title: "", description: "" });
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFiles = (incomingFiles) => {
    const imageFiles = incomingFiles.filter((file) => file.type.startsWith("image/"));
    const next = [...files, ...imageFiles].slice(0, 3);
    setFiles(next);
    if (incomingFiles.length > 3 || imageFiles.length !== incomingFiles.length || next.length < files.length + imageFiles.length) {
      setError("Only image files are allowed, with a maximum of 3 files.");
    } else {
      setError("");
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return data.title.trim().length > 0;
    if (currentStep === 2) return files.length > 0 && files.length <= 3;
    return true;
  };

  const submitForAnalysis = async () => {
    setError("");
    setIsSubmitting(true);
    setCurrentStep(3);

    try {
      const form = new FormData();
      form.append("title", data.title);
      form.append("description", data.description || "");
      files.forEach((file) => form.append("images", file));

      const response = await fetch(`${API_URL}/api/vibes/from-uploads`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.detail || `Request failed (${response.status})`);
      }

      const payload = await response.json();
      setResult(payload);
      setCurrentStep(4);
    } catch (err) {
      setError(err.message || "Failed to analyze references.");
      setCurrentStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Create a Vibe</h1>
          <p className="text-secondary mt-1">Define your aesthetic direction in 4 steps.</p>
        </div>
      </FadeIn>

      <StepIndicator currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 1 && <Step1Details key="s1" data={data} setData={setData} />}
        {currentStep === 2 && (
          <Step2References
            key="s2"
            files={files}
            onPickFiles={handleFiles}
            onDropFiles={handleFiles}
            error={error}
          />
        )}
        {currentStep === 3 && <Step3Analysis key="s3" />}
        {currentStep === 4 && <Step4Review key="s4" data={data} result={result} />}
      </AnimatePresence>

      {currentStep !== 3 && (
        <div className="flex justify-between mt-10 max-w-lg mx-auto">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1 || isSubmitting}
          >
            ← Back
          </Button>
          <Button
            variant={currentStep === 4 ? "gradient" : "primary"}
            onClick={() => {
              if (currentStep === 2) {
                submitForAnalysis();
                return;
              }
              if (currentStep === 4) {
                router.push("/dashboard");
                return;
              }
              setCurrentStep(Math.min(4, currentStep + 1));
            }}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting
              ? "Analyzing..."
              : currentStep === 2
              ? "Analyze Vibe →"
              : currentStep === 4
              ? "Back To Dashboard"
              : "Continue →"}
          </Button>
        </div>
      )}
    </div>
  );
}
