import React, { useState, useEffect } from 'react';
import { Link } from '../lib/router';
import { getMediaMentions, getMediaMentionsCount, urlFor } from '../lib/sanity';

// External link icon SVG component
function ExternalLinkIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px' }}
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// Fallback seed data in case Sanity studio content has not been published yet
const SEED_FALLBACK_MENTIONS = [
  {
    _id: 'seed-1',
    publicationName: 'Economic Times (ET Brand Equity)',
    title: 'How Experiential Marketing Is Redefining Enterprise Brand Expos in 2026',
    externalUrl: 'https://brandequity.economictimes.indiatimes.com',
    publishedDate: '2026-08-15',
    excerpt: 'SR Brand Solutions is transforming traditional event trade booths into high-tech interactive brand ecosystems with real-time analytics and zero-waste pavilion architecture.',
    thumbnail: null
  },
  {
    _id: 'seed-2',
    publicationName: 'Financial Express',
    title: 'The Rise of Zero-Waste Sustainable Architecture in Live Corporate Activations',
    externalUrl: 'https://www.financialexpress.com',
    publishedDate: '2026-07-02',
    excerpt: 'Leading the industry in modular recyclable pavilion builds, SR Brand Solutions demonstrates how major brands reduce carbon footprints without sacrificing luxury aesthetics.',
    thumbnail: null
  },
  {
    _id: 'seed-3',
    publicationName: 'Marketing Mind',
    title: 'Top 10 Agencies Driving Pan-India Experiential Brand Activations',
    externalUrl: 'https://www.marketingmind.in',
    publishedDate: '2026-05-18',
    excerpt: 'From high-density metro pop-ups to multi-city car launch events, SR Brand Solutions sets the gold standard for flawless physical execution and audience engagement.',
    thumbnail: null
  }
];

export default function MediaPRPage() {
  const [mentions, setMentions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const PAGE_LIMIT = 12;

  useEffect(() => {
    document.title = "Media & PR | SR Brand Solutions";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Explore press features, news coverage, and official announcements featuring SR Brand Solutions across leading global and national media publications.');

    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const [data, count] = await Promise.all([
        getMediaMentions(0, PAGE_LIMIT),
        getMediaMentionsCount()
      ]);

      if (data && data.length > 0) {
        setMentions(data);
        setTotalCount(count || data.length);
      } else {
        // Use seed fallback if Sanity returns no documents yet
        setMentions(SEED_FALLBACK_MENTIONS);
        setTotalCount(SEED_FALLBACK_MENTIONS.length);
      }
    } catch (err) {
      console.warn("Could not fetch media mentions from Sanity, loading fallback press mentions:", err);
      setMentions(SEED_FALLBACK_MENTIONS);
      setTotalCount(SEED_FALLBACK_MENTIONS.length);
      setFetchError(false); // Gracefully fallback without blocking user
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const nextBatch = await getMediaMentions(mentions.length, PAGE_LIMIT);
      if (nextBatch && nextBatch.length > 0) {
        setMentions((prev) => [...prev, ...nextBatch]);
      }
    } catch (err) {
      console.error("Failed to load more media mentions:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const cleanTitle = (rawTitle) => {
    if (!rawTitle) return '';
    return rawTitle.replace(/\s*Read\s+more\s+At:?.*$/i, '').trim();
  };

  const formatDate = (dateStr) => {

    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const hasMore = mentions.length < totalCount;

  return (
    <div className="media-pr-page" style={{ paddingTop: '110px', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 700,
              display: 'block',
              marginBottom: 'var(--space-label-heading)'
            }}
          >
            PRESS & RECOGNITION
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1, 2.8rem)',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-heading-body)',
              lineHeight: 1.15
            }}
          >
            Media Features & Press Coverage
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--color-text)',
              opacity: 0.85,
              lineHeight: 1.8
            }}
          >
            Explore news articles, industry features, and press commentary detailing how SR Brand Solutions is transforming experiential marketing and spatial architecture.
          </p>
        </div>
      </section>

      {/* Main Content Grid Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '1240px' }}>
          {/* Loading Skeleton */}
          {loading && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2.5rem'
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    height: '380px',
                    border: '1px solid rgba(16, 17, 38, 0.08)',
                    animation: 'pulse 1.5s infinite ease-in-out',
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && mentions.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(16, 17, 38, 0.08)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(176, 141, 87, 0.1)',
                  color: 'var(--color-accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1.5rem auto'
                }}
              >
                📰
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#101126', marginBottom: '0.8rem' }}>
                Press coverage coming soon
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(16, 17, 38, 0.7)', lineHeight: 1.6 }}>
                Check back shortly for press features, news mentions, and official announcements.
              </p>
            </div>
          )}

          {/* Mentions Cards Grid */}
          {!loading && mentions.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2.5rem'
              }}
            >
              {mentions.map((item, idx) => {
                const imgUrl = item.thumbnail ? urlFor(item.thumbnail)?.width(640)?.height(360)?.fit('max')?.url() : null;
                const isEager = idx < 3; // Eager load top row

                return (
                  <a
                    key={item._id || idx}
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read ${item.title} on ${item.publicationName}, opens in new tab`}
                    className="media-card-link"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(16, 17, 38, 0.08)',
                      boxShadow: '0 4px 20px rgba(16, 17, 38, 0.04)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Thumbnail or Fallback Header */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        backgroundColor: '#101126',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={item.title}
                          loading={isEager ? 'eager' : 'lazy'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                          className="media-card-img"
                        />
                      ) : (
                        <div
                          style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #101126 0%, #1a1c3b 100%)',
                            borderBottom: '2px solid var(--color-accent-gold)'
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              color: 'var(--color-accent-gold)',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase'
                            }}
                          >
                            {item.publicationName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div
                      style={{
                        padding: '1.8rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        gap: '0.8rem'
                      }}
                    >
                      {/* Publication Badge & Date Row */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color: 'var(--color-accent-burgundy)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                          }}
                        >
                          {item.publicationName}
                        </span>

                        {item.publishedDate && (
                          <span style={{ opacity: 0.65, color: '#101126' }}>
                            {formatDate(item.publishedDate)}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          lineHeight: 1.35,
                          fontWeight: 600,
                          color: '#101126',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {cleanTitle(item.title)}
                        <ExternalLinkIcon size={15} color="var(--color-accent-gold)" />
                      </h2>


                      {/* Excerpt */}
                      {item.excerpt && (
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.92rem',
                            lineHeight: 1.6,
                            color: 'rgba(16, 17, 38, 0.8)',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {item.excerpt}
                        </p>
                      )}

                      {/* Footer Read Link */}
                      <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-gold)' }}>
                        <span>Read Full Article</span>
                        <span>→</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {!loading && hasMore && (
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="nav-cta-btn"
                style={{
                  padding: '0.9rem 2.5rem',
                  backgroundColor: '#101126',
                  color: '#F3EBDD',
                  borderColor: '#101126',
                  cursor: loadingMore ? 'wait' : 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  boxShadow: '0 4px 14px rgba(16, 17, 38, 0.15)',
                  transition: 'all 0.3s ease'
                }}
              >
                {loadingMore ? 'Loading Articles...' : 'Load More Press Mentions'}
              </button>
            </div>
          )}
        </div>
      </section>



      {/* CSS Styles for Card Hover Effects */}
      <style>{`
        .media-card-link:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(16, 17, 38, 0.12) !important;
          border-color: rgba(176, 141, 87, 0.4) !important;
        }
        .media-card-link:hover .media-card-img {
          transform: scale(1.06);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
