"use client";

import { ExternalLink, BookOpen, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion";

const RESOURCE_SECTIONS = [
  {
    title: "Starter Articles",
    icon: BookOpen,
    items: [
      {
        title: "Laws of UX",
        description: "Foundational UX principles explained with practical examples.",
        url: "https://lawsofux.com/",
      },
      {
        title: "Refactoring UI",
        description: "Actionable design advice for visual polish and hierarchy.",
        url: "https://www.refactoringui.com/book",
      },
      {
        title: "Nielsen Norman Group: UX Basics",
        description: "Research-backed guidance on usability and interaction design.",
        url: "https://www.nngroup.com/articles/",
      },
      {
        title: "Material Design Guidelines",
        description: "Great reference for layout, spacing, components, and accessibility.",
        url: "https://m3.material.io/",
      },
    ],
  },
  {
    title: "YouTube Learning",
    icon: PlayCircle,
    items: [
      {
        title: "DesignCourse",
        description: "UI/UX tutorials, critique walkthroughs, and practical design workflow.",
        url: "https://www.youtube.com/@DesignCourse",
      },
      {
        title: "Flux Academy",
        description: "Visual design and freelancing advice for beginner designers.",
        url: "https://www.youtube.com/@FluxAcademy",
      },
      {
        title: "Mizko",
        description: "Figma workflows, portfolio tips, and design career guidance.",
        url: "https://www.youtube.com/@Mizko",
      },
      {
        title: "Figma Channel",
        description: "Official product education and best practices from Figma.",
        url: "https://www.youtube.com/@Figma",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <FadeIn>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Resources</h1>
          <p className="text-secondary mt-1">
            Beginner-friendly design learning path: articles, videos, and references.
          </p>
        </div>
      </FadeIn>

      {RESOURCE_SECTIONS.map((section, sectionIndex) => (
        <FadeIn key={section.title} delay={0.08 * (sectionIndex + 1)}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <section.icon size={18} />
              <h2 className="text-xl font-heading font-semibold text-foreground">{section.title}</h2>
              <Badge variant="accent">{section.items.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Card className="h-full cursor-pointer group" hover>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-secondary mt-2 leading-relaxed">{item.description}</p>
                      </div>
                      <ExternalLink size={16} className="text-muted mt-1 shrink-0" />
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

