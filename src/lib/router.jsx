import React, { createContext, useContext, useState, useEffect } from 'react';
import { anchorDuration } from './scrollPace';

const RouterContext = createContext(null);
const BASE = import.meta.env.BASE_URL || '/';

function normalizePath(rawPath) {
  if (!rawPath) return '/';
  let path = rawPath.split('#')[0] || '/';
  const baseNoTrailing = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (baseNoTrailing && (path === baseNoTrailing || path.startsWith(baseNoTrailing + '/'))) {
    path = path.slice(baseNoTrailing.length);
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path || '/';
}

function scrollToHash(hash) {
  if (!hash) return;
  const targetId = hash.startsWith('#') ? hash : `#${hash}`;
  const el = document.querySelector(targetId);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  const dist = Math.abs(targetY - window.scrollY);
  const dur = anchorDuration(dist);
  if (window.lenis) {
    window.lenis.scrollTo(el, {
      duration: dur,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lock: false
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function withBase(href) {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }
  const baseNoTrailing = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (href.startsWith('/')) {
    return `${baseNoTrailing}${href}`;
  }
  return `${baseNoTrailing}/${href}`;
}

export function assetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return BASE.endsWith('/') ? `${BASE}${cleanPath}` : `${BASE}/${cleanPath}`;
}

export function RouterProvider({ children }) {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
      if (window.location.hash) {
        setTimeout(() => scrollToHash(window.location.hash), 150);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle initial hash on page load / return visit
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      let attempts = 0;
      const pollTarget = () => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          scrollToHash(window.location.hash);
        } else if (attempts < 15) {
          attempts++;
          setTimeout(pollTarget, 150);
        }
      };
      setTimeout(pollTarget, 300);
    }
  }, []);

  const navigate = (href) => {
    const hashIndex = href.indexOf('#');
    const hasHash = hashIndex !== -1;
    const pathPart = hasHash ? href.slice(0, hashIndex) : href;
    const hashPart = hasHash ? href.slice(hashIndex) : '';

    const targetPath = normalizePath(pathPart || (href.startsWith('#') ? pathname : '/'));

    // If staying on the same page with a hash, smooth scroll directly
    if (hasHash && targetPath === pathname) {
      const targetUrl = withBase(href);
      window.history.pushState(null, '', targetUrl);
      scrollToHash(hashPart);
      return;
    }

    // Scroll to top instantly before loading new page content if no hash
    if (!hasHash) {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }

    const targetUrl = withBase(href);
    window.history.pushState(null, '', targetUrl);
    setPathname(targetPath);

    // If coming from another page with a hash, scroll once the target element renders
    if (hasHash) {
      let attempts = 0;
      const pollTarget = () => {
        const el = document.querySelector(hashPart);
        if (el) {
          scrollToHash(hashPart);
        } else if (attempts < 20) {
          attempts++;
          setTimeout(pollTarget, 100);
        }
      };
      setTimeout(pollTarget, 250);
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({ href, children, activeClassName, className = '', style = {}, ...props }) {
  const { pathname, navigate } = useRouter();
  
  const handleClick = (e) => {
    // Support modifier click formats
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    
    // External links
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  const isActive = pathname === normalizePath(href);
  const combinedClass = [className, isActive ? activeClassName : ''].filter(Boolean).join(' ');
  const targetHref = withBase(href);

  return (
    <a href={targetHref} onClick={handleClick} className={combinedClass} style={style} {...props}>
      {children}
    </a>
  );
}

