import React, { useState } from 'react';
import { Link } from '../lib/router';

export default function CaseStudiesPage({ onScheduleCall }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Messaging & Engagement', 'Lead Gen', 'Call Booking', 'Sales Campaigns'];

  const caseStudiesData = [
    {
      id: 1,
      title: 'High-Ticket B2B Coaching System',
      category: 'Call Booking',
      industry: 'Coaches & Consultants',
      metric: '$9.20 Cost Per Booking',
      submetric: '340+ Qualified Calls / Mo',
      desc: 'Replaced manual outreach with an automated VSL funnel and calendar qualification engine. Scaled monthly ad spend from $5K to $45K while holding CPA steady.',
      imagePlaceholderText: 'Campaign Screenshot Placeholder: Call Booking Funnel & Calendar Conversion Stats'
    },
    {
      id: 2,
      title: 'DTC Health & Wellness Brand',
      category: 'Sales Campaigns',
      industry: 'E-Commerce & DTC',
      metric: '8.4x Blended ROAS',
      submetric: '$180,000 New Revenue in 45 Days',
      desc: 'Restructured ad creatives with high-velocity UGC testing and dynamic retargeting. Decreased customer acquisition cost by 42% while doubling average order value.',
      imagePlaceholderText: 'Campaign Screenshot Placeholder: Meta Ads Manager ROAS & Revenue Attribution Dashboard'
    },
    {
      id: 3,
      title: 'Commercial Real Estate Pipeline',
      category: 'Lead Gen',
      industry: 'Real Estate & Lead Gen',
      metric: '$1.80 Lead Cost',
      submetric: '1,200+ Qualified Investor Leads',
      desc: 'Built multi-step lead capture forms with instant SMS follow-up sequences. Converted cold social traffic into verified investor appointments at industry-record CPA.',
      imagePlaceholderText: 'Campaign Screenshot Placeholder: Lead Gen Form & CRM Conversion Pipeline'
    },
    {
      id: 4,
      title: 'SaaS AI Growth Engine',
      category: 'Messaging & Engagement',
      industry: 'SaaS & AI Growth',
      metric: '14.2x ROAS',
      submetric: '5,000+ Free Trial Signups',
      desc: 'Crafted positioning frameworks that simplified complex AI workflows into immediate user ROI messaging. Scaled user acquisition 3.5x in under 90 days.',
      imagePlaceholderText: 'Campaign Screenshot Placeholder: SaaS Trial Signups & User Retention Analytics'
    },
    {
      id: 5,
      title: 'Executive Consulting Appointment Engine',
      category: 'Call Booking',
      industry: 'Coaches & Consultants',
      metric: '$11.50 Cost Per Booking',
      submetric: '$32,000 Closed Retainers',
      desc: 'Engineered an exclusive application funnel filtering for $1M+ ARR founders. Generated 85+ high-ticket consultation calls with an 82% show-up rate.',
      imagePlaceholderText: 'Campaign Screenshot Placeholder: High-Ticket Application & Closed Deal Tracking'
    },
    {
      id: 6,
      title: 'National Service Business Expansion',
      category: 'Lead Gen',
      industry: 'Service-Based Businesses',
      metric: '4.8x ROAS',
      submetric: '450+ Local Service Bookings',
      desc: 'Geo-targeted paid social campaigns paired with automated instant quote calculators. Reduced phone booking friction and tripled weekly dispatch capacity.',
      imagePlaceholderText: 'Campaign Screenshot Placeholder: Geo-Targeted Ad Campaigns & Local Dispatch Stats'
    }
  ];

  const filteredStudies = activeCategory === 'All'
    ? caseStudiesData
    : caseStudiesData.filter(item => item.category === activeCategory);

  return (
    <div style={{ backgroundColor: '#0F1017', color: '#FFFFFF', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Header & Stats Intro */}
      <section style={{ padding: '80px 2.5rem 60px', backgroundColor: '#0F1017', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B08D57',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            VERIFIED AUDITED RESULTS
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 5.8vw, 4.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              maxWidth: '920px'
            }}
          >
            Documented outcomes. Not promises.
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', color: 'rgba(255, 255, 255, 0.72)', maxWidth: '820px', lineHeight: 1.6, marginBottom: '3.5rem' }}>
            We back every client partnership with real backend attribution, strict unit economic controls, and verifiable ad spend data across 400+ campaigns.
          </p>

          {/* 4 Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
                $200M+
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B08D57', marginTop: '8px' }}>
                Total Ad Spend Managed
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '4px', margin: 0 }}>
                Across Meta, Google, & Cold Traffic with full conversion tracking.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
                400+
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B08D57', marginTop: '8px' }}>
                US Businesses Transformed
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '4px', margin: 0 }}>
                High-margin founders turned into predictable, scalable revenue engines.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
                3x–15x
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B08D57', marginTop: '8px' }}>
                ROAS Range Achieved
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '4px', margin: 0 }}>
                Maintained consistently across cold traffic acquisition and retargeting.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
                $30,000+
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B08D57', marginTop: '8px' }}>
                Closed Per Campaign
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '4px', margin: 0 }}>
                Average closed deal value from automated call booking funnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Gallery Section */}
      <section style={{ padding: '100px 2.5rem', backgroundColor: '#141414' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B08D57', display: 'block', marginBottom: '0.8rem' }}>
              CAMPAIGN CASE STUDIES
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              Real Founders. Real Revenue.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.8rem',
              justifyContent: 'center',
              marginBottom: '3.5rem'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  border: activeCategory === cat ? '1px solid #B08D57' : '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: activeCategory === cat ? '#B08D57' : 'rgba(255, 255, 255, 0.04)',
                  color: activeCategory === cat ? '#0F1017' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Campaign Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {filteredStudies.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(176, 141, 87, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Structured Campaign Screenshot Placeholder Image Block */}
                <div
                  style={{
                    height: '210px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#B08D57',
                      backgroundColor: 'rgba(176, 141, 87, 0.15)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(176, 141, 87, 0.3)',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.industry}
                  </div>

                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="1.5" style={{ marginBottom: '10px', opacity: 0.8 }}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>

                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', maxWidth: '85%' }}>
                    {item.imagePlaceholderText}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.8rem', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>

                    {/* Metric Highlight Pill */}
                    <div
                      style={{
                        backgroundColor: 'rgba(176, 141, 87, 0.12)',
                        border: '1px solid rgba(176, 141, 87, 0.3)',
                        borderRadius: '12px',
                        padding: '0.8rem 1rem',
                        marginBottom: '1.2rem'
                      }}
                    >
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#B08D57' }}>
                        {item.metric}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>
                        {item.submetric}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.68)', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.2rem' }}>
              Want results like these engineered for your business?
            </h3>
            <Link
              href="/book"
              onClick={(e) => {
                if (onScheduleCall) {
                  e.preventDefault();
                  onScheduleCall();
                }
              }}
              style={{
                display: 'inline-block',
                borderRadius: '9999px',
                padding: '1rem 2.5rem',
                fontSize: '0.92rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                backgroundColor: '#FFFFFF',
                color: '#0F1017',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                textDecoration: 'none'
              }}
            >
              Book a Strategy Call
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
