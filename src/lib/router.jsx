import React, { createContext, useContext, useState, useEffect } from 'react';
import { anchorDuration } from './scrollPace';

const RouterContext = createContext(null);
const BASE = import.meta.env.BASE_URL || '/';

function normalizePath(rawPath) {
  if (!rawPath) return '/';
  let path = rawPath;
  const baseNoTrailing = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (baseNoTrailing && (path === baseNoTrailing || path.startsWith(baseNoTrailing + '/'))) {
    path = path.slice(baseNoTrailing.length);
  }
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path || '/';
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
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (href) => {
    // If it's an anchor on the same page, let PopState handle it or use normal hash routing
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
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
      return;
    }

    // Scroll to top instantly before loading new page content
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }

    const targetUrl = withBase(href);
    window.history.pushState(null, '', targetUrl);
    setPathname(normalizePath(href));
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

