import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Wrench, Zap, ArrowRight, Check } from "lucide-react";

const packages = [
  {
    icon: Rocket,
    title: "Rapid MVP Sprint",
    description: "Get a working prototype in weeks, not months. Perfect for validating ideas, testing markets, or launching quickly.",
    features: [
      "Fast development cycle (2-6 weeks)",
      "Modern tech stack & clean UI",
      "Production-ready foundation",
      "Iterate based on feedback"
    ],
    cta: "Start Your MVP"
  },
  {
    icon: Wrench,
    title: "Internal Tools Build",
    description: "Custom dashboards, admin panels, and internal systems that streamline your team's daily operations.",
    features: [
      "Tailored to your workflow",
      "Integrates with existing tools",
      "Secure & scalable architecture",
      "Ongoing support available"
    ],
    cta: "Build Internal Tools"
  },
  {
    icon: Zap,
    title: "Automation Setup",
    description: "AI-powered workflows that handle repetitive tasks, from data processing to customer communications.",
    features: [
      "Reduce manual work by 70%+",
      "AI & API integrations",
      "Custom automation workflows",
      "Monitor & optimize performance"
    ],
    cta: "Automate Your Workflow"
  },
];

export function ServicePackages() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Service Packages</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three focused ways we help growing businesses scale efficiently.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.title}
              className="group animate-fade-up rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <pkg.icon className="h-7 w-7" />
              </div>
              
              <h3 className="mb-3 text-xl font-semibold">{pkg.title}</h3>
              <p className="mb-6 text-muted-foreground">{pkg.description}</p>
              
              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/contact" className="block">
                <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                  {pkg.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

