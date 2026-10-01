import React, { useState } from 'react';

export default function ClosingCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email) {
      setStatus({ type: 'error', message: 'Name and Email are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const baseUrl = rawBaseUrl.replace(/\/+$/, '');
      const response = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your strategy call request has been submitted successfully.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || `Submission failed (${response.status}). Please try again.`
        });
      }
    } catch (err) {
      console.error('API submission error:', err);
      setStatus({
        type: 'error',
        message: 'Unable to connect to server. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials-and-contact"
      style={{
        padding: '120px 2.5rem',
        backgroundColor: '#0F1017',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Testimonials Header & Quotes */}
        <div style={{ marginBottom: '5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            — TESTIMONIALS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-intro)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: '0 0 3.5rem 0'
            }}
          >
            CLIENT TESTIMONIALS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3vw'
            }}
          >
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                paddingTop: '1.5rem'
              }}
            >
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: '0 0 1.2rem 0'
                }}
              >
                "Manifest redesigned our paid acquisition architecture from scratch. We scaled cold ad spend 4x while improving ROAS."
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase'
                }}
              >
                FOUNDER & CEO · E-COMMERCE BRAND
              </span>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                paddingTop: '1.5rem'
              }}
            >
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: '0 0 1.2rem 0'
                }}
              >
                "The VSL and high-converting funnel sequence completely transformed our customer acquisition economics."
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase'
                }}
              >
                MANAGING DIRECTOR · ENTERPRISE SERVICES
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start'
          }}
        >
          {/* Left Messaging */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.6)',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              — INITIATE GROWTH
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-intro)',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              SCHEDULE A STRATEGY CALL
            </h3>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0
              }}
            >
              Direct partner access. Data-led, predictable scaling tailored to high-margin revenue businesses.
            </p>
          </div>

          {/* Right Lead Form */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '2.5rem 2rem'
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Name Field */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="form-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    fontFamily: 'inherit',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="form-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    fontFamily: 'inherit',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Phone & Company Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label htmlFor="form-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      fontFamily: 'inherit',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="form-company" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="form-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      fontFamily: 'inherit',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Status Message */}
              {status.message && (
                <div
                  role="alert"
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    backgroundColor: status.type === 'success' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(198, 40, 40, 0.2)',
                    color: status.type === 'success' ? '#81c784' : '#e57373',
                    border: `1px solid ${status.type === 'success' ? '#4caf50' : '#f44336'}`
                  }}
                >
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  borderRadius: '9999px',
                  backgroundColor: isSubmitting ? 'gray' : '#FFFFFF',
                  color: '#0F1017',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  fontSize: '0.82rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SCHEDULE STRATEGY CALL →'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
