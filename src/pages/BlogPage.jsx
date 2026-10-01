import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useRouter } from '../lib/router';
import { getBlogs, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { ScrollTrigger } from '../lib/gsap';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const imgUrl = value ? urlFor(value)?.url() : null;
      if (!imgUrl) return null;
      return (
        <figure style={{ margin: '1.8rem 0', borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src={imgUrl}
            alt={value.alt || 'Article visual'}
            onLoad={() => {
              if (window.lenis) window.lenis.resize();
              ScrollTrigger.refresh();
            }}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
          />
          {value.caption && (
            <figcaption style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem', textAlign: 'center' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: '1.6rem 0 1rem', color: '#101126' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '1.4rem 0 0.8rem', color: '#101126' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '1.2rem 0 0.6rem', color: '#101126' }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '1rem 0 0.5rem', color: '#101126' }}>{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '4px solid var(--color-accent-gold)', paddingLeft: '1.2rem', margin: '1.5rem 0', fontStyle: 'italic', opacity: 0.95 }}>
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p style={{ fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '1.2rem', color: 'rgba(16, 17, 38, 0.9)' }}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem', lineHeight: 1.85 }}>{children}</ul>,
    number: ({ children }) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem', lineHeight: 1.85 }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
  },
};

export default function BlogPage() {
  const { pathname } = useRouter();
  const backdropRef = useRef(null);
  const modalCardRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  useEffect(() => {
    document.title = "Insights & Blog | SR Brand Solutions";
  }, []);

  const [activeTag, setActiveTag] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const categories = ['All', 'Experiential Trends', 'Event Technology', 'Retail Innovation', 'Brand Strategy'];

  const defaultArticles = [
    {
      id: 1,
      title: "The Architecture of Engagement: Designing High-Impact Brand Pop-Ups in 2026",
      slug: "architecture-of-engagement-2026",
      tag: "Experiential Trends",
      author: "Sameer Roy",
      date: "August 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      excerpt: "Physical brand spaces are no longer just places to hand out flyers—they are immersive narrative engines that turn spectators into brand advocates.",
      content: `
        Physical brand spaces are no longer just places to hand out flyers—they are immersive narrative engines. In 2026, the brands achieving the highest ROI in live events focus heavily on spatial psychology and multi-sensory triggers.

        ### Key Principles for Modern Pop-Ups:
        1. **Spatial Storytelling:** Every meter of space should communicate a core brand value. From scent diffusion at the entrance to dynamic lighting cues as visitors move through zones.
        2. **Seamless Frictionless Tech:** Passive RFID badges and non-intrusive camera analytics allow measuring dwell times without disrupting the attendee experience.
        3. **Social Currency Amplifiers:** Build photogenic architecture specifically designed to encourage organic sharing across social platforms.
      `
    },
    {
      id: 2,
      title: "Holograms, AR & AI: Integrating Immersive Tech Into B2B Expos",
      slug: "holograms-ar-ai-b2b-expos",
      tag: "Event Technology",
      author: "Rhea Kapoor",
      date: "August 14, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      excerpt: "How emerging technologies like spatial audio, interactive projection mapping, and real-time AI analytics are transforming traditional trade show booths.",
      content: `
        Trade show pavilions used to rely solely on printed banners and brochure counters. Today, technology allows presenting complex product suites through interactive 3D holograms and spatial AR layers.

        ### Technology Stacks Transforming B2B Events:
        - **Generative AI Lead Assistance:** Instant sentiment mapping and AI bot assistants tailored to specific booth visitors.
        - **Spatial Audio Projection:** Sound zones that deliver localized voiceovers without spilling noise into adjacent booths.
        - **Kinetic LED Displays:** Motorized screens that shift shape in sync with keynote presentations.
      `
    },
    {
      id: 3,
      title: "Measuring Experiential ROI: Beyond Footfall and Impression Counts",
      slug: "measuring-experiential-roi",
      tag: "Brand Strategy",
      author: "Vikramaditya Sharma",
      date: "July 30, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      excerpt: "A practical framework for brand managers to calculate real business return on experiential activations, lead velocity, and long-term customer LTV.",
      content: `
        Chief Marketing Officers frequently ask: "How do we measure the true ROI of a physical activation?" Relying solely on estimated footfall is no longer sufficient for enterprise budgets.

        ### The Tri-Metric ROI Framework:
        1. **Direct Lead Velocity:** Immediate app downloads, QR scans, and form submissions collected on site.
        2. **Earned Media Value (EMV):** Social impressions, press mentions, and organic user-generated content calculated using standard CPM equivalencies.
        3. **Post-Event Brand Uplift:** Retargeted digital campaigns targeting event attendees to measure conversion rate improvements versus non-attendees.
      `
    },
    {
      id: 4,
      title: "Sustainable Event Production: Zero-Waste Booths & Eco Materials",
      slug: "sustainable-event-production",
      tag: "Retail Innovation",
      author: "Rhea Kapoor",
      date: "July 12, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      excerpt: "How SR Brand Solutions constructs recyclable modular pavilions without sacrificing luxury aesthetics or structural integrity.",
      content: `
        Sustainability is no longer optional in corporate event planning—it is a core demand from eco-conscious consumers and corporate sustainability mandates.

        ### Modular & Circular Design Strategies:
        - Reusable aluminum framework systems covered with biodegradable organic fabrics.
        - Energy-efficient LED light rigs reducing power consumption by up to 70%.
        - Zero single-use plastic signage replaced by digital e-ink panels and projection mapping.
      `
    }
  ];

  const [articles, setArticles] = useState(defaultArticles);

  useEffect(() => {
    let isMounted = true;
    async function loadSanityBlogs() {
      setLoading(true);
      try {
        const sanityDocs = await getBlogs();
        if (isMounted && Array.isArray(sanityDocs) && sanityDocs.length > 0) {
          const mapped = sanityDocs.map((doc, idx) => {
            const imageUrl = doc.mainImage ? urlFor(doc.mainImage)?.url() : doc.image;
            const formattedDate = doc.publishedAt 
              ? new Date(doc.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : (doc.date || '2026');

            return {
              id: doc._id || idx,
              title: doc.title,
              slug: doc.slug || `post-${idx + 1}`,
              tag: doc.tag || 'Brand Strategy',
              author: doc.author || 'SR Brand Solutions',
              date: formattedDate,
              readTime: doc.readTime || '5 min read',
              image: imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
              excerpt: doc.excerpt || '',
              body: doc.body || null,
              content: doc.content || ''
            };
          });
          setArticles(mapped);
          setFetchError(false);
        }
      } catch (err) {
        console.warn('[Sanity CMS] Could not fetch blogs from Sanity:', err);
        setFetchError(true);
      } finally {
        if (isMounted) {
          setLoading(false);
          requestAnimationFrame(() => {
            if (window.lenis) window.lenis.resize();
            ScrollTrigger.refresh();
          });
        }
      }
    }
    loadSanityBlogs();
    return () => { isMounted = false; };
  }, []);

  // Sync scroll locking, Lenis state, Escape key, and Focus Trap when modal is open
  useEffect(() => {
    if (selectedArticle) {
      lastFocusedElementRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      // Focus close button on open
      requestAnimationFrame(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      });

      // Escape key listener & focus trap
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleCloseModal();
        } else if (e.key === 'Tab' && modalCardRef.current) {
          const focusables = modalCardRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length > 0) {
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        if (window.lenis) {
          window.lenis.start();
          window.lenis.resize();
        }
        ScrollTrigger.refresh();
        if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
          lastFocusedElementRef.current.focus();
        }
      };
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
      ScrollTrigger.refresh();
    }
  }, [selectedArticle]);

  // Check URL slug parameter for direct links like /insights/some-slug or /blog/some-slug
  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length >= 2 && (parts[0] === 'insights' || parts[0] === 'blog')) {
      const targetSlug = parts[1];
      const match = articles.find(a => a.slug === targetSlug || a.id === targetSlug);
      if (match) {
        setSelectedArticle(match);
      }
    } else if (parts.length === 1 && (parts[0] === 'insights' || parts[0] === 'blog')) {
      setSelectedArticle(null);
    }
  }, [pathname, articles]);

  const filtered = activeTag === 'All' ? articles : articles.filter(a => a.tag === activeTag);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleOpenArticle = (item) => {
    setSelectedArticle(item);
    if (item.slug) {
      window.history.pushState(null, '', `/insights/${item.slug}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    window.history.pushState(null, '', '/insights');
  };

  // Backdrop click scoped strictly to backdrop element (prevents drag/selection mouseup closes)
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      handleCloseModal();
    }
  };

  return (
    <div className="blog-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* Header Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
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
            KNOWLEDGE & PERSPECTIVES
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Insights, Trends & Experiential Strategy
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            Thought leadership and strategic breakdowns from our team of spatial architects, event producers, and experiential marketers.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Articles */}
      <section className="section-padding">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}>
            {categories.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  border: activeTag === tag ? '2px solid var(--color-accent-burgundy)' : '1px solid rgba(16, 17, 38, 0.2)',
                  backgroundColor: activeTag === tag ? 'var(--color-accent-burgundy)' : 'transparent',
                  color: activeTag === tag ? '#F3EBDD' : 'var(--color-text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.7 }}>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>Loading Insights from Sanity CMS...</div>
            </div>
          ) : (
            /* Grid */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.5rem'
            }}>
              {filtered.map((item) => (
                <article key={item.id} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(16,17,38,0.08)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      onLoad={() => {
                        if (window.lenis) window.lenis.resize();
                        ScrollTrigger.refresh();
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent-gold)', textTransform: 'uppercase' }}>
                      <span>{item.tag}</span>
                      <span style={{ color: 'rgba(16, 17, 38, 0.5)' }}>{item.readTime}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.8rem', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(16, 17, 38, 0.75)', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
                      {item.excerpt}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(16,17,38,0.08)', paddingTop: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>By {item.author} • {item.date}</span>
                      <button
                        onClick={() => handleOpenArticle(item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-accent-burgundy)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Read Article →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent-gold)', fontWeight: 700, display: 'block', marginBottom: '0.8rem' }}>
            THE BRAND EDGE NEWSLETTER
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1rem' }}>
            Stay Ahead of Experiential Marketing Trends
          </h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2rem' }}>
            Get monthly strategic breakdowns, event technology reviews, and experiential case studies delivered directly to your inbox.
          </p>

          {subscribed ? (
            <div style={{ backgroundColor: 'rgba(176, 141, 87, 0.2)', border: '1px solid var(--color-accent-gold)', padding: '1rem 2rem', borderRadius: '8px', color: '#F3EBDD' }}>
              ✓ Thank you for subscribing to The Brand Edge!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your corporate email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{
                  flexGrow: 1,
                  minWidth: '260px',
                  padding: '0.9rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(243, 235, 221, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#F3EBDD',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="nav-cta-btn"
                style={{
                  padding: '0.9rem 2rem',
                  backgroundColor: 'var(--color-accent-gold)',
                  borderColor: 'var(--color-accent-gold)',
                  color: '#101126',
                  fontWeight: 700
                }}
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Article Detail Modal View — Rendered via React Portal to document.body */}
      {selectedArticle && createPortal(
        <div
          ref={backdropRef}
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(16, 17, 38, 0.88)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            ref={modalCardRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedArticle.title}
            style={{
              backgroundColor: '#F3EBDD',
              color: '#101126',
              borderRadius: '20px',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header Bar */}
            <div style={{
              padding: '1.5rem 2rem 1.2rem 2rem',
              borderBottom: '1px solid rgba(16, 17, 38, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              backgroundColor: '#F3EBDD',
              zIndex: 2,
              flexShrink: 0
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-accent-burgundy)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  {selectedArticle.tag} • {selectedArticle.date}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: 0, lineHeight: 1.25, color: '#101126', maxWith: '680px' }}>
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleCloseModal}
                aria-label="Close article modal"
                style={{
                  background: 'rgba(16, 17, 38, 0.08)',
                  border: 'none',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  color: '#101126',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: '1rem',
                  transition: 'background 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            {/* Independently Scrollable Body Region */}
            <div
              ref={scrollContainerRef}
              data-lenis-prevent
              tabIndex={0}
              style={{
                flex: 1,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                padding: '2rem 2rem 3.5rem 2rem',
                outline: 'none'
              }}
            >
              {selectedArticle.image && (
                <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', maxHeight: '380px' }}>
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    onLoad={() => {
                      if (window.lenis) window.lenis.resize();
                      ScrollTrigger.refresh();
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(16, 17, 38, 0.92)' }}>
                {selectedArticle.body && Array.isArray(selectedArticle.body) ? (
                  <PortableText value={selectedArticle.body} components={portableTextComponents} />
                ) : (
                  <div style={{ whiteSpace: 'pre-line' }}>{selectedArticle.content}</div>
                )}
              </div>

              <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(16, 17, 38, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.75 }}>Written by {selectedArticle.author}</span>
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: '0.65rem 1.6rem',
                    backgroundColor: 'var(--color-accent-burgundy)',
                    color: '#F3EBDD',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Back to All Insights
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
