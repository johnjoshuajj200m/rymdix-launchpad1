import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServicePackages } from "@/components/sections/ServicePackages";
import { RapidMVPSection } from "@/components/sections/RapidMVPSection";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { FounderNote } from "@/components/sections/FounderNote";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

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
      
      <HeroSection />
      <ProofSection />
      <ServicesGrid />
      <ServicePackages />
      <RapidMVPSection />
      <HowWeWork />
      <CaseStudiesPreview />
      <FounderNote />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
