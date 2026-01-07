import { lazy, Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

// Lazy-load sections below the fold for code splitting
const ServicePackages = lazy(() => import("@/components/sections/ServicePackages").then(m => ({ default: m.ServicePackages })));
const RapidMVPSection = lazy(() => import("@/components/sections/RapidMVPSection").then(m => ({ default: m.RapidMVPSection })));
const HowWeWork = lazy(() => import("@/components/sections/HowWeWork").then(m => ({ default: m.HowWeWork })));
const CaseStudiesPreview = lazy(() => import("@/components/sections/CaseStudiesPreview").then(m => ({ default: m.CaseStudiesPreview })));
const FounderNote = lazy(() => import("@/components/sections/FounderNote").then(m => ({ default: m.FounderNote })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));

// Minimal loading placeholder for below-fold sections
const SectionPlaceholder = () => null;

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Custom Software, Web Apps & AI Automation for Growing Businesses"
        description="We build custom software, web apps, and AI-powered automation systems that reduce manual work and help businesses scale efficiently."
        canonical="/"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      
      {/* Above-fold: eager load */}
      <HeroSection />
      <ProofSection />
      <ServicesGrid />
      
      {/* Below-fold: lazy load with Suspense */}
      <Suspense fallback={<SectionPlaceholder />}>
        <ServicePackages />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <RapidMVPSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <HowWeWork />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <CaseStudiesPreview />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <FounderNote />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <CTASection />
      </Suspense>
    </Layout>
  );
};

export default Index;
