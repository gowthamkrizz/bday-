import React, { useEffect, useRef } from 'react';

/**
 * Romantic interactive cursor trail: emits tiny pastel hearts and sparkles
 * as the user moves their mouse or touches the screen.
 */
export const RomanticCursor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastTime = 0;
    const symbols = ['💖', '✨', '🌸', '💕', '⭐', '💗'];

    const spawnParticle = (x, y) => {
      const particle = document.createElement('span');
      particle.className = 'cursor-sparkle-trail';
      particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      const size = 12 + Math.random() * 12;

      particle.style.left = `${x + offsetX}px`;
      particle.style.top = `${y + offsetY}px`;
      particle.style.fontSize = `${size}px`;

      container.appendChild(particle);

      // Remove after animation completes
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime > 60) { // Throttle to maintain 60fps smoothness
        spawnParticle(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    const handleTouchMove = (e) => {
      const now = Date.now();
      if (now - lastTime > 75 && e.touches.length > 0) {
        spawnParticle(e.touches[0].clientX, e.touches[0].clientY);
        lastTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <div ref={containerRef} className="cursor-particles-layer" aria-hidden="true" />;
};
