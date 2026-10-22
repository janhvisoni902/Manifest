import React, { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../lib/router';

const MUTED_KEY = 'video:muted';
const PAUSED_KEY = 'video:paused';

const readSession = (key) => {
  try { return sessionStorage.getItem(key); } catch { return null; }
};
const writeSession = (key, value) => {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch { /* storage unavailable */ }
};

/**
 * AngelVideo: full-viewport angel intro video (/videos/intro-reveal.mp4).
 * Fully responsive across 16:9, ultrawide, tablet portrait, mobile portrait, and F11/native fullscreen.
 *
 * Audio: tries to start with sound; if the browser blocks that, plays muted,
 * shows a "Click/Tap for sound" hint and unmutes on the first real interaction.
 * Pauses when the tab is hidden or less than ~25% of the video is visible.
 */
export default function AngelVideo({ play, onEnded, onSkip, maxDurationMs = 15000 }) {
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const controlsRef = useRef(null);
  const endedRef = useRef(false);

  const [isMuted, setIsMuted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  // Keep the button state in sync with the real element state (browser may force a mute).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      setIsMuted(video.muted);
      if (!video.muted) setShowHint(false);
    };
    video.addEventListener('volumechange', sync);
    return () => video.removeEventListener('volumechange', sync);
  }, []);

  useEffect(() => {
    if (!play) return;
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video) return;

    let disposed = false;
    let autoPaused = false; // true only when *we* paused it (tab hidden / out of view)
    let inView = true;
    let removeUnmuteListeners = () => {};

    endedRef.current = false;
    const finish = () => {
      if (endedRef.current) return;
      endedRef.current = true;
      if (onEnded) onEnded();
    };

    // No play/pause UI exists for this video, so "show play state" keeps the
    // previous behaviour: skip ahead to the next section.
    const showPlayState = () => finish();

    const isUserPaused = () => readSession(PAUSED_KEY) === '1';

    const armFirstInteractionUnmute = () => {
      const events = ['pointerup', 'touchend', 'click', 'keydown'];
      const handler = (e) => {
        // Ignore interactions with the video's own controls (mute button).
        if (controlsRef.current && e.target instanceof Node && controlsRef.current.contains(e.target)) return;
        removeUnmuteListeners();
        if (readSession(MUTED_KEY) === '1') return;
        video.muted = false; // never call play() here
        setShowHint(false);
      };
      events.forEach((ev) => document.addEventListener(ev, handler, { capture: true }));
      removeUnmuteListeners = () => {
        events.forEach((ev) => document.removeEventListener(ev, handler, { capture: true }));
        removeUnmuteListeners = () => {};
      };
    };

    const startVideo = async () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion || isUserPaused()) return showPlayState();
      const wantsSound = readSession(MUTED_KEY) !== '1';
      video.muted = !wantsSound;
      try {
        await video.play();
      } catch {
        if (disposed) return;
        if (!wantsSound) return showPlayState();
        video.muted = true;
        try { await video.play(); } catch { if (!disposed) showPlayState(); return; }
        if (disposed) return;
        armFirstInteractionUnmute();
        setShowHint(true);
      }
    };

    const autoPause = () => {
      if (!video.paused && !video.ended) {
        autoPaused = true;
        video.pause();
      }
    };
    const autoResume = () => {
      if (!autoPaused || isUserPaused() || document.hidden || !inView) return;
      autoPaused = false;
      video.play().catch(() => {});
    };

    const onVisibility = () => (document.hidden ? autoPause() : autoResume());
    document.addEventListener('visibilitychange', onVisibility);

    let observer = null;
    if (stage && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.intersectionRatio >= 0.25;
          if (inView) autoResume();
          else autoPause();
        },
        { threshold: [0, 0.25, 0.5, 1] }
      );
      observer.observe(stage);
    }

    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);

    video.currentTime = 0;
    startVideo();

    const failsafe = setTimeout(finish, maxDurationMs);

    return () => {
      disposed = true;
      video.removeEventListener('ended', finish);
      video.removeEventListener('error', finish);
      document.removeEventListener('visibilitychange', onVisibility);
      if (observer) observer.disconnect();
      removeUnmuteListeners();
      clearTimeout(failsafe);
      video.pause();
    };
  }, [play, onEnded, maxDurationMs]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    writeSession(MUTED_KEY, next ? '1' : null);
    if (!next) setShowHint(false);
  };

  const handleSkipClick = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (onSkip) {
      onSkip();
    } else if (onEnded) {
      onEnded();
    }
  };

  return (
    <div
      id="angel-video-stage"
      ref={stageRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '100svh',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src={assetUrl('/videos/intro-reveal.mp4')}
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          filter: 'grayscale(100%) contrast(120%) brightness(0.88)',
          display: 'block'
        }}
      />

      {/* Top Right Skip Intro Button */}
      <button
        type="button"
        onClick={handleSkipClick}
        aria-label="Skip intro video"
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '9999px',
          color: 'rgba(255, 255, 255, 0.88)',
          padding: '0.45rem 1rem',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.55)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #FFFFFF';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        <span>Skip intro</span>
        <span aria-hidden="true">→</span>
      </button>

      <div
        ref={controlsRef}
        style={{
          position: 'absolute',
          left: '1.25rem',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <button
          type="button"
          className="angel-video-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          aria-pressed={isMuted}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.59 3L19 9.59 17.59 8.17 15.17 10.6 12.76 8.17 11.34 9.59 13.76 12l-2.42 2.41 1.42 1.42 2.41-2.42 2.42 2.42L19 14.41 16.59 12z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.47 4.47 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
            </svg>
          )}
        </button>

        {showHint && (
          <span
            role="status"
            style={{
              pointerEvents: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              padding: '0.45rem 0.8rem',
              borderRadius: '9999px'
            }}
          >
            {isCoarse ? 'Tap for sound' : 'Click for sound'}
          </span>
        )}
      </div>

      <style>{`
        video:fullscreen,
        video:-webkit-full-screen {
          object-fit: contain !important;
          width: 100% !important;
          height: 100% !important;
        }
        .angel-video-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          border: none;
          background-color: rgba(0, 0, 0, 0.55);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }
        .angel-video-btn:focus-visible {
          outline: 2px solid #FFFFFF;
          outline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
