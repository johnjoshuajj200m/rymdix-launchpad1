import { Quote } from "lucide-react";

export function FounderNote() {
  return (
    <section className="border-y border-border bg-card/30 py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Quote className="h-8 w-8" />
          </div>
          
          <blockquote className="mb-8 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            "We started Rymdix because we saw too many businesses drowning in manual processes that should have been automated years ago. Our mission is simple: build systems that actually work, so founders can focus on growing their business instead of fighting their tools."
          </blockquote>
          
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/50" />
            <div>
              <div className="font-semibold text-foreground">Founder, Rymdix Technologies</div>
              <div className="text-sm text-muted-foreground">Building practical systems since 2020</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
