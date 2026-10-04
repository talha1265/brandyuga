import { ServiceItem, ProjectItem, BlogPost } from '@/types';

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'product-research',
    title: 'Product Research & Opportunity Analysis',
    hindi_tagline: 'Kya sell karna hai, kaunse products mein opportunity hai',
    description: 'Data-backed market research to identify viral, high-margin, low-competition products before your competitors catch on. We analyze category demand, profit margins, sourcing feasibility, and customer pain points.',
    category: 'core',
    icon: 'SearchCheck',
    badge: 'High ROI',
    features: [
      'Amazon & Flipkart BSR & Sales Velocity Breakdown',
      'Market Size & Consumer Search Volume Analysis',
      'Competitor Revenue & Review Teardown',
      'Margin & Landed Cost Calculation (MOQ to Delivery)',
      'Product Differentiation & White-labeling Roadmap'
    ],
    deliverables: ['Custom Niche Opportunity Report', 'Financial Feasibility Sheet', 'Supplier Audit Checklist'],
    order_index: 1,
    is_active: true,
  },
  {
    id: 'srv-2',
    slug: 'website-development',
    title: 'D2C Website & E-Commerce Development',
    hindi_tagline: 'Brand ka apna D2C sales channel',
    description: 'High-speed, conversion-focused Next.js and Shopify stores that turn visitors into paying customers. Stop relying only on third-party marketplaces and build direct customer ownership with zero commission fees.',
    category: 'core',
    icon: 'Code2',
    badge: 'Popular',
    features: [
      'Lightning-Fast Next.js / Shopify Headless Architecture',
      '1-Click Checkout & Indian Payment Gateways (Razorpay, Cashfree, COD)',
      'Abandoned Cart Recovery & WhatsApp Automation',
      'Pixel & Conversion API Integration (Meta, Google, TikTok)',
      '100% Mobile Optimized Fluid Responsive UI'
    ],
    deliverables: ['Production Storefront', 'Integrated Payment & Shipping APIs', 'Admin CMS Dashboard'],
    order_index: 2,
    is_active: true,
  },
  {
    id: 'srv-3',
    slug: 'photo-editing-photography',
    title: 'Photo Editing & Product Photography',
    hindi_tagline: 'Product presentation aur listing creatives',
    description: 'Transform regular photos into studio-grade masterpieces. From pure white-background catalog shots that meet marketplace standards to high-end lifestyle mockups and 3D renders that drive clicks.',
    category: 'creative',
    icon: 'Camera',
    badge: 'Creative Lab',
    features: [
      'Pure White Background Marketplace Compliant Shots',
      'High-Converting Amazon A+ / EBC Infographics',
      'Realistic Lifestyle & Contextual Composites',
      '3D Product Modeling, Texturing & Renders',
      'Color Correction, Reflection Removal & High-Res Retouching'
    ],
    deliverables: ['Ready-to-upload Amazon/Flipkart Packs', 'A+ Content Modules', 'High-Res Print & Web Assets'],
    order_index: 3,
    is_active: true,
  },
  {
    id: 'srv-4',
    slug: 'video-editing-shoots',
    title: 'Video Editing & Product Shoots',
    hindi_tagline: 'Content aur advertising creatives',
    description: 'Stop the scroll with high-converting video creatives. We script, shoot, and edit cinematic product showcases, UGC unboxing videos, and short-form TikTok/Instagram Reels optimized for performance ads.',
    category: 'creative',
    icon: 'Clapperboard',
    badge: 'Viral Formats',
    features: [
      'High-CTR Meta & TikTok Video Ad Creatives',
      'UGC-Style Unboxing & First-Impression Reviews',
      'Cinematic Product Feature Walkthroughs & Macro Details',
      'Hook-Driven 15-30s Reels & Shorts Format',
      'Dynamic Motion Graphics, Sound Design & Subtitles'
    ],
    deliverables: ['Multi-Angle Video Ads (9:16 & 1:1)', 'Raw + Graded Master Files', 'Script & Storyboard'],
    order_index: 4,
    is_active: true,
  },
  {
    id: 'srv-5',
    slug: 'marketplace-management',
    title: 'Marketplace Operations & Account Scaling',
    hindi_tagline: 'Amazon/Flipkart operations, listings, catalog, etc.',
    description: 'End-to-end seller account management across Amazon, Flipkart, Meesho, and Myntra. We manage your daily operations, listing optimizations, inventory forecasting, and customer disputes so you never face account suspensions.',
    category: 'operations',
    icon: 'Store',
    badge: 'Core Service',
    features: [
      'Full Amazon Seller Central & Flipkart Dashboard Management',
      'SEO-Optimized Titles, Bullet Points, and Backend Search Terms',
      'FBA / Warehouse Stock Forecasting & Restocking Alerts',
      'Brand Registry, Category Approvals & Policy Compliance',
      'Mega Sale Events Planning (Big Billion Days, Great Indian Festival)'
    ],
    deliverables: ['Daily Operations Management', 'Weekly Growth Audits', 'Dispute Resolution Handling'],
    order_index: 5,
    is_active: true,
  },
  {
    id: 'srv-6',
    slug: 'ppc-performance-marketing',
    title: 'PPC & Growth Marketing',
    hindi_tagline: 'Customer acquisition aur sales growth',
    description: 'Stop burning money on random ad spend. Our performance marketing specialists craft laser-targeted Sponsored Ads on Amazon/Flipkart alongside Meta and Google Ads to deliver aggressive ROAS and scalable acquisition.',
    category: 'marketing',
    icon: 'TrendingUp',
    badge: 'High ROAS',
    features: [
      'Amazon Sponsored Products, Brands & Display Ad Architecture',
      'Flipkart PLA (Product Listing Ads) & PCA Campaigns',
      'Meta (Instagram/FB) Prospecting & Retargeting Funnels',
      'Negative Keyword Mining & Bid Automation for Minimum ACoS',
      'Continuous A/B Testing of Creatives and Copy'
    ],
    deliverables: ['Live Real-Time Ads Dashboard', 'Weekly Spend vs Return Reports', 'Ongoing Bid Optimization'],
    order_index: 6,
    is_active: true,
  },
  {
    id: 'srv-7',
    slug: 'analytics-business-intelligence',
    title: 'Data Analytics & Business Intelligence',
    hindi_tagline: 'Sales, ads aur business data se better decisions lena',
    description: 'Turn chaotic spreadsheets into actionable profit insights. We centralize multi-channel sales, advertising spend, RTO (return-to-origin) rates, and customer acquisition costs into intuitive real-time dashboards.',
    category: 'operations',
    icon: 'LineChart',
    badge: 'Intelligence',
    features: [
      'Unified Multi-Channel Profit & Loss (P&L) Dashboards',
      'RTO & Return Rates Cohort Analysis and Mitigation',
      'Customer Lifetime Value (LTV) vs Acquisition Cost (CAC)',
      'SKU-Level Gross Margin & Contribution Margin Tracking',
      'Custom Automated Weekly Executive PDF Reports'
    ],
    deliverables: ['Automated BI Dashboard', 'SKU Margin Breakdown Sheet', 'Monthly Growth Strategy Review'],
    order_index: 7,
    is_active: true,
  },
  {
    id: 'srv-8',
    slug: 'brand-identity',
    title: 'Brand Identity & Visual Design',
    hindi_tagline: 'Brand ki pehchan aur visual trust',
    description: 'Memorable brand identities that command premium pricing. From iconic logo designs and color theory to luxury packaging that delights customers upon unboxing.',
    category: 'creative',
    icon: 'Palette',
    features: [
      'Custom Vector Logo & Brand Iconography',
      'Packaging & Product Box Unboxing Design',
      'Comprehensive Brand Guidelines (Fonts, Colors, Tone of Voice)',
      'Social Media Kit & Business Stationery'
    ],
    deliverables: ['Vector Brand Assets Kit', 'Print-Ready Packaging Files', 'Complete Brand Style Guide'],
    order_index: 8,
    is_active: true,
  },
  {
    id: 'srv-9',
    slug: 'legal-consulting',
    title: 'Legal Consulting & Startup Compliance',
    hindi_tagline: 'Startup registration aur trademark protection',
    description: 'Protect your brand from day one. We take care of trademark registrations, GST setup, company incorporation (Pvt Ltd / LLP), and marketplace compliance contracts.',
    category: 'legal',
    icon: 'ShieldCheck',
    features: [
      'Trademark Search, Filing & Objection Handling',
      'Private Limited / LLP / OPC Incorporation',
      'GST Registration, MSME & Startup India Recognition',
      'Vendor Agreements, NDAs & E-commerce Terms of Service'
    ],
    deliverables: ['Government Certified Trademark Application', 'Certificate of Incorporation', 'Standard Legal Contracts'],
    order_index: 9,
    is_active: true,
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Dezignxo',
    category: '3D Graphics & Marketplace',
    description: 'Dezignxo is a next-generation 3D graphics and digital asset marketplace crafted with high performance, search indexing, and fluid asset browsing.',
    image_url: '/assets/uploads/dezignxo.png',
    live_url: 'https://dezignxo.com/',
    tags: ['Next.js', '3D Marketplace', 'Stripe/Razorpay', 'Asset CDN'],
    featured: true,
    order_index: 1,
  },
  {
    id: 'proj-2',
    title: 'Jettel',
    category: 'Consumer Electronics D2C',
    description: 'Jettel is an aggressive consumer electronics startup specializing in wireless headsets, ANC earpods, and sleek mobile charging accessories.',
    image_url: '/assets/uploads/jettel.png',
    live_url: 'http://jettel.co.in/',
    tags: ['D2C Store', 'Electronics', 'Amazon Launch', 'PPC Ads'],
    featured: true,
    order_index: 2,
  },
  {
    id: 'proj-3',
    title: 'Gadgets Zone',
    category: 'E-Commerce Marketplace',
    description: 'A multi-category electronics and smart device shopping platform designed for ultra-fast product discovery and high checkout completion.',
    image_url: '/assets/uploads/gadgets.png',
    live_url: 'https://gadgetszonehub.in/',
    tags: ['E-Commerce Hub', 'High Velocity Catalog', 'Cart Optimization'],
    featured: true,
    order_index: 3,
  },
  {
    id: 'proj-4',
    title: 'Shifa Eye Care Hospital',
    category: 'Healthcare & Digital Booking',
    description: 'Comprehensive digital healthcare portal for an eye care hospital with automated appointment scheduling, doctor profiles, and patient inquiries.',
    image_url: '/assets/uploads/shifa.png',
    live_url: '#',
    tags: ['Healthcare', 'Appointment Booking', 'SEO & Local Ads'],
    featured: true,
    order_index: 4,
  },
  {
    id: 'proj-5',
    title: 'Alpha Tech',
    category: 'IT Consultancy Agency',
    description: 'Enterprise IT consultancy platform highlighting cloud architecture, custom software development, and digital transformation consulting.',
    image_url: '/assets/uploads/alphatech.png',
    live_url: '#',
    tags: ['Enterprise Web', 'B2B Leads', 'Brand Positioning'],
    featured: false,
    order_index: 5,
  }
];

