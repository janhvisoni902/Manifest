import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './lib/gsap';
import { RouterProvider, useRouter } from './lib/router';
import { initGlobalRefreshListeners } from './lib/refresh';
import { scaleDuration, scaleWheel } from './lib/scrollPace';

// Navigation & Structure
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import MobileStickyBar from './components/MobileStickyBar';
import { IntroContext } from './lib/introContext';
import { BookingProvider } from './lib/bookingContext';

// Pages
import Home from './pages/Home';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BookPage from './pages/BookPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import IndustryDetailPage from './pages/IndustryDetailPage';

function AppContent() {
  const { pathname } = useRouter();
  const [sequenceState, setSequenceState] = useState(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isHome = initialPath === '/' || initialPath === '/Manifest' || initialPath === '/Manifest/';

    const hasSeenIntro = (() => {
      try {
        return typeof window !== 'undefined' && window.sessionStorage.getItem('intro:seen') === '1';
      } catch {
        return false;
      }
    })();

    if (prefersReducedMotion || !isHome || hasSeenIntro) {
      return 'completed';
    }
    return 'loading';
  });

  const [displayPath, setDisplayPath] = useState(pathname);
  const [transitionState, setTransitionState] = useState('entering'); // 'entering' | 'exiting'
  const lenisRef = useRef(null);

  // Sync body data attribute and class so other components (e.g. Header/Navbar) know if intro is active
  useEffect(() => {
    const isIntro = sequenceState !== 'completed' && (pathname === '/' || pathname === '/Manifest' || pathname === '/Manifest/');
    if (typeof document !== 'undefined') {
      if (isIntro) {
        document.body.classList.add('intro-playing');
        document.body.setAttribute('data-intro-playing', 'true');
      } else {
        document.body.classList.remove('intro-playing');
        document.body.removeAttribute('data-intro-playing');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('intro-playing');
        document.body.removeAttribute('data-intro-playing');
      }
    };
  }, [sequenceState, pathname]);

  // Failsafe timer: Guarantee sequenceState transitions if frozen after 12s
  useEffect(() => {
    if (sequenceState !== 'completed') {
      const timer = setTimeout(() => {
        setSequenceState('completed');
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [sequenceState]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0.001 : scaleDuration(1.2),
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReduced,
      wheelMultiplier: prefersReduced ? 1 : scaleWheel(1),
      touchMultiplier: 2
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const cleanupRefresh = initGlobalRefreshListeners();

    // Listen to prefers-reduced-motion dynamic change
    let motionQuery = null;
    let handleMotionChange = null;
    if (typeof window !== 'undefined' && window.matchMedia) {
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      handleMotionChange = (e) => {
        if (lenisRef.current) {
          lenisRef.current.options.smoothWheel = !e.matches;
          lenisRef.current.options.duration = e.matches ? 0.001 : scaleDuration(1.2);
          lenisRef.current.options.wheelMultiplier = e.matches ? 1 : scaleWheel(1);
        }
      };
      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', handleMotionChange);
      } else if (motionQuery.addListener) {
        motionQuery.addListener(handleMotionChange);
      }
    }

    return () => {
      if (motionQuery && handleMotionChange) {
        if (motionQuery.removeEventListener) {
          motionQuery.removeEventListener('change', handleMotionChange);
        } else if (motionQuery.removeListener) {
          motionQuery.removeListener(handleMotionChange);
        }
      }
      cleanupRefresh();
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.lenis = null;
      document.body.style.overflow = '';
    };
  }, []);

  // Separate Scroll Lock / Unlock lifecycle during shimmery intro animation
  useEffect(() => {
    const lenis = lenisRef.current;

    if (sequenceState !== 'completed') {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
        lenis.resize();
      }
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }
  }, [sequenceState]);

  // Immediate scroll to top and ScrollTrigger refresh on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Page Transition Route Handler
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

  // Layout stabilization checks
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
    try {
      sessionStorage.setItem('intro:seen', '1');
    } catch {
      /* ignore */
    }
    setSequenceState('completed');
  };

  const renderActivePage = (path) => {
    if (path.startsWith('/industries/') && path !== '/industries/') {
      const slug = path.replace('/industries/', '');
      return <IndustryDetailPage slug={slug} />;
    }

    switch (path) {
      case '/book':
        return <BookPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/services':
      case '/system':
        return <ServicesPage />;
      case '/about':
      case '/founders':
        return <AboutPage />;
      case '/case-studies':
        return <CaseStudiesPage />;
      case '/':
      default:
        return (
          <Home
            sequenceState={sequenceState}
            setSequenceState={setSequenceState}
            handleGlobalSkip={handleGlobalSkip}
            onSkipAll={handleGlobalSkip}
          />
        );
    }
  };

  const isIntroActive =
    sequenceState !== 'completed' &&
    (pathname === '/' || pathname === '/Manifest' || pathname === '/Manifest/');

  return (
    <IntroContext.Provider value={{ isIntroPlaying: isIntroActive, skipIntro: handleGlobalSkip }}>
      <div className="app-container" style={{ overflowX: 'clip', width: '100%', maxWidth: '100vw' }}>
        {/* Full shimmery intro splash overlay */}
        {sequenceState === 'loading' && pathname === '/' && (
          <Intro
            onFinished={() => setSequenceState('completed')}
            onSkip={handleGlobalSkip}
          />
        )}

        <Navbar />

        <main
          style={{
            opacity: transitionState === 'entering' ? 1 : 0,
            transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            width: '100%',
            overflowX: 'clip'
          }}
        >
          {renderActivePage(displayPath)}
        </main>

        <MobileStickyBar />
      </div>
    </IntroContext.Provider>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </RouterProvider>
  );
}


