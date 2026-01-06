import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code, Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export default function CustomSoftwareDevelopment() {
  return (
    <Layout>
      <SEOHead
        title="Custom Software Development | Rymdix Technologies"
        description="Tailored software solutions built from scratch to match your exact business processes. From internal tools to customer-facing applications."
        canonical="/services/custom-software-development"
      />
      <ServiceSchema
        name="Custom Software Development"
        description="Tailored software solutions built from scratch to match your exact business processes."
        url="/services/custom-software-development"
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
                <Code className="h-8 w-8" />
              </div>
              <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
                Custom Software Development
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Off-the-shelf tools rarely fit perfectly. We build custom software that matches your exact business processes, integrates with your existing tools, and grows with your company.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Discuss Your Project
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
                title: "Internal Tools & Dashboards",
                description: "Custom admin panels, reporting dashboards, and internal tools that streamline your team's daily work.",
              },
              {
                title: "Business Process Automation",
                description: "Software that automates repetitive workflows, from data entry to complex multi-step processes.",
              },
              {
                title: "Data Management Systems",
                description: "Centralized systems to collect, organize, and analyze your business data effectively.",
              },
              {
                title: "API Development",
                description: "Custom APIs to connect your systems, enable integrations, and share data securely.",
              },
              {
                title: "Legacy System Modernization",
                description: "Transform outdated systems into modern, maintainable software without disrupting operations.",
              },
              {
                title: "MVP Development",
                description: "Rapid prototyping and MVP development to validate your ideas before full investment.",
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
      
      {/* Why Custom */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Why Custom Software?</h2>
            
            <div className="space-y-4">
              {[
                "Built exactly for your workflow—no workarounds needed",
                "Integrates seamlessly with your existing tools and data",
                "Scales with your business as you grow",
                "You own the code—no vendor lock-in",
                "Competitive advantage through unique capabilities",
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
              { title: "Web Application Development", href: "/services/web-application-development" },
              { title: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
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
