import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-dark py-24">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Glow orb */}
      <div className="glow-orb left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to streamline your operations?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Let's discuss how custom software or automation can save your team hours every week. No pressure, just a conversation about what's possible.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Book a Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="mailto:contact@rymdix.com">
              <Button variant="heroOutline" size="lg">
                <Mail className="h-4 w-4" />
                contact@rymdix.com
              </Button>
            </a>
          </div>
          
          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>Secure & confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>No commitment required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
