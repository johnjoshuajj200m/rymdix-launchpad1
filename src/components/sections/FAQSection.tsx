import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most projects take 2-8 weeks depending on scope. Simple automations can be done in a week, while full custom software might take 6-8 weeks. We'll give you a clear timeline after our initial audit call.",
  },
  {
    question: "What's your pricing like?",
    answer: "We work on project-based pricing, not hourly rates. This means you know the full cost upfront. Projects typically range from $5,000 for simple automations to $50,000+ for complex custom software. We'll provide a detailed quote after understanding your needs.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes. All projects include 30 days of support after launch. For long-term maintenance and updates, we offer monthly retainer packages tailored to your needs.",
  },
  {
    question: "What technologies do you use?",
    answer: "We're technology-agnostic and choose the best tools for each project. Common choices include React, Node.js, Python, and various AI/ML frameworks. For automation, we integrate with popular tools like Zapier, Make, and custom API solutions.",
  },
  {
    question: "Can you work with our existing systems?",
    answer: "Absolutely. Most of our work involves integrating with existing tools and databases. We'll audit your current tech stack and build solutions that work seamlessly with what you already have.",
  },
  {
    question: "What if we need changes after launch?",
    answer: "We build with flexibility in mind. Changes and iterations are normal. Your 30-day support period covers minor adjustments, and our retainer packages handle ongoing changes and feature additions.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Quick answers to common questions about working with us.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="py-6 text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
