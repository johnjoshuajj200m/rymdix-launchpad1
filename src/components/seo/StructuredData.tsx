import { Helmet } from "react-helmet-async";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rymdix Technologies",
    description: "Custom software & AI automation for modern businesses",
    url: "https://rymdix.com",
    logo: "https://rymdix.com/logo.png",
    sameAs: [
      "https://linkedin.com/company/rymdix",
      "https://x.com/rymdix"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@rymdix.com",
        availableLanguage: "English",
        areaServed: "Worldwide"
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+2348100909043",
        email: "contact@rymdix.com",
        availableLanguage: "English",
        areaServed: "Worldwide"
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+2348100909043",
        url: "https://wa.me/2348100909043",
        availableLanguage: "English",
        areaServed: "Worldwide",
        contactOption: "WhatsApp"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rymdix Technologies",
    url: "https://rymdix.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rymdix.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "Rymdix Technologies"
    },
    url: `https://rymdix.com${url}`
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}

export function ArticleSchema({ headline, description, url, datePublished, dateModified }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `https://rymdix.com${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "Rymdix Technologies"
    },
    publisher: {
      "@type": "Organization",
      name: "Rymdix Technologies",
      logo: {
        "@type": "ImageObject",
        url: "https://rymdix.com/logo.png"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
