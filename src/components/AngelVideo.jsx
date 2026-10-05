import React, { useEffect, useRef } from 'react';

/**
 * AngelVideo: full-viewport angel intro video (/videos/intro-reveal.mp4).
 * Plays once, muted, as soon as `play` is true, then calls `onEnded`.
 * Falls back to `onEnded` if autoplay is blocked, the file fails to load,
 * or the video stalls past `maxDurationMs`.
 */
export default function AngelVideo({ play, onEnded, maxDurationMs = 15000 }) {
  const videoRef = useRef(null);
  const endedRef = useRef(false);

  useEffect(() => {
    if (!play) return;
    const video = videoRef.current;
    if (!video) return;

    endedRef.current = false;
    const finish = () => {
      if (endedRef.current) return;
      endedRef.current = true;
      if (onEnded) onEnded();
    };

    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);

    video.currentTime = 0;
    const p = video.play();
    if (p !== undefined) p.catch(finish);

    const failsafe = setTimeout(finish, maxDurationMs);

    return () => {
      video.removeEventListener('ended', finish);
      video.removeEventListener('error', finish);
      clearTimeout(failsafe);
    };
  }, [play, onEnded, maxDurationMs]);

  return (
    <div
      id="angel-video-stage"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src="/videos/intro-reveal.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'grayscale(100%) contrast(120%) brightness(0.88)',
          display: 'block'
        }}
      />
    </div>
  );
}
