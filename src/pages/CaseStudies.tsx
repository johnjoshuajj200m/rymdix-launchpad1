import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import caseStudyDashboard from "@/assets/case-study-dashboard.jpg";
import caseStudyCrm from "@/assets/case-study-crm.jpg";

const caseStudies = [
  {
    id: "client-a",
    title: "Client A",
    subtitle: "Demo Project",
    industry: "E-commerce",
    summary: "Automated order processing workflow that reduced daily processing time from 4+ hours to 30 minutes.",
    challenge: "Manual order processing taking 4+ hours daily, with frequent errors and delayed fulfillment.",
    result: "Fully automated workflow with real-time sync between platforms, reducing errors by 90% and freeing up staff for customer service.",
    image: caseStudyDashboard,
    metrics: [
      { icon: Clock, label: "Time Saved", value: "85%" },
      { icon: TrendingUp, label: "Orders Processed", value: "3x" },
    ],
  },
  {
    id: "client-b",
    title: "Client B",
    subtitle: "Pilot Project",
    industry: "Professional Services",
    summary: "AI-powered CRM automation that eliminated hours of daily data entry and improved response rates by 45%.",
    challenge: "Sales team spending hours on follow-ups and data entry, with leads falling through the cracks.",
    result: "Smart CRM setup with automated follow-up sequences, lead scoring, and activity logging—all running in the background.",
    image: caseStudyCrm,
    metrics: [
      { icon: Clock, label: "Admin Time", value: "-70%" },
      { icon: TrendingUp, label: "Response Rate", value: "+45%" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <Layout>
      <SEOHead
        title="Case Studies | Rymdix Technologies"
        description="Real results from real projects. See how we've helped businesses automate workflows and scale operations."
        canonical="/case-studies"
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Case Studies
            </h1>
            <p className="text-lg text-muted-foreground">
              Real results from real projects. See how we've helped businesses automate, streamline, and scale their operations.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              * These are sample case studies for demonstration purposes
            </p>
          </div>
        </div>
      </section>
      
      {/* Case Studies Grid */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.id}`}
                className="group block animate-fade-up overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid gap-0 lg:grid-cols-5">
                  <div className="lg:col-span-2">
                    <img 
                      src={study.image} 
                      alt={`${study.title} dashboard mockup - ${study.subtitle}`}
                      className="aspect-video h-full w-full object-cover lg:aspect-auto"
                    />
                  </div>
                  <div className="p-8 lg:col-span-3 lg:p-12">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {study.industry}
                      </span>
                      <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                        {study.subtitle}
                      </span>
                    </div>
                    <h2 className="mb-4 text-2xl font-bold lg:text-3xl">{study.title}</h2>
                    <p className="mb-4 text-muted-foreground">{study.summary}</p>
                    
                    <div className="mb-4">
                      <span className="font-medium text-foreground">Challenge: </span>
                      <span className="text-muted-foreground">{study.challenge}</span>
                    </div>
                    
                    <div className="mb-6">
                      <span className="font-medium text-foreground">Result: </span>
                      <span className="text-muted-foreground">{study.result}</span>
                    </div>
                    
                    <div className="mb-6 flex gap-6">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <metric.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-foreground">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Read full case study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
}
