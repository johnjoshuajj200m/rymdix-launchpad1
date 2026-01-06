import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Globe, Bot, LineChart } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import serviceCustomSoftware from "@/assets/services/custom-software.jpg";
import serviceWebApp from "@/assets/services/web-apps.jpg";
import serviceAiAutomation from "@/assets/services/ai-automation.jpg";
import serviceSalesOps from "@/assets/services/sales-ops.jpg";

const services = [
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored solutions built from scratch to match your exact business processes. From internal tools to customer-facing applications, we build software that fits like a glove.",
    features: [
      "Business process automation",
      "Internal tools & dashboards",
      "Data management systems",
      "API development & integrations",
    ],
    href: "/services/custom-software-development",
    image: serviceCustomSoftware,
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Modern, responsive web applications that work seamlessly across all devices. Built for performance, accessibility, and scalability from day one.",
    features: [
      "Progressive web apps (PWA)",
      "Customer portals & dashboards",
      "E-commerce platforms",
      "SaaS applications",
    ],
    href: "/services/web-application-development",
    image: serviceWebApp,
  },
  {
    icon: Bot,
    title: "AI Workflow Automation",
    description: "Intelligent automation that handles repetitive tasks, processes data, and makes smart decisions. Free your team to focus on high-value work.",
    features: [
      "Document processing & extraction",
      "Smart email & chat automation",
      "Data enrichment & classification",
      "Predictive analytics",
    ],
    href: "/services/ai-workflow-automation",
    image: serviceAiAutomation,
  },
  {
    icon: LineChart,
    title: "Sales Operations Systems",
    description: "Streamlined sales processes with automated follow-ups, CRM integrations, and real-time reporting. Close more deals with less manual work.",
    features: [
      "CRM setup & optimization",
      "Automated follow-up sequences",
      "Lead scoring & routing",
      "Sales analytics dashboards",
    ],
    href: "/services/sales-operations-systems",
    image: serviceSalesOps,
  },
];

export default function Services() {
  return (
    <Layout>
      <SEOHead
        title="Services | Rymdix Technologies"
        description="Explore custom software development, web apps, and AI workflow automation built for real business operations."
        canonical="/services"
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Solutions That <span className="text-gradient-accent">Actually Work</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We don't just build software—we build systems that solve real business problems. Here's how we can help you automate, scale, and grow.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services List */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{service.title}</h2>
                  <p className="mb-6 text-muted-foreground">{service.description}</p>
                  <ul className="mb-8 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.href}>
                    <Button className="group">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                
                <div className={`rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <img 
                      src={service.image} 
                      alt={`${service.title} - ${service.description.substring(0, 60)}...`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image for ${service.title}:`, service.image);
                      }}
                      onLoad={() => {
                        console.log(`Image loaded successfully for ${service.title}:`, service.image);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
}
