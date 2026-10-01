import React from 'react';
import DoorTransition from '../components/DoorTransition';
import AngelOpeningSequence from '../components/AngelOpeningSequence';
import HelloSection from '../components/mtm/HelloSection';
import WhatWeDo from '../components/mtm/WhatWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import LeadersSection from '../components/LeadersSection';
import Footer from '../components/Footer';

export default function Home({ sequenceState }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '100%', overflowX: 'hidden', backgroundColor: '#141414' }}>
      {/* 01: Dark Grey Door Transition revealing Automatic Angel Opening & Video */}
      <DoorTransition>
        <AngelOpeningSequence />
      </DoorTransition>

      {/* 02: Hello, We Are Manifest Tech Media Section */}
      <HelloSection />

      {/* 03: Pinned Horizontal Track */}
      <WhatWeDo />

      {/* 04: Why Clients Choose Us? */}
      <WhyChooseUs />

      {/* 05: Who Do We Work With? */}
      <WhoWeWorkWith />

      {/* 06: Leaders Section */}
      <LeadersSection />

      {/* 07: Global Footer */}
      <Footer />
    </div>
  );
}
