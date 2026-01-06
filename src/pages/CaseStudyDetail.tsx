import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, TrendingUp, Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

const caseStudiesData: Record<string, {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { icon: typeof Clock; label: string; value: string }[];
  technologies: string[];
}> = {
  "client-a": {
    title: "Client A",
    industry: "E-commerce",
    challenge: "This e-commerce business was processing hundreds of orders daily across multiple sales channels. Their team spent 4+ hours each day manually copying order data between platforms, updating inventory, and triggering fulfillment. Errors were common, and delays frustrated customers.",
    solution: "We built a fully automated order processing system that connected their sales channels, inventory management, and fulfillment partners. Orders now flow automatically from sale to shipment, with real-time inventory updates across all channels.",
    results: [
      "Order processing time reduced from 4+ hours to under 30 minutes daily",
      "Error rate dropped by 90%",
      "Team freed up to focus on customer service and growth initiatives",
      "Real-time inventory sync eliminated overselling",
      "Faster fulfillment improved customer satisfaction scores",
    ],
    metrics: [
      { icon: Clock, label: "Time Saved", value: "85%" },
      { icon: TrendingUp, label: "Orders Processed", value: "3x" },
    ],
    technologies: ["Custom Integration Platform", "REST APIs", "Webhook Automation", "Real-time Sync"],
  },
  "client-b": {
    title: "Client B",
    industry: "Professional Services",
    challenge: "A growing professional services firm was struggling with sales operations. Reps spent hours on manual data entry, follow-up reminders were forgotten, and there was no visibility into pipeline health. Leads were falling through the cracks.",
    solution: "We implemented a comprehensive sales operations system with automated lead capture, smart follow-up sequences, and real-time analytics dashboards. AI-powered scoring prioritizes the best opportunities automatically.",
    results: [
      "70% reduction in administrative time for sales reps",
      "45% improvement in lead response rates",
      "Zero leads falling through cracks with automated follow-ups",
      "Real-time visibility into pipeline for leadership",
      "Faster onboarding for new sales team members",
    ],
    metrics: [
      { icon: Clock, label: "Admin Time", value: "-70%" },
      { icon: TrendingUp, label: "Response Rate", value: "+45%" },
    ],
    technologies: ["CRM Automation", "AI Lead Scoring", "Analytics Dashboard", "Multi-tool Integration"],
  },
};

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const study = id ? caseStudiesData[id] : null;

  if (!study) {
    return (
      <Layout>
        <SEOHead title="Case Study Not Found | Rymdix Technologies" description="The requested case study could not be found." />
        <section className="py-24">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold">Case Study Not Found</h1>
            <Link to="/case-studies">
              <Button>View All Case Studies</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${study.title} Case Study | Rymdix Technologies`}
        description={`See how we helped ${study.title} in ${study.industry} improve their operations with custom software and automation.`}
        canonical={`/case-studies/${id}`}
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <Link to="/case-studies" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            All Case Studies
          </Link>
          
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 text-xs font-medium uppercase tracking-wider text-primary">
                {study.industry}
              </div>
              <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
                {study.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                * This is a sample case study for demonstration purposes
              </p>
            </div>
            
            <div className="flex flex-col justify-center gap-6 rounded-xl border border-border bg-card p-8">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <metric.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Challenge */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">The Challenge</h2>
            <p className="text-muted-foreground">{study.challenge}</p>
          </div>
        </div>
      </section>
      
      {/* Solution */}
      <section className="border-y border-border bg-card/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">The Solution</h2>
            <p className="mb-8 text-muted-foreground">{study.solution}</p>
            
            <div className="flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">The Results</h2>
            
            <div className="space-y-4">
              {study.results.map((result) => (
                <div key={result} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Want Similar Results?</h2>
            <p className="mb-8 text-muted-foreground">
              Let's discuss how we can help streamline your operations and save your team hours every week.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Book a Call
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
