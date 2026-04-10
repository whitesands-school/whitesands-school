'use client';

import { useState, useEffect, ReactNode } from 'react';

/**
 * Forces a full remount of children when the browser restores this page from
 * the back/forward cache (bfcache). Chrome, Firefox, and Brave freeze the JS
 * heap on navigation and thaw it on swipe-back — React useEffect hooks don't
 * re-run and Framer Motion loses its internal state. Listening for the
 * pageshow event with persisted:true is the standard way to detect this.
 *
 * Changing the key causes React to unmount + remount the entire subtree,
 * giving every component a clean slate. display:contents makes the wrapper
 * invisible to the layout engine.
 */
export function BfcacheFix({ children }: { children: ReactNode }) {
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setMountKey((k) => k + 1);
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <div key={mountKey} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
