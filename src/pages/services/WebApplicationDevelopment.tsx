import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Globe, Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export default function WebApplicationDevelopment() {
  return (
    <Layout>
      <SEOHead
        title="Web Application Development | Rymdix Technologies"
        description="Modern, responsive web applications built for performance, accessibility, and scalability. Customer portals, SaaS platforms, and more."
        canonical="/services/web-application-development"
      />
      <ServiceSchema
        name="Web Application Development"
        description="Modern, responsive web applications built for performance, accessibility, and scalability."
        url="/services/web-application-development"
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
                <Globe className="h-8 w-8" />
              </div>
              <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
                Web Application Development
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                From customer portals to full SaaS platforms, we build web applications that are fast, accessible, and designed to scale with your business.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Start Your Project
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
                title: "Customer Portals",
                description: "Self-service portals where customers can manage accounts, track orders, and access resources.",
              },
              {
                title: "SaaS Applications",
                description: "Full-featured software-as-a-service platforms with user management, billing, and analytics.",
              },
              {
                title: "Progressive Web Apps",
                description: "Web apps that work offline and feel like native mobile apps—no app store required.",
              },
              {
                title: "E-commerce Platforms",
                description: "Custom shopping experiences with inventory management, payments, and order fulfillment.",
              },
              {
                title: "Admin Dashboards",
                description: "Powerful backends to manage your application, users, content, and operations.",
              },
              {
                title: "Real-time Applications",
                description: "Live collaboration tools, chat systems, and real-time data visualization.",
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
      
      {/* Our Approach */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Our Approach</h2>
            
            <div className="space-y-4">
              {[
                "Mobile-first design that works on every screen size",
                "Performance optimized for fast load times",
                "Accessible to users with disabilities (WCAG compliant)",
                "SEO-friendly architecture from the ground up",
                "Secure by default with modern authentication",
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
