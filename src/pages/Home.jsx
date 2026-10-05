import React from 'react';
import MTMSection from '../components/mtm/MTMSection';
import HelloSection from '../components/mtm/HelloSection';
import WhatWeDo from '../components/mtm/WhatWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import Footer from '../components/Footer';

/**
 * Home page rhythm:
 *   MTM (plays on load) -> normal scroll -> Hello hold -> normal
 *   -> What We Do (point holds) -> normal -> Why Clients hold -> Who We Work With hold
 *   -> normal -> Footer
 */
export default function Home({ sequenceState }) {
  return (
    <div
      id="home-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'clip',
        backgroundColor: '#E9E9E9'
      }}
    >
      {/* 01: Manifest Tech Media (MTM) Hero (plays on load) */}
      <MTMSection sequenceState={sequenceState} />

      {/* 02: Hello, We Are Manifest Tech Media */}
      <HelloSection />

      {/* 03: What We Do (Vertical points with entrance & holds) */}
      <WhatWeDo />

      {/* 04: Why Clients Choose Us */}
      <WhyChooseUs />

      {/* 05: Who Do We Work With */}
      <WhoWeWorkWith />

      {/* 06: Footer */}
      <Footer />
    </div>
  );
}
