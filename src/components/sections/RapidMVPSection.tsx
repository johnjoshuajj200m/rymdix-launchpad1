import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Smartphone, Layers, ArrowRight } from "lucide-react";

const features = [
  { icon: Zap, text: "Fast MVP builds" },
  { icon: Smartphone, text: "Clean UI + responsive" },
  { icon: Layers, text: "Production-ready foundations" },
];

export function RapidMVPSection() {
  return (
    <section className="border-y border-border bg-card/30 py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Rapid MVP Delivery
          </h2>
          <p className="mb-2 text-xl font-medium text-gradient-accent">
            Ship fast, build right.
          </p>
          <p className="mb-10 text-muted-foreground">
            We build landing pages, dashboards, internal tools, and MVP web apps quickly, using modern stacks and clean UI.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-6">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-3 rounded-full border border-border bg-secondary/30 px-5 py-3"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <Link to="/contact">
            <Button variant="hero" size="lg" className="group">
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
