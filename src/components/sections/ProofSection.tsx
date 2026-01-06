import { Clock, Zap, Target, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "80%",
    label: "Time Saved",
    description: "On repetitive tasks",
  },
  {
    icon: Zap,
    value: "3x",
    label: "Faster Response",
    description: "Average improvement",
  },
  {
    icon: Target,
    value: "90%",
    label: "Fewer Errors",
    description: "In automated workflows",
  },
  {
    icon: TrendingUp,
    value: "2-4 weeks",
    label: "Time to Launch",
    description: "For most projects",
  },
];

export function ProofSection() {
  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="container">
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Results our clients typically see
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="animate-fade-up text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="mb-1 text-3xl font-bold text-foreground">{metric.value}</div>
              <div className="mb-1 text-sm font-medium text-foreground">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
