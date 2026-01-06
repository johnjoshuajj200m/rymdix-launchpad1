import { Search, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit",
    description: "We analyze your current workflows, identify bottlenecks, and map out exactly what needs to be built.",
  },
  {
    icon: Hammer,
    step: "02",
    title: "Build",
    description: "We design and develop your solution with regular check-ins, so you see progress every week.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Support",
    description: "We deploy, train your team, and provide ongoing support to ensure everything runs smoothly.",
  },
];

export function HowWeWork() {
  return (
    <section className="border-y border-border bg-card/30 py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How We Work</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A clear, proven process that gets you from problem to solution without the guesswork.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="animate-fade-up relative rounded-2xl border border-border bg-card p-8"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step number */}
              <div className="absolute -top-4 left-8 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {step.step}
              </div>
              
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
