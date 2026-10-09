import React from 'react';
import { assetUrl } from '../../lib/router';

export default function FullScreenShowcase() {
  return (
    <section
      id="what-we-do-image-section"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: '#0F1017',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={assetUrl('/assets/images/what-we-do-hero.jpg')}
        alt="WHAT WE DO — Manifest Tech Media"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'grayscale(100%) contrast(105%)',
          display: 'block'
        }}
      />
    </section>
  );
}
