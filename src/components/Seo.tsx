import { NextSeo, FAQPageJsonLd, BreadcrumbJsonLd } from 'next-seo';

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  faq?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; item: string }>;
}

export default function Seo({ title, description, canonical, faq, breadcrumbs }: SeoProps) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          siteName: 'Leben in Deutschland Test',
        }}
      />
      {faq && (
        <FAQPageJsonLd
          mainEntity={faq.map(item => ({
            questionName: item.q,
            acceptedAnswerText: item.a,
          }))}
        />
      )}
      {breadcrumbs && (
        <BreadcrumbJsonLd
          itemListElements={breadcrumbs.map((item, index) => ({
            position: index + 1,
            name: item.name,
            item: item.item,
          }))}
        />
      )}
    </>
  );
}
