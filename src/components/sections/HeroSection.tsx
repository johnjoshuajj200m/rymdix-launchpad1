import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background image - LCP element */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-label="Hero background showing modern software development workspace"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Glow orbs */}
      <div className="glow-orb -top-40 -left-40 animate-glow-pulse" />
      <div className="glow-orb -bottom-40 -right-40 animate-glow-pulse delay-500" />
      
      {/* Content */}
      <div className="container relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
        {/* Badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Custom Software & AI Automation</span>
        </div>
        
        {/* Headline */}
        <h1 className="animate-fade-up delay-100 mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Custom Software, Web Apps & AI Automation for Growing Businesses
        </h1>
        
        {/* Subheadline */}
        <p className="animate-fade-up delay-200 mb-4 max-w-2xl text-lg font-medium text-foreground sm:text-xl">
          We build systems that reduce manual work and help you scale efficiently—without the operational chaos.
        </p>
        <p className="animate-fade-up delay-200 mb-10 max-w-2xl text-base text-muted-foreground">
          From rapid MVPs to enterprise automation, we deliver solutions that fit your workflow and grow with your business.
        </p>
        
        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col gap-4 sm:flex-row">
          <Link to="/contact">
            <Button variant="hero" size="lg" className="group">
              Book a Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="heroOutline" size="lg">
              See Services
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
