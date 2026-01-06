import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/2348100909043";
const PRIMARY_EMAIL = "contact@rymdix.com";
const GENERAL_EMAIL = "hello@rymdix.com";
const SUPPORT_EMAIL = "support@rymdix.com";

const footerLinks = {
  services: [
    { href: "/services/custom-software-development", label: "Custom Software" },
    { href: "/services/web-application-development", label: "Web Applications" },
    { href: "/services/ai-workflow-automation", label: "AI Automation" },
    { href: "/services/sales-operations-systems", label: "Sales Operations" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-sm font-bold text-white">R</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Rymdix Technologies</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Custom software & AI automation for modern businesses. We build systems that reduce manual work and help you scale cleanly.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${PRIMARY_EMAIL}`} className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" />
                {PRIMARY_EMAIL}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
                <MessageCircle className="h-4 w-4" />
                +234 810 090 9043
              </a>
            </div>
            <div className="mt-6 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Rymdix Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
