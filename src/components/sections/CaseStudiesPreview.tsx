import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: "client-a",
    title: "Client A",
    industry: "E-commerce",
    challenge: "Manual order processing taking 4+ hours daily",
    result: "Automated workflow reduced processing to 30 minutes",
    metrics: [
      { icon: Clock, label: "Time Saved", value: "85%" },
      { icon: TrendingUp, label: "Orders Processed", value: "3x" },
    ],
  },
  {
    id: "client-b",
    title: "Client B",
    industry: "Professional Services",
    challenge: "Sales team spending hours on follow-ups and data entry",
    result: "AI-powered CRM automation with smart follow-up sequences",
    metrics: [
      { icon: Clock, label: "Admin Time", value: "-70%" },
      { icon: TrendingUp, label: "Response Rate", value: "+45%" },
    ],
  },
];

export function CaseStudiesPreview() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Featured Work</h2>
            <p className="max-w-xl text-muted-foreground">
              Real results from real projects. See how we've helped businesses automate and scale.
            </p>
          </div>
          <Link to="/case-studies">
            <Button variant="outline">
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Link
              key={study.id}
              to={`/case-studies/${study.id}`}
              className="group animate-fade-up rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-xs font-medium uppercase tracking-wider text-primary">
                {study.industry}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{study.title}</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Challenge:</span> {study.challenge}
              </p>
              <p className="mb-6 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Result:</span> {study.result}
              </p>
              
              <div className="flex gap-6 border-t border-border pt-6">
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
              
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Read full case study
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          * These are sample case studies for demonstration purposes
        </p>
      </div>
    </section>
  );
}
