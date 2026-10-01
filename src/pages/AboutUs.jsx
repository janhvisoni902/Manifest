import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import CoreValues from '../components/CoreValues';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | manifestTechmedia";
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.from('.about-hero-sub', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const historyMilestones = [
    {
      year: '2021',
      title: 'THE BEGINNING',
      desc: 'manifestTechmedia began its journey with a clear vision — to build compounding revenue systems, paid funnel architecture, and high-performance brand platforms.'
    },
    {
      year: '2022',
      title: 'BUILDING THE FOUNDATION',
      desc: 'We engineered predictive media buying infrastructure and conversion funnels for enterprise DTC and B2B platforms.'
    },
    {
      year: '2023',
      title: 'EXPANDING HORIZONS',
      desc: 'We expanded our expertise across brand activations, experiential marketing, events, retail, and promotional solutions.'
    },
    {
      year: '2024',
      title: 'STRENGTHENING OUR REACH',
      desc: 'We built stronger execution capabilities, delivering engaging brand experiences across diverse markets and consumer touchpoints.'
    },
    {
      year: '2025',
      title: 'CREATING IMPACT',
      desc: 'We brought strategy, creativity, and execution together to craft memorable experiences and meaningful brand connections.'
    },
    {
      year: '2026',
      title: 'GROWING FORWARD',
      desc: 'We continue to innovate, adapt, and integrate physical and digital experiences, helping brands connect more effectively with their audiences.'
    }
  ];


  return (
    <div className="about-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* Hero Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-burgundy)',
            fontWeight: 700,
            display: 'block',
            marginBottom: 'var(--space-label-heading)'
          }}>
            WHO WE ARE
          </span>
          <h1 className="about-hero-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Architects of Extraordinary Brand Experiences
          </h1>
          <p className="about-hero-sub" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            SR Brand Solutions is an integrated experiential marketing agency. We design and execute live activations, corporate expos, retail environments, and high-octane brand events that captivate audiences and deliver measurable ROI.
          </p>
        </div>
      </section>

      {/* Story & History */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-gold)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              OUR JOURNEY (2021 – 2026)
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '0.8rem' }}>
              From Vision to Meaningful Impact
            </h2>
          </div>

          <div className="timeline-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {historyMilestones.map((item, idx) => (
              <div key={idx} className="timeline-item" style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(176, 141, 87, 0.2)',
                padding: '2.5rem 1.5rem',
                borderRadius: '8px',
                position: 'relative'
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-gold)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  {item.year}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  color: '#F3EBDD',
                  marginBottom: '1rem',
                  letterSpacing: '0.05em'
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Journey Conclusion Banner */}
          <div style={{
            marginTop: '4rem',
            padding: '2.5rem 2rem',
            backgroundColor: 'rgba(176, 141, 87, 0.12)',
            border: '1px solid rgba(176, 141, 87, 0.4)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--color-accent-gold)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.8rem'
            }}>
              2021 → 2026 | 5 YEARS OF BUILDING BRANDS. CREATING EXPERIENCES. MAKING CONNECTIONS.
            </span>
            <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: 1.7, maxWidth: '850px', margin: '0 auto' }}>
              Our journey has been defined by continuous evolution, meaningful partnerships, and a commitment to turning every brand interaction into an experience that matters.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <CoreValues />


      {/* Call to Action */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-accent-burgundy)', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem' }}>
            Ready to Elevate Your Brand Strategy?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem' }}>
            Partner with SR Brand Solutions to transform audience engagements into memorable brand equity.
          </p>
          <Link
            href="/contact"
            className="nav-cta-btn"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.95rem',
              backgroundColor: '#F3EBDD',
              color: '#101126',
              borderColor: '#F3EBDD',
              display: 'inline-flex'
            }}
          >
            <span>Start a Conversation</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ stroke: '#101126' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
