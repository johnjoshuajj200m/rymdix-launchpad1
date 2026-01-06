import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MessageCircle, Calendar, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/2348100909043";
const PRIMARY_EMAIL = "contact@rymdix.com";
const GENERAL_EMAIL = "hello@rymdix.com";
const SUPPORT_EMAIL = "support@rymdix.com";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    needs: "",
    budget: "",
    timeline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("leads")
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.needs,
        });

      if (insertError) throw insertError;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEOHead
          title="Message Sent | Rymdix Technologies"
          description="Thank you for contacting Rymdix Technologies. We'll be in touch soon."
          canonical="/contact"
        />
        
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="mb-4 text-3xl font-bold">Message Sent!</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                Thanks for reaching out. We've received your message and will review it shortly.
              </p>
              <div className="mb-8 rounded-xl border border-border bg-card/50 p-6 text-left">
                <h3 className="mb-4 text-lg font-semibold">What happens next?</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, text: "We review your request (usually within 24 hours)" },
                    { step: 2, text: "We book a short discovery call to understand your needs" },
                    { step: 3, text: "You receive a detailed plan and quote tailored to your project" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                        {item.step}
                      </div>
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
                <Button asChild variant="hero">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Contact | Rymdix Technologies"
        description="Talk to Rymdix about custom software, web apps, or automation. Book a call or send a message."
        canonical="/contact"
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Let's Talk
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to discuss your project? Book a call or send us a message. No pressure, just a conversation about what's possible.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Options */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-12">
              <h2 className="mb-6 text-2xl font-bold">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="needs">What do you need? *</Label>
                  <Textarea
                    id="needs"
                    name="needs"
                    value={formData.needs}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project or challenge..."
                  />
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range (optional)</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k-plus">$50,000+</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="1-3-months">1-3 months</SelectItem>
                        <SelectItem value="3-plus-months">3+ months</SelectItem>
                        <SelectItem value="exploring">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Other Options */}
            <div className="space-y-8">
              {/* What Happens Next */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="mb-6 text-xl font-semibold">What happens next?</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, text: "We review your request" },
                    { step: 2, text: "We book a short call" },
                    { step: 3, text: "You receive a plan + quote" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {item.step}
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Book a Call */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Book a Call</h3>
                <p className="mb-6 text-muted-foreground">
                  Schedule a free 30-minute discovery call to discuss your project and see if we're a good fit.
                </p>
                <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    📅 Calendly embed placeholder
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    (Connect Calendly to enable scheduling)
                  </p>
                </div>
              </div>
              
              {/* Email */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Email Us</h3>
                <p className="mb-4 text-muted-foreground">
                  Prefer email? Reach out directly and we'll respond within 1-2 business days.
                </p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${PRIMARY_EMAIL}`}
                    className="block font-medium text-primary hover:underline"
                  >
                    {PRIMARY_EMAIL}
                  </a>
                  <a
                    href={`mailto:${GENERAL_EMAIL}`}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {GENERAL_EMAIL}
                  </a>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">WhatsApp</h3>
                <p className="mb-2 text-muted-foreground">
                  Need a quick chat? Send us a message on WhatsApp.
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  +234 810 090 9043 · Usually replies within 1–6 hours
                </p>
                <Button variant="outline" asChild className="group">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
