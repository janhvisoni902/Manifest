import { assetUrl } from '../lib/router';

export const manifestIndustriesData = [
  {
    id: 'founders',
    title: 'FOUNDERS',
    slug: 'founders',
    imgSrc: assetUrl('/images/why-us/why-us-1.jpg'),
    tagline: 'Personal brand & company positioning built for founder-led growth.',
    intro: 'We help visionary founders translate their personal authority into business leverage, audience trust, and scalable customer acquisition.',
    howWeHelp: 'Founders are the ultimate trust proxy for modern brands. We build content systems, media assets, and acquisition funnels centered around your voice and vision.',
    growthSystem: [
      'Founder Positioning & Narrative Architecture',
      'Authority Content & Media Production',
      'Direct-Response Customer Funnels',
      'Paid Amplification & Distribution'
    ],
    whatWeFocusOn: [
      "Establishing clear market category leadership",
      "Converting organic attention into qualified pipeline",
      "Building evergreen brand equity around the founder's vision"
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-COMMERCE',
    slug: 'ecommerce',
    imgSrc: assetUrl('/images/work-tissot.jpg'),
    tagline: 'Turning paid attention into a system that compounds.',
    intro: 'We build high-performance creative and media acquisition systems for ambitious e-commerce brands seeking profitable scale.',
    howWeHelp: 'Rather than relying on one-off winning ads, we deploy an integrated revenue system combining rapid creative iteration, multi-channel media buying, and conversion optimization.',
    growthSystem: [
      'High-Volume Modular Creative Testing',
      'Paid Social & Search Media Buying',
      'Landing Page & Offer Optimization',
      'Retention & LTV Maximization'
    ],
    whatWeFocusOn: [
      'Lowering Customer Acquisition Cost (CAC)',
      'Scaling Merchandising Revenue & ROAS',
      'Maximizing First-Time Purchase Conversion Rate'
    ]
  },
  {
    id: 'saas-ai',
    title: 'SAAS / AI',
    slug: 'saas-ai',
    imgSrc: assetUrl('/assets/images/third-page.jpg'),
    tagline: 'High-velocity user acquisition for software and AI products.',
    intro: 'We help SaaS and AI companies turn complex product value into clear, high-converting messaging and acquisition campaigns.',
    howWeHelp: 'Technical innovation needs concise messaging. We bridge product features with market pain points, driving trial signups and demo bookings at scale.',
    growthSystem: [
      'Product-Led Growth (PLG) Campaign Architecture',
      'Demo & Free Trial Conversion Funnels',
      'Paid Search & Social Intent Targeting',
      'User Onboarding & Retargeting Loops'
    ],
    whatWeFocusOn: [
      'Accelerating Monthly Recurring Revenue (MRR) momentum',
      'Reducing Cost Per Acquisition (CPA) for trial users',
      'Driving qualified sales-ready leads for enterprise tiers'
    ]
  },
  {
    id: 'service-businesses',
    title: 'SERVICE BUSINESSES',
    slug: 'service-businesses',
    imgSrc: assetUrl('/images/why-us/why-us-8.jpg'),
    tagline: 'Predictable high-ticket client acquisition systems.',
    intro: 'We build predictable pipeline engines for high-value B2B and professional service firms.',
    howWeHelp: 'Service businesses thrive on trust and proof. We engineer trust-first marketing campaigns that position your expertise ahead of the sales conversation.',
    growthSystem: [
      'High-Ticket Offer & Landing Page Architecture',
      'Authority Case Study & Proof Assets',
      'Targeted B2B Paid Lead Generation',
      'Nurture & Appointment Booking Sequences'
    ],
    whatWeFocusOn: [
      'Generating inbound high-intent client inquiries',
      'Shortening the B2B sales decision cycle',
      'Establishing industry authority over commoditized competitors'
    ]
  },
  {
    id: 'coaches-consultants',
    title: 'COACHES / CONSULTANTS',
    slug: 'coaches-consultants',
    imgSrc: assetUrl('/images/event-gallery-7.jpg'),
    tagline: 'Authority marketing for industry experts and advisors.',
    intro: 'We build high-converting brand engines for premium advisors, coaches, and strategic consultants.',
    howWeHelp: 'When you are the product, your marketing must project total clarity and authority. We build evergreen funnels that attract premium clients predictably.',
    growthSystem: [
      'Signature Offer & VSL (Video Sales Letter) Creation',
      'Omnichannel Paid Traffic Strategy',
      'Application & Qualified Screening Funnels',
      'Client Retention & Community Ecosystems'
    ],
    whatWeFocusOn: [
      'Attracting high-paying, committed clients',
      'Automating lead qualification before discovery calls',
      'Building scalable digital product and mastermind environments'
    ]
  },
  {
    id: 'dtc-brands',
    title: 'DTC BRANDS',
    slug: 'dtc-brands',
    imgSrc: assetUrl('/images/work-goodyear.jpg'),
    tagline: 'Brand narrative meets direct response performance.',
    intro: 'We scale direct-to-consumer brands through culturally resonant creative strategy and full-funnel media execution.',
    howWeHelp: 'Modern DTC brands require a balance of high-end editorial aesthetics and rigorous direct response data analytics to scale sustainably.',
    growthSystem: [
      'Editorial Brand & Motion Asset Production',
      'Performance Creative Testing Frameworks',
      'Omnichannel Paid Media Execution',
      'Post-Purchase Retention & Lifecycle Marketing'
    ],
    whatWeFocusOn: [
      'Driving sustainable blended Return On Ad Spend (ROAS)',
      'Building lasting brand sentiment alongside direct sales',
      'Scaling catalog depth and average order value (AOV)'
    ]
  }
];

export function getIndustryBySlug(slug) {
  return manifestIndustriesData.find(item => item.slug === slug || item.id === slug) || manifestIndustriesData[0];
}
