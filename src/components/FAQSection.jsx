import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const faqItems = [
  {
    question: 'What does Manifest Tech Media do?',
    answer:
      'We build and run revenue systems for US businesses: positioning, creative, paid ads, funnels, CRM and AI follow-up, connected so ad spend turns into booked calls.'
  },
  {
    question: 'Who do you work with?',
    answer:
      'Growing US companies that sell through a call, consultation or demo.'
  },
  {
    question: 'Do I need every service?',
    answer:
      'No. Most clients start with one part and add more as results come in.'
  },
  {
    question: 'What happens on the strategy call?',
    answer:
      "We look at your ads, funnel and follow-up, show you where you're losing leads, and tell you what to fix first."
  },
  {
    question: 'How much does it cost?',
    answer:
      'It depends on what you need. We give you a price after the call.'
  },
  {
    question: 'Do you work with startups?',
    answer:
      "Yes, once the offer is selling and there's a budget to test."
  }
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
};

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState(new Set());
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mq.matches);
      const handler = (e) => setIsReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const toggleItem = (index) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

    // Refresh ScrollTrigger so all pinned / scrub positions remain accurate
    const delay = isReducedMotion ? 20 : 300;
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, delay);
  };

  return (
    <div
      id="faq"
      className="faq-section"
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        paddingTop: '5rem',
        marginBottom: '5rem',
        maxWidth: '920px',
        margin: '0 auto 6rem auto',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header Eyebrow */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          marginBottom: '1.25rem'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase'
          }}
        >
          FREQUENTLY ASKED QUESTIONS
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-intro, sans-serif)',
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          color: '#FFFFFF',
          margin: '0 0 3rem 0',
          textTransform: 'uppercase'
        }}
      >
        COMMON QUESTIONS
      </h3>

      <div
        className="faq-accordion"
        role="region"
        aria-label="Frequently Asked Questions"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          width: '100%'
        }}
      >
        {faqItems.map((item, index) => {
          const isOpen = openIndices.has(index);
          const questionId = `faq-q-${index}`;
          const answerId = `faq-a-${index}`;

          return (
            <div
              key={item.question}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleItem(index)}
                className="faq-trigger-btn"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  padding: '1.6rem 0',
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-intro, sans-serif)',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                    color: '#FFFFFF'
                  }}
                >
                  {item.question}
                </span>

                <span
                  aria-hidden="true"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    borderRadius: '50%',
                    backgroundColor: isOpen
                      ? '#FFFFFF'
                      : 'rgba(255, 255, 255, 0.08)',
                    color: isOpen ? '#0F1017' : '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    transition: isReducedMotion ? 'none' : 'all 0.25s ease'
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: isReducedMotion
                        ? 'none'
                        : 'transform 0.25s ease'
                    }}
                  >
                    <line x1="7" y1="2" x2="7" y2="12" />
                    <line x1="2" y1="7" x2="12" y2="7" />
                  </svg>
                </span>
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                style={{
                  display: isOpen ? 'block' : 'none',
                  paddingBottom: '1.6rem'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.74)',
                    margin: 0,
                    maxWidth: '820px'
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .faq-trigger-btn:hover span:first-child {
          color: rgba(255, 255, 255, 0.85);
        }
        .faq-trigger-btn:focus-visible {
          outline: 2px solid #FFFFFF;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