export const initialTestimonials = [
  {
    id: 'rev-1',
    name: 'Nadeem',
    role: 'Founder, Direct-to-Consumer Brand',
    rating: 5,
    avatar: 'N',
    text: 'BrandYuga sach mein problems solve karne aur businesses ko strong brand banane mein care karta hai. Unki team har project ko passion ke saath handle karti hai, aapke vision ko apna samajh kar. Service premium feel hoti hai, aur price bhi kaafi affordable hai.',
    highlight: 'Service premium feel hoti hai'
  },
  {
    id: 'rev-2',
    name: 'Sufi',
    role: 'E-Commerce Seller',
    rating: 5,
    avatar: 'S',
    text: 'BrandYuga ke saath experience bahut smooth raha. Unka focus sirf paisa nahi, balki aapki problem solve karke brand ko grow karna hai. Hamara Amazon seller account within 6 weeks profit mein aa gaya!',
    highlight: 'Unka focus sirf brand grow karna hai'
  },
  {
    id: 'rev-3',
    name: 'Dev Agnihotri',
    role: 'Managing Director, Retail Innovations',
    rating: 5,
    avatar: 'D',
    text: 'What sets BrandYuga apart is their mindset — they think like partners, not vendors. They dive deep into your challenges with honesty and intent, not just deliverables. The work feels high-end, but the pricing stays practical and fair.',
    highlight: 'They think like partners, not vendors'
  },
  {
    id: 'rev-4',
    name: 'Rajiv Sharma',
    role: 'Consumer Electronics Brand Founder',
    rating: 5,
    avatar: 'R',
    text: 'Unki product research aur PPC advertising team ka koi muqabla nahi. Zero sales se shuru karke 3rd month mein humne ₹24 Lakhs per month cross kiya. Extremely responsive on WhatsApp!',
    highlight: '₹24L+ Monthly GMV Achieved'
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'how-to-scale-amazon-seller-account-2026',
    title: 'How to Scale an Amazon India Seller Account from Zero to ₹10 Lakhs/Month in 2026',
    category: 'Marketplace Growth',
    excerpt: 'The exact step-by-step blueprint we use at BrandYuga to validate profitable products, build high-converting A+ content, and optimize Amazon PPC without bleeding money.',
    content: `
Starting an Amazon business in 2026 requires more than just listing a generic product from wholesale markets. With increased competition and rising ad costs, brands need a structured 4-pillar growth engine:

### 1. The Right Product Selection (Kya Sell Karna Hai)
Never guess demand. We use high-velocity sales tools to analyze keyword search volume, BSR velocity, and average selling price. Look for categories where top sellers have less than 4-star average reviews — that is your opportunity to enter with superior quality and packaging.

### 2. High-Converting Product Listings & A+ Infographics
Your listing is your 24/7 digital salesperson. 
- Professional white-background hero image with 85% product fill
- 5 benefit-driven lifestyle infographics highlighting pain points
- A+ (Enhanced Brand Content) modules that tell your brand story and build trust

### 3. Low-ACoS PPC Strategy
Structure campaigns with clean intent:
- Auto campaigns to discover new search terms
- Exact match campaigns for high-converting high-intent keywords
- Negative keyword lists updated twice a week to eliminate wasted spend

### 4. Direct D2C Funnel Diversification
Do not keep all your eggs in one basket. Run a parallel high-speed D2C storefront so you collect direct customer phone numbers and emails for zero-commission repeat purchases.
    `,
    cover_image: '/assets/uploads/gadgets.png',
    author: 'BrandYuga Research Team',
    read_time: '5 min read',
    published: true,
    created_at: '2026-09-15'
  },
  {
    id: 'blog-2',
    slug: 'why-every-d2c-brand-needs-video-ads',
    title: 'Why Static Images Are No Longer Enough: Mastering Video Ads & Product Shoots',
    category: 'Creative & Video',
    excerpt: 'Short-form video is generating 3x more conversions than static photos on Meta and Instagram. Discover how hook-driven UGC video shoots transform your ROAS.',
    content: `
If your ad creatives look like traditional corporate commercials, users scroll right past them. In 2026, the brands winning on Meta, Instagram, and YouTube Shorts focus on dynamic, authentic video storytelling.

### The 3-Second Hook Rule
The first 3 seconds determine whether a viewer buys or bounces. Use dynamic text overlays, relatable customer problem statements, and macro product shots that immediately communicate value.

### UGC (User Generated Content) Style
Consumers trust real people over polished corporate ads. By combining creator-led unboxings with professional color grading and punchy sound design, BrandYuga clients consistently achieve 3.8x to 5.2x ROAS on initial ad sets.
    `,
    cover_image: '/assets/uploads/jettel.png',
    author: 'Talha & Creative Team',
    read_time: '4 min read',
    published: true,
    created_at: '2026-09-28'
  },
  {
    id: 'blog-3',
    slug: 'e-commerce-analytics-mistakes',
    title: 'The Top 5 Analytics Mistakes That Silently Kill E-Commerce Profitability',
    category: 'Analytics & Strategy',
    excerpt: 'Revenue is vanity, profit is sanity. Learn how tracking Contribution Margin, RTO rates, and customer acquisition payback periods keeps your business cash-flow positive.',
    content: `
Many founders celebrate hitting ₹50 Lakhs in monthly gross sales, only to realize at the end of the quarter that net bank balance has barely moved. 

### 1. Ignoring RTO (Return to Origin) Costs
In the Indian e-commerce landscape, Cash on Delivery (COD) orders can reach 25-40% RTO if not properly verified. BrandYuga installs automated WhatsApp order confirmations to reduce returns by up to 18%.

### 2. Confusing ROAS with Net Profit
A 4x ROAS on Meta ads sounds incredible until you factor in shipping, packaging, marketplace commissions, and GST. We build unified P&L dashboards that show your exact net profit per SKU in real time.
    `,
    cover_image: '/assets/uploads/dezignxo.png',
    author: 'BrandYuga Analytics Desk',
    read_time: '6 min read',
    published: true,
    created_at: '2026-10-01'
  }
];
