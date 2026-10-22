import React, { useEffect, useRef } from 'react';

/**
 * Helper to extract YouTube video ID from various URL formats
 */
function getYouTubeId(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

/**
 * Helper to extract Vimeo video ID
 */
function getVimeoId(url) {
  if (!url) return '';
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : '';
}

export default function TestimonialModal({ isOpen, onClose, testimonial }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const closeButtonRef = useRef(null);

  const {
    clientName = 'Client',
    company,
    quote,
    provider = 'mp4',
    videoUrl,
    posterUrl,
    captionsUrl
  } = testimonial || {};

  // Lock scroll and handle keyboard events (Escape + Tab trapping)
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll and pause Lenis smoothly
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }

    // Auto focus close button on open
    const timer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
    };
  }, [isOpen, onClose]);

  // Handle native video playback according to prefers-reduced-motion
  useEffect(() => {
    if (!isOpen || provider !== 'mp4') return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (!prefersReduced) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((_err) => {
          // If browser restricts unmuted autoplay, video controls allow one-tap playback
        });
      }
    }

    return () => {
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    };
  }, [isOpen, provider]);

  if (!isOpen || !testimonial) return null;

  const labelText = clientName
    ? `Video testimonial from ${clientName}`
    : 'Video testimonial';

  const renderVideoPlayer = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (provider === 'youtube') {
      const ytId = getYouTubeId(videoUrl);
      const autoplayParam = prefersReduced ? 0 : 1;
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=${autoplayParam}&rel=0`}
          title={labelText}
          style={{ width: '100%', height: '100%', border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (provider === 'vimeo') {
      const vmId = getVimeoId(videoUrl);
      const autoplayParam = prefersReduced ? 0 : 1;
      return (
        <iframe
          src={`https://player.vimeo.com/video/${vmId}?autoplay=${autoplayParam}&dnt=1`}
          title={labelText}
          style={{ width: '100%', height: '100%', border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        controls
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          backgroundColor: '#000000'
        }}
      >
        {captionsUrl && (
          <track kind="captions" src={captionsUrl} srclang="en" label="English" default />
        )}
      </video>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labelText}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        boxSizing: 'border-box'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: '#12131A',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '920px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar with title and close button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B08D57',
                display: 'block',
                marginBottom: '0.2rem'
              }}
            >
              TESTIMONIAL
            </span>
            <h4
              style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}
            >
              {clientName} {company ? `· ${company}` : ''}
            </h4>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close testimonial video"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#FFFFFF',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease, transform 0.2s ease'
            }}
          >
            ✕
          </button>
        </div>

        {/* Video Player Box */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#000000'
          }}
        >
          {renderVideoPlayer()}
        </div>

        {/* Quote Footer if provided */}
        {quote && (
          <div
            style={{
              padding: '1.2rem 1.5rem',
              backgroundColor: '#161720',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '0.92rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255, 0.85)'
              }}
            >
              "{quote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

