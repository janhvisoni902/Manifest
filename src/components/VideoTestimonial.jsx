import React, { useState } from 'react';
import TestimonialModal from './TestimonialModal';

export default function VideoTestimonial({ testimonial }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    id,
    clientName = 'Client',
    company,
    quote,
    videoUrl,
    posterUrl
  } = testimonial || {};

  const hasVideo = Boolean(videoUrl && videoUrl.trim());
  const labelText = clientName
    ? `Play video testimonial from ${clientName}`
    : 'Play video testimonial';

  // Use image source in order of precedence:
  // 1. Existing posterUrl on testimonial
  // 2. Otherwise provided image (e.g. from props/data)
  // 3. Fallback placeholder
  const imageSrc = posterUrl;

  const handleOpen = () => {
    if (hasVideo) {
      setIsModalOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <>
      <div
        role={hasVideo ? 'button' : 'region'}
        tabIndex={hasVideo ? 0 : undefined}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        aria-label={hasVideo ? labelText : 'Video testimonial placeholder'}
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#16171E',
          background: 'linear-gradient(135deg, #14151B 0%, #1E202A 100%)',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          cursor: hasVideo ? 'pointer' : 'default',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxSizing: 'border-box',
          outline: 'none'
        }}
        className="testimonial-card-focus-target"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${clientName} testimonial`}
            loading="lazy"
            decoding="async"
            width="320"
            height="180"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }}
          />
        ) : (
          /* Structured dark placeholder slot */
          <div
            data-placeholder={`testimonial-placeholder-${id || 'slot'}`}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#16171E',
              background: 'linear-gradient(135deg, #14151B 0%, #1E202A 100%)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                color: 'rgba(255, 255, 255, 0.45)',
                textTransform: 'uppercase'
              }}
            >
              TESTIMONIAL
            </span>
          </div>
        )}

        {/* Play Icon Overlay if video is available */}
        {hasVideo && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.2s ease'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#181818',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)'
              }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Quote & Attribution Overlay */}
        {(clientName || quote) && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              insetInline: 0,
              padding: '0.85rem 1rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
              color: '#FFFFFF',
              pointerEvents: 'none'
            }}
          >
            {quote && (
              <p
                style={{
                  fontSize: '0.82rem',
                  margin: '0 0 0.25rem 0',
                  fontStyle: 'italic',
                  lineHeight: 1.35,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                "{quote}"
              </p>
            )}
            {clientName && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  opacity: 0.9,
                  letterSpacing: '0.02em',
                  display: 'block'
                }}
              >
                {clientName} {company ? `· ${company}` : ''}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Accessible focus ring style */}
      <style>{`
        .testimonial-card-focus-target:focus-visible {
          outline: 2px solid #B08D57 !important;
          outline-offset: 3px;
        }
      `}</style>

      {/* Testimonial Modal Popup with Active Video Player */}
      {hasVideo && (
        <TestimonialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          testimonial={testimonial}
        />
      )}
    </>
  );
}
