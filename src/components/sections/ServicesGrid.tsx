import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code, Globe, Bot, LineChart, ArrowRight } from "lucide-react";
import serviceCustomSoftware from "@/assets/services/custom-software.jpg";
import serviceWebApp from "@/assets/services/web-apps.jpg";
import serviceAiAutomation from "@/assets/services/ai-automation.jpg";
import serviceSalesOps from "@/assets/services/sales-ops.jpg";
import { supabase, Service } from "@/lib/supabase";
import { getIcon } from "@/utils/iconMapper";

// Fallback services if Supabase is unavailable
const fallbackServices = [
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored solutions built from scratch to match your exact business processes and needs.",
    href: "/services/custom-software-development",
    image: serviceCustomSoftware,
    alt: "Custom software development workspace showing code, architecture diagrams, and development tools for building tailored business solutions",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Modern, responsive web apps that work seamlessly across all devices and scale with your growth.",
    href: "/services/web-application-development",
    image: serviceWebApp,
    alt: "Modern web application interface displayed on multiple devices showing responsive design and cross-platform compatibility",
  },
  {
    icon: Bot,
    title: "AI Workflow Automation",
    description: "Intelligent automation that handles repetitive tasks, freeing your team to focus on what matters.",
    href: "/services/ai-workflow-automation",
    image: serviceAiAutomation,
    alt: "AI automation workflow visualization showing intelligent systems processing data, automating tasks, and optimizing business processes",
  },
  {
    icon: LineChart,
    title: "Sales Operations Systems",
    description: "Streamlined sales processes with automated follow-ups, CRM integrations, and reporting dashboards.",
    href: "/services/sales-operations-systems",
    image: serviceSalesOps,
    alt: "Sales operations dashboard displaying CRM data, pipeline analytics, automated workflows, and sales performance metrics",
  },
];

export function ServicesGrid() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      if (!supabase) {
        setServices(fallbackServices);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedServices = data.map((service: Service) => {
          const Icon = getIcon(service.icon_name);
          const imageUrl = service.image_url || 
            (service.slug.includes("custom-software") ? serviceCustomSoftware :
             service.slug.includes("web-application") ? serviceWebApp :
             service.slug.includes("ai-workflow") ? serviceAiAutomation :
             service.slug.includes("sales-operations") ? serviceSalesOps :
             serviceCustomSoftware);

          return {
            icon: Icon,
            title: service.title,
            description: service.summary,
            href: `/services/${service.slug}`,
            image: imageUrl,
            alt: `${service.title} - ${service.summary}`,
          };
        });
        setServices(mappedServices);
      } else {
        // Use fallback if no services in database
        setServices(fallbackServices);
      }
    } catch (error) {
      console.error("Error loading services:", error);
      // Use fallback on error
      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <div className="text-center text-muted-foreground">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Solutions That Actually Work</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From custom software to intelligent automation, we build systems that solve real business problems.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image container with consistent aspect ratio */}
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <img 
                  src={service.image} 
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={800}
                  height={450}
                  onError={(e) => {
                    console.error(`Failed to load image for ${service.title}:`, service.image);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log(`Image loaded successfully for ${service.title}:`, service.image);
                  }}
                />
                {/* Gradient overlay - positioned above image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <service.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
