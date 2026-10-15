import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const PageTransition = ({ children, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // GSAP entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 16
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className={`page-container ${className}`}>
      {children}
    </main>
  );
};
