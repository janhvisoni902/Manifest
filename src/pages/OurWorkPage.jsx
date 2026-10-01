import React, { useState, useEffect } from 'react';
import OurWork from '../components/OurWork';
import EventGallery from '../components/EventGallery';
import { Link } from '../lib/router';

export default function OurWorkPage() {
  useEffect(() => {
    document.title = "Our Work & Portfolio | SR Brand Solutions";
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Experiential', 'Exhibitions', 'Retail Activations', 'Corporate Events'];

  const projects = [
    {
      title: "Tissot Business Summit",
      category: "Corporate Events",
      metrics: "Executive Luxury | Precision & Sophistication",
      desc: "A premium business summit crafted to reflect Tissot's legacy of precision and sophistication. Executed seamlessly with a strong focus on detail, elegance, and impact.",
      image: "/images/work-tissot.jpg"
    },
    {
      title: "Tecno Mall Activation — South India",
      category: "Experiential",
      metrics: "South India | Mall Footfall Acceleration",
      desc: "High-density mall activation and retail engagement campaign across key South Indian retail hubs, driving mass smartphone engagement and live product demos.",
      image: "/images/work-tecno.jpg"
    },
    {
      title: "Paragon Dealer Meets & Retail Launches Across",
      category: "Retail Activations",
      metrics: "Pan-India Retail | Festive Collection & Dealer Meets",
      desc: "A vibrant, pan-India activation for Paragon's Festive Collection, combining immersive brand experiences, engaging consumer interactions, dealer meets, and impactful retail launches.",
      image: "/images/work-paragon.jpg"
    },
    {
      title: "Prestige Van Activation — South India and Goa",
      category: "Retail Activations",
      metrics: "South India & Goa | Canter Showcase",
      desc: "A Prestige product showcase designed to bring Prestige's products directly to the target audience. The branded canter delivered high-visibility product displays and engaging consumer touchpoints.",
      image: "/images/work-prestige.jpg"
    },
    {
      title: "Wockhardt Doctors Day Met Gala",
      category: "Corporate Events",
      metrics: "Executive Hospitality | Doctors Day Gala",
      desc: "A grand themed evening and recognition gala celebrating Doctors Day, combining executive hospitality, immersive stage production, live performances, and premium brand experience.",
      image: "/images/work-wockhardt.jpg"
    },
    {
      title: "CEAT Dealer Meet — East",
      category: "Corporate Events",
      metrics: "East India | Channel Partner Growth",
      desc: "A high-impact CEAT Dealer Meet in East India, bringing together dealers and channel partners on an engaging platform for collaboration, recognition, and business growth.",
      image: "/images/work-ceat.jpg"
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="work-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
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
            PORTFOLIO SHOWCASE
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Extraordinary Executions & Brand Campaigns
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            Explore our curated gallery of pan-India activations, corporate galas, trade pavilions, and interactive experiential environments.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="section-padding">
        <div className="container">
          {/* Filter Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  border: activeCategory === cat ? '2px solid var(--color-accent-burgundy)' : '1px solid rgba(16, 17, 38, 0.2)',
                  backgroundColor: activeCategory === cat ? 'var(--color-accent-burgundy)' : 'transparent',
                  color: activeCategory === cat ? '#F3EBDD' : 'var(--color-text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            {filteredProjects.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                border: '1px solid rgba(16,17,38,0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(16, 17, 38, 0.85)',
                    color: '#F3EBDD',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {item.metrics}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-text)', marginBottom: '0.8rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(16, 17, 38, 0.75)', lineHeight: 1.6, flexGrow: 1 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Works component */}
      <OurWork />

      {/* Event Gallery */}
      <EventGallery />

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem', color: 'var(--color-accent-gold)' }}>
            Have a High-Stakes Event Coming Up?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '2.5rem' }}>
            Let SR Brand Solutions transform your brief into an award-winning experiential showcase.
          </p>
          <Link
            href="/contact"
            className="nav-cta-btn"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.95rem',
              borderColor: 'var(--color-accent-gold)',
              color: '#F3EBDD',
              display: 'inline-flex'
            }}
          >
            <span>Discuss Your Project</span>
            <svg className="cta-arrow" viewBox="0 0 10 10">
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
