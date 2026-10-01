import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './lib/gsap';
import { RouterProvider, useRouter } from './lib/router';

// Navigation & Structure
import Footer from './components/Footer';
import Intro from './components/Intro';
import VideoReveal from './components/VideoReveal';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import OurWorkPage from './pages/OurWorkPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import IndustriesPage from './pages/IndustriesPage';
import ClientsPage from './pages/ClientsPage';
import BlogPage from './pages/BlogPage';
import MediaPRPage from './pages/MediaPRPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import SystemPage from './pages/SystemPage';
import FoundersPage from './pages/FoundersPage';

import IndustryDetailPage from './pages/IndustryDetailPage';

function AppContent() {
  const { pathname } = useRouter();
  const [sequenceState, setSequenceState] = useState(() => {
    // Bypasses intro if reduced motion preferred or on inner routes
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.location.pathname !== '/') {
      return 'completed';
    }
    return 'loading';
  });

  const [displayPath, setDisplayPath] = useState(pathname);
  const [transitionState, setTransitionState] = useState('entering'); // 'entering' | 'exiting'
  const lenisRef = useRef(null);

  // Optional failsafe timer: Guarantee sequenceState transitions if frozen after 12s
  useEffect(() => {
    if (sequenceState !== 'completed') {
      const timer = setTimeout(() => {
        setSequenceState('completed');
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [sequenceState]);

  // 1. Force manual scroll restoration and reset to top 0 on initial app load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // 1b. Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.lenis = null;
      document.body.style.overflow = '';
    };
  }, []);

  // 2. Separate Scroll Lock / Unlock lifecycle during intro & reveal animation
  useEffect(() => {
    const lenis = lenisRef.current;

    if (sequenceState !== 'completed') {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hasSeenIntro', 'true');
      }
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
        lenis.resize();
      }

      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            if (lenis) {
              lenis.scrollTo(0, { immediate: true });
              lenis.resize();
            }
            ScrollTrigger.refresh();
          });
        });
      });
    }
  }, [sequenceState]);

  // 3. Page Transition Route Handler
  useEffect(() => {
    if (pathname !== displayPath) {
      setTransitionState('exiting');
      const timer = setTimeout(() => {
        setDisplayPath(pathname);
        setTransitionState('entering');
        
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath]);

  // 4. Layout stabilization checks
  useEffect(() => {
    if (transitionState === 'entering') {
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [displayPath, transitionState]);

  const handleGlobalSkip = () => {
    setSequenceState('completed');
  };

  const renderActivePage = (path) => {
    if (path === '/insights' || path === '/blog' || path.startsWith('/insights/') || path.startsWith('/blog/')) {
      return <BlogPage />;
    }

    if (path.startsWith('/industries/') && path !== '/industries/') {
      const slug = path.replace('/industries/', '');
      return <IndustryDetailPage slug={slug} />;
    }

    switch (path) {
      case '/system':
        return <SystemPage />;
      case '/founders':
        return <FoundersPage />;
      case '/about':
        return <AboutUs />;
      case '/services':
        return <ServicesPage />;
      case '/work':
        return <OurWorkPage />;
      case '/case-studies':
        return <CaseStudiesPage />;
      case '/industries':
        return <IndustriesPage />;
      case '/clients':
        return <ClientsPage />;
      case '/media-pr':
        return <MediaPRPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/':
      default:
        return (
          <Home
            sequenceState={sequenceState}
            setSequenceState={setSequenceState}
            handleGlobalSkip={handleGlobalSkip}
          />
        );
    }
  };

  return (
    <div className="app-container" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Intro splash overlay */}
      {sequenceState === 'loading' && pathname === '/' && (
        <Intro onFinished={() => setSequenceState('completed')} />
      )}

      <main
        style={{
          opacity: transitionState === 'entering' ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        {renderActivePage(displayPath)}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
