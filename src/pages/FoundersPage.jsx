import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { contactInfo } from '../data/contact';

export default function FoundersPage({ onScheduleCall }) {
  const handleCTA = onScheduleCall || (() => { window.location.href = `mailto:${contactInfo.email}`; });

  useEffect(() => {
    document.title = "Founders & Leadership | manifestTechmedia";
  }, []);

  const whyUsPoints = [
    {
      title: 'Revenue-First Architecture',
      desc: 'We measure success in net dollars added to your revenue, not dashboard impressions or vanity engagement metrics. Every ad dollar is tracked directly to backend customer acquisition.'
    },
    {
      title: 'Strategic Not Tactical',
      desc: 'We build complete end-to-end growth machines. We do not just run ads in isolation — we align creative positioning, landing funnels, and appointment nurture flows into one synchronized system.'
    },
    {
      title: 'Data-Led & Algorithmic',
      desc: 'Decisions are driven by strict statistical testing frameworks developed inside Google. We eliminate guesswork so ad spend scales predictably without breaking CPA thresholds.'
    },
    {
      title: 'Market-Agnostic Precision',
      desc: 'Proven systems refined across 400+ businesses and 8+ industries: high-ticket consulting, DTC e-commerce, real estate lead gen, SaaS, and specialized service platforms.'
    },
    {
      title: 'Direct Operator Partnership',
      desc: 'Complete clarity on performance metrics, unit economics, and weekly strategic iterations. You get direct access to senior operators who know your account inside out.'
    },
    {
      title: 'Selective Client Intake',
      desc: 'We strictly limit active client intake. We work exclusively with high-margin businesses where our systems can generate multi-million dollar revenue transformations.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#e9e9e9', color: '#181818', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* 1. Header & Hero Intro */}
      <section style={{ padding: '80px 2.5rem 60px', backgroundColor: '#e9e9e9' }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7A2331'
              }}
            >
              FORBES 30 UNDER 30 · THE LEADERSHIP & OPERATORS
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              marginBottom: '2rem',
              color: '#181818',
              maxWidth: '960px'
            }}
          >
            Built by operators from Google & Ogilvy.
          </h1>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderLeft: '4px solid #7A2331',
              borderRadius: '0 20px 20px 0',
              padding: '2.5rem',
              maxWidth: '920px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)',
                lineHeight: 1.7,
                color: '#444444',
                margin: 0,
                fontWeight: 500
              }}
            >
              Oshim Kher spent years inside Google, learning how the world's most sophisticated ad infrastructure operates at scale. Aishwarya Soni built brand narratives at Ogilvy, one of the most respected creative firms on earth. Together, the thesis was clear: the businesses that win aren't the ones with the best product — they're the ones with the best system. Forbes agrees. So do 400+ clients.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Executive Bio Cards (Generic Founder Teasers) */}
      <section style={{ padding: '60px 2.5rem 100px', backgroundColor: '#e9e9e9' }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            
            {/* Oshim Kher Teaser Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: '#7A2331',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 800
                  }}
                >
                  OK
                </div>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#181818', margin: 0 }}>Oshim Kher</h2>
                  <span style={{ fontSize: '0.8rem', color: '#7A2331', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Ex-Google · Performance Marketing · Forbes 30U30
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.98rem', color: '#555555', lineHeight: 1.68, margin: 0 }}>
                Oshim spent over half a decade inside Google's core ad algorithms team, engineering programmatic bidding protocols and AI-driven audience attribution models. Having managed over $200M+ in ad spend for 400+ businesses, he translates complex ad infrastructure into repeatable, high-margin customer acquisition pipelines.
              </p>

              <div style={{ paddingTop: '1.2rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#181818' }}>$200M+</div>
                  <div style={{ fontSize: '0.75rem', color: '#777777', textTransform: 'uppercase', fontWeight: 600 }}>Ad Spend Managed</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#181818' }}>400+</div>
                  <div style={{ fontSize: '0.75rem', color: '#777777', textTransform: 'uppercase', fontWeight: 600 }}>Clients Scaled</div>
                </div>
              </div>
            </div>

            {/* Aishwarya Soni Teaser Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: '#7A2331',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 800
                  }}
                >
                  AS
                </div>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#181818', margin: 0 }}>Aishwarya Soni</h2>
                  <span style={{ fontSize: '0.8rem', color: '#7A2331', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Ex-Ogilvy · Brand Strategy · Forbes 30U30
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.98rem', color: '#555555', lineHeight: 1.68, margin: 0 }}>
                Aishwarya began her career at Ogilvy shaping global brand narratives and high-stakes campaign positioning. At MTM, she bridges elite creative direction with direct-response psychological triggers — crafting high-converting VSL scripts, funnel copy, and brand authority that command premium market pricing.
              </p>

              <div style={{ paddingTop: '1.2rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#181818' }}>Ogilvy</div>
                  <div style={{ fontSize: '0.75rem', color: '#777777', textTransform: 'uppercase', fontWeight: 600 }}>Brand Legacy</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#181818' }}>Forbes 30U30</div>
                  <div style={{ fontSize: '0.75rem', color: '#777777', textTransform: 'uppercase', fontWeight: 600 }}>Honoree</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Operational Philosophy & Why Us */}
      <section style={{ padding: '100px 2.5rem', backgroundColor: '#e9e9e9', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A2331', display: 'block', marginBottom: '0.8rem' }}>
              OUR OPERATIONAL PHILOSOPHY
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#181818' }}>
              Why Leading Founders Partner With Us
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {whyUsPoints.map((item, idx) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
                }}
              >
                <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#7A2331', display: 'block', marginBottom: '1rem' }}>
                  0{idx + 1}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#181818', marginBottom: '0.8rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Banner Container */}
          <div
            style={{
              marginTop: '5rem',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '4rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7A2331', display: 'block', marginBottom: '0.8rem' }}>
              DIRECT ACCESS TO OPERATORS
            </span>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#181818', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Ready to scale your business with Forbes 30U30 leadership?
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#555555', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
              Book a 1-on-1 executive strategy session to review your current acquisition bottlenecks and unit economics.
            </p>
            <button
              onClick={handleCTA}
              style={{
                borderRadius: '9999px',
                padding: '1rem 2.5rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                backgroundColor: '#7A2331',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(122, 35, 49, 0.25)',
                transition: 'transform 0.2s ease, backgroundColor 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5c1a24')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7A2331')}
            >
              Schedule A Strategy Call
            </button>
          </div>

        </div>
      </section>

      {/* 4. Editorial Site Footer */}
      <Footer />

    </div>
  );
}
