import React from 'react';
import { motion } from 'framer-motion';
import { Link, assetUrl } from '../lib/router';
import { revealDuration, revealStagger } from '../lib/scrollPace';

export default function LeadersSection() {
  const leaders = [
    {
      id: '01',
      name: 'OSHIM KHER',
      role: 'Ex-Google · Performance Marketing & Growth',
      tag: 'FORBES 30 UNDER 30',
      bio: 'Engineered programmatic bidding protocols and AI-driven attribution models inside Google. Managed $200M+ in ad spend for 400+ businesses.',
      imgSrc: assetUrl('/images/why-us/why-us-1.jpg')
    },
    {
      id: '02',
      name: 'AISHWARYA SONI',
      role: 'Ex-Ogilvy · Brand Strategy & Creative Direction',
      tag: 'FORBES 30 UNDER 30',
      bio: 'Crafted global brand narratives at Ogilvy. Bridges elite creative direction with direct-response psychological triggers and scalable funnel copy.',
      imgSrc: assetUrl('/images/why-us/why-us-5.jpg')
    }
  ];

  return (
    <section
      id="leaders"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        backgroundColor: '#E2E2E2',
        color: '#181818',
        padding: '140px 2.5rem 160px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: revealDuration(0.8), ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontFamily: 'var(--font-intro, sans-serif)',
              fontSize: 'clamp(3.2rem, 7vw, 6.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#181818',
              textTransform: 'uppercase',
              margin: '0 0 1.2rem 0'
            }}
          >
            LEADERS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: revealDuration(0.8), delay: revealStagger(0.15), ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(24, 24, 24, 0.55)',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            THE PEOPLE<br />
            BEHIND THE SYSTEM.
          </motion.p>
        </div>

        {/* LEADERS GRID */}
        <div
          className="leaders-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            maxWidth: '960px',
            gap: '3rem',
            marginBottom: '6rem'
          }}
        >
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: revealDuration(0.8), delay: index * revealStagger(0.18), ease: [0.25, 1, 0.5, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid rgba(24, 24, 24, 0.2)',
                paddingTop: '1.5rem'
              }}
            >
              {/* IMAGE CONTAINER */}
              <div
                style={{
                  width: '100%',
                  height: '360px',
                  backgroundColor: '#181818',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  borderRadius: '2px'
                }}
              >
                <img
                  src={leader.imgSrc}
                  alt={leader.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'grayscale(100%) contrast(108%)',
                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className="leader-img-zoom"
                />
              </div>

              {/* LEADER INFO */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'rgba(24, 24, 24, 0.45)',
                    textTransform: 'uppercase'
                  }}
                >
                  [{leader.tag}]
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-intro, sans-serif)',
                    fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#181818',
                    textTransform: 'uppercase',
                    margin: '0.2rem 0'
                  }}
                >
                  {leader.name}
                </h3>

                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#181818',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem'
                  }}
                >
                  {leader.role}
                </span>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(24, 24, 24, 0.68)',
                    lineHeight: 1.5,
                    margin: 0
                  }}
                >
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM LINK */}
        <div style={{ textAlign: 'left', borderTop: '1px solid rgba(24, 24, 24, 0.2)', paddingTop: '2.5rem' }}>
          <Link
            href="/founders"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#181818',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1.5px solid #181818',
              paddingBottom: '4px',
              transition: 'opacity 0.2s ease'
            }}
          >
            VIEW FULL LEADERSHIP PROFILES →
          </Link>
        </div>

      </div>

      <style>{`
        .leaders-grid > div:hover .leader-img-zoom {
          transform: scale(1.05);
        }
        @media (max-width: 991px) {
          .leaders-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .leaders-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
