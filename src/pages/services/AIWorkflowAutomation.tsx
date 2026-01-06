import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bot, Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export default function AIWorkflowAutomation() {
  return (
    <Layout>
      <SEOHead
        title="AI Workflow Automation | Rymdix Technologies"
        description="Intelligent automation that handles repetitive tasks, processes data, and makes smart decisions. Free your team to focus on high-value work."
        canonical="/services/ai-workflow-automation"
      />
      <ServiceSchema
        name="AI Workflow Automation"
        description="Intelligent automation that handles repetitive tasks, processes data, and makes smart decisions."
        url="/services/ai-workflow-automation"
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
                <Bot className="h-8 w-8" />
              </div>
              <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
                AI Workflow Automation
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Stop burning hours on repetitive tasks. We build AI-powered automation that handles data processing, smart routing, and complex workflows—so your team can focus on work that matters.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Explore Automation
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
      
      {/* What We Automate */}
      <section className="py-24">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold">What We Automate</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Document Processing",
                description: "Extract data from invoices, contracts, forms, and emails automatically with AI-powered parsing.",
              },
              {
                title: "Smart Email Automation",
                description: "AI that reads, categorizes, and responds to emails—or routes them to the right person.",
              },
              {
                title: "Data Enrichment",
                description: "Automatically enrich CRM records, leads, and contacts with relevant information.",
              },
              {
                title: "Workflow Orchestration",
                description: "Multi-step processes that run automatically based on triggers and conditions.",
              },
              {
                title: "Content Generation",
                description: "AI-assisted content creation for reports, summaries, and communications.",
              },
              {
                title: "Predictive Analytics",
                description: "Insights and predictions based on your historical data patterns.",
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
      
      {/* Why AI Automation */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Why AI Automation?</h2>
            
            <div className="space-y-4">
              {[
                "Handle tasks that are too complex for simple rule-based automation",
                "Scale operations without proportionally increasing headcount",
                "Reduce human error in data processing and entry",
                "Free your team for creative and strategic work",
                "Get insights from data patterns humans might miss",
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
              { title: "Sales Operations Systems", href: "/services/sales-operations-systems" },
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
