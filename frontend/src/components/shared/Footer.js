import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm text-muted max-w-sm leading-relaxed">
              AI-powered design intelligence platform. Create reusable aesthetic identities,
              generate with intention, and develop taste through critique.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-muted hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-sm text-muted hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#showcase" className="text-sm text-muted hover:text-foreground transition-colors">Showcase</a></li>
              <li><Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Vibes. Taste is the last human advantage.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
