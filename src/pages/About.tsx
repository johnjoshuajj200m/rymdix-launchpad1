import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Zap } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import aboutVisual from "@/assets/about-visual.jpg";

const values = [
  {
    icon: Target,
    title: "Practical over perfect",
    description: "We build solutions that work in the real world, not theoretical systems that look good on paper but fail in practice.",
  },
  {
    icon: Zap,
    title: "Speed with quality",
    description: "We move fast without cutting corners. You get working software quickly, built to last.",
  },
  {
    icon: Users,
    title: "Partnership mindset",
    description: "We're not just vendors—we're invested in your success. Your wins are our wins.",
  },
];

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About | Rymdix Technologies"
        description="Learn about Rymdix Technologies and our approach to building practical software systems that scale."
        canonical="/about"
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              We Build Systems That <span className="text-gradient-accent">Actually Work</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Rymdix Technologies is a software development and automation company focused on one thing: building practical solutions that help businesses scale without the operational chaos.
            </p>
          </div>
        </div>
      </section>
      
      {/* Story */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We started Rymdix because we kept seeing the same problem: businesses spending hours on tasks that should take minutes. Founders and operators trapped in spreadsheet hell, copy-pasting data between tools, and manually doing work that machines should handle.
                </p>
                <p>
                  Most "solutions" either didn't fit the workflow or required a PhD to set up. We knew there had to be a better way—custom software and automation that actually matches how real businesses operate.
                </p>
                <p>
                  Today, we help companies of all sizes build systems that save time, reduce errors, and scale cleanly. Whether it's a simple automation or a full custom platform, we focus on practical solutions that deliver real results.
                </p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50">
              <img 
                src={aboutVisual} 
                alt="Rymdix Technologies - interconnected systems visualization"
                className="aspect-square w-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">What We Believe</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Working With Us */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Working With Us</h2>
            <p className="mb-8 text-muted-foreground">
              We work best with founders and operators who know their business inside out but need help building the systems to scale it. If you're tired of manual workarounds and ready for something that actually fits your workflow, let's talk.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
}
