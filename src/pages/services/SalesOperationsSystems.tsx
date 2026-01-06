import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LineChart, Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export default function SalesOperationsSystems() {
  return (
    <Layout>
      <SEOHead
        title="Sales Operations Systems | Rymdix Technologies"
        description="Streamlined sales processes with automated follow-ups, CRM integrations, and real-time reporting dashboards."
        canonical="/services/sales-operations-systems"
      />
      <ServiceSchema
        name="Sales Operations Systems"
        description="Streamlined sales processes with automated follow-ups, CRM integrations, and real-time reporting."
        url="/services/sales-operations-systems"
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>
          
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LineChart className="h-8 w-8" />
              </div>
              <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
                Sales Operations Systems
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Your sales team should be selling, not drowning in data entry. We build sales operations systems that automate follow-ups, sync data, and give you real-time visibility into your pipeline.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Optimize Your Sales
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8">
              <div className="aspect-video rounded-xl bg-secondary/50" />
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Build */}
      <section className="py-24">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold">What We Build</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "CRM Setup & Optimization",
                description: "Configure your CRM for how you actually sell—custom fields, pipelines, and automation rules.",
              },
              {
                title: "Automated Follow-ups",
                description: "Smart sequences that keep leads warm without your team lifting a finger.",
              },
              {
                title: "Lead Scoring & Routing",
                description: "Automatically prioritize and assign leads based on fit and engagement.",
              },
              {
                title: "Sales Analytics Dashboards",
                description: "Real-time visibility into pipeline, activities, and team performance.",
              },
              {
                title: "Quote & Proposal Automation",
                description: "Generate professional quotes and proposals with a few clicks.",
              },
              {
                title: "Multi-tool Integration",
                description: "Connect your CRM with email, calendar, dialers, and other sales tools.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">What You Get</h2>
            
            <div className="space-y-4">
              {[
                "Less time on admin, more time selling",
                "No leads falling through the cracks",
                "Consistent follow-up without manual effort",
                "Clear visibility into what's working",
                "Faster onboarding for new sales reps",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="py-24">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold">Related Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Custom Software Development", href: "/services/custom-software-development" },
              { title: "Web Application Development", href: "/services/web-application-development" },
              { title: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
            ].map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <span className="font-medium">{service.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
}
