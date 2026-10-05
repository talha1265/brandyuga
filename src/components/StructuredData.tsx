import React from 'react';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://brandyuga.in/#organization',
    name: 'BrandYuga',
    legalName: 'BrandYuga E-Commerce Agency',
    url: 'https://brandyuga.in',
    logo: 'https://brandyuga.in/assets/images/logo.png',
    description:
      'BrandYuga delivers end-to-end e-commerce solutions: Product Research, D2C Website Development, Product Photography, Video Shoots, Amazon & Flipkart Operations, PPC Marketing, and Profit Analytics.',
    email: 'info@brandyuga.in',
    telephone: '+91-8853066278',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8853066278',
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9336610767',
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
    sameAs: [
      'https://www.instagram.com/brandyuga',
      'https://www.linkedin.com/company/brandyuga',
      'https://twitter.com/brandyuga',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://brandyuga.in/#website',
    url: 'https://brandyuga.in',
    name: 'BrandYuga',
    description: 'We Build Brands That Dominate Online - E-Commerce, D2C & Marketplace Scaling',
    publisher: {
      '@id': 'https://brandyuga.in/#organization',
    },
    inLanguage: 'en-IN',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://brandyuga.in/#service',
    name: 'BrandYuga E-Commerce & Marketplace Agency',
    image: 'https://brandyuga.in/assets/images/logo.png',
    url: 'https://brandyuga.in',
    telephone: '+91-8853066278',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Full-Stack E-Commerce Growth Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketplace Account Management (Amazon, Flipkart, Meesho)',
            description:
              'End-to-end account management including A+ content, cataloging, Buy Box defense, and festive promotions.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom D2C Website Development',
            description:
              'Ultra-fast Shopify and Next.js custom e-commerce websites engineered for high conversion rates.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Winning Product Research & Validation',
            description:
              'Data-driven product opportunity discovery analyzing margins, demand volume, and competitor weaknesses.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-Commerce Photography & Cinematic Video Shoots',
            description:
              'Studio product photography and viral TikTok/Reels video shoots designed for maximum click-through rates.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PPC & Performance Advertising (Amazon PPC & Meta Ads)',
            description:
              'ROI-focused ad campaigns with strict target ACoS/ROAS controls across Amazon Sponsored Ads and Meta.',
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does BrandYuga provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BrandYuga provides end-to-end e-commerce solutions including Product Research, Custom D2C Store Development (Next.js & Shopify), Studio Product Photography, Viral Video Shoots, Amazon & Flipkart Marketplace Management, and PPC Performance Marketing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does BrandYuga scale Amazon and Flipkart seller accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We optimize keyword indexing, craft high-converting A+ Enhanced Brand Content, plan FBA inventory replenishment, eliminate unauthorized hijackers, and execute algorithmically tuned PPC advertising campaigns to dramatically improve BSR ranking.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does BrandYuga 1-Month Free Trial work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You get 1 full month of marketplace management, catalog enhancement, or strategy execution without upfront fees or credit card requirements. If you love the measurable growth, we transition into a growth partnership.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does BrandYuga build custom D2C e-commerce websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We build high-speed, SEO-optimized custom D2C storefronts using Next.js and Shopify, integrated with Indian payment gateways (Razorpay, Cashfree), COD fraud prevention, and automated shipping workflows.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the BrandYuga 10% referral program work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When you refer a client or founder needing marketplace management, product shoots, or website development, you receive 10% of the total closed contract value paid straight to your bank or UPI within 48 hours of project sign-off.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
