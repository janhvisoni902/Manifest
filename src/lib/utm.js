// src/lib/utm.js
// Capture specific UTM parameters and merge with any previously stored values.
(function () {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const newUtm = {};
    for (const key of allowed) {
      const value = params.get(key);
      if (value) newUtm[key] = value;
    }
    if (Object.keys(newUtm).length) {
      // Merge with existing stored data without overwriting missing fields.
      const existing = JSON.parse(sessionStorage.getItem('utmData') || '{}');
      const merged = { ...existing, ...newUtm };
      sessionStorage.setItem('utmData', JSON.stringify(merged));
    }
  } catch (e) {
    console.warn('UTM capture error:', e);
  }
})();
