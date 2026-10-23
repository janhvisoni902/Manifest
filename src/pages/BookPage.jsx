import React, { useState, useEffect } from 'react';




// Environment variables (Vite)
const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID;
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;

// Helper to get stored UTM data from sessionStorage
const getUtmData = () => {
  try {
    const stored = sessionStorage.getItem('utmData');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    need: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Load UTM data once (already stored globally on any page load)
  const utm = getUtmData();

  // Validation helpers
  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Invalid email format';
    if (!form.company.trim()) err.company = 'Company is required';
    if (!form.need) err.need = 'Select what you need most';
    if (form.website.trim()) {
      if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\/?#].*)?$/.test(form.website)) {
        err.website = 'Invalid website URL';
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      fields: [
        { name: 'firstname', value: form.name },
        { name: 'email', value: form.email },
        { name: 'company', value: form.company },
        { name: 'website', value: form.website },
        { name: 'what_do_you_need_most', value: form.need },
        { name: 'notes', value: form.notes }
      ],
      context: {
        pageUri: window.location.href,
        pageName: 'Book Strategy Call',
        ...utm
      }
    };

    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      console.warn('HubSpot IDs missing; skipping submission');

      setStep(2);
      return;
    }

    try {
      const resp = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      if (!resp.ok) throw new Error('HubSpot response not ok');

      setStep(2);
    } catch (err) {
      console.error('HubSpot submission error', err);
      setSubmitError('Submission failed. You can retry or continue anyway.');
    }
  };

  // Load Calendly script when step 2
  useEffect(() => {
    if (step === 2 && CALENDLY_URL) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [step]);

  // Listen for Calendly scheduling event
  useEffect(() => {
    const handler = (e) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data && e.data.event && e.data.event === 'calendly.event_scheduled') {
        setStep(3);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const renderForm = () => (
    <form onSubmit={handleSubmit} style={{ maxWidth: '480px', width: '100%' }} noValidate>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem' }}>Name *</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
          style={{ width: '100%', fontSize: '16px', padding: '0.5rem' }} />
        {errors.name && <div style={{ color: '#f88', fontSize: '0.85rem' }}>{errors.name}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>Work Email *</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
          style={{ width: '100%', fontSize: '16px', padding: '0.5rem' }} />
        {errors.email && <div style={{ color: '#f88', fontSize: '0.85rem' }}>{errors.email}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="company" style={{ display: 'block', marginBottom: '0.25rem' }}>Company *</label>
        <input id="company" name="company" type="text" value={form.company} onChange={handleChange}
          style={{ width: '100%', fontSize: '16px', padding: '0.5rem' }} />
        {errors.company && <div style={{ color: '#f88', fontSize: '0.85rem' }}>{errors.company}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="website" style={{ display: 'block', marginBottom: '0.25rem' }}>Website (optional)</label>
        <input id="website" name="website" type="url" value={form.website} onChange={handleChange}
          placeholder="https://example.com"
          style={{ width: '100%', fontSize: '16px', padding: '0.5rem' }} />
        {errors.website && <div style={{ color: '#f88', fontSize: '0.85rem' }}>{errors.website}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="need" style={{ display: 'block', marginBottom: '0.25rem' }}>What do you need most? *</label>
        <select id="need" name="need" value={form.need} onChange={handleChange}
          style={{ width: '100%', fontSize: '16px', padding: '0.5rem' }}>
          <option value="">-- Select --</option>
          <option>More leads from ads</option>
          <option>Better ads / creative</option>
          <option>Website or landing page</option>
          <option>Google & AI search</option>
          <option>CRM / automation</option>
          <option>Faster lead follow-up</option>
          <option>Not sure, need the full system</option>
        </select>
        {errors.need && <div style={{ color: '#f88', fontSize: '0.85rem' }}>{errors.need}</div>}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.25rem' }}>Anything else (optional)</label>
        <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange}
          style={{ width: '100%', fontSize: '16px', padding: '0.5rem' }} />
      </div>
      {submitError && <div style={{ color: '#f44', marginBottom: '1rem' }}>{submitError}</div>}
      <button type="submit" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', background: '#fff', color: '#0F1017', border: 'none', borderRadius: '4px' }}>Continue to pick a time</button>
    </form>
  );

  const renderCalendly = () => (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      {CALENDLY_URL ? (
        <div className="calendly-inline-widget"
          data-url={`${CALENDLY_URL}?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`}
          style={{ minWidth: '320px', height: '630px' }} />
      ) : (
        <p>Calendly link not configured. Contact support.</p>
      )}
    </div>
  );

  const renderSuccess = () => (
    <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>You're booked. A calendar invite is on its way to your inbox.</p>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0F1017',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 2rem 80px',
      textAlign: 'center',
      boxSizing: 'border-box',
      overflowX: 'clip'
    }}>
      <div style={{ maxWidth: '640px' }}>
        <h1 style={{ fontFamily: 'var(--font-intro, sans-serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 1.5rem 0' }}>Book a Strategy Call</h1>
        {step === 1 && renderForm()}
        {step === 2 && renderCalendly()}
        {step === 3 && renderSuccess()}
        {step === 1 && submitError && (
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setStep(2)} style={{ marginRight: '0.5rem', background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '0.5rem 1rem' }}>Continue anyway</button>
            <button onClick={handleSubmit} style={{ background: '#fff', color: '#0F1017', border: 'none', padding: '0.5rem 1rem' }}>Retry</button>
          </div>
        )}
      </div>
    </div>
  );
}

