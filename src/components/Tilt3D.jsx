import React, { useRef, useCallback, useEffect } from 'react';

/**
 * High-performance 3D Parallax Tilt component for cards, photos, envelopes and interactive elements.
 * Uses requestAnimationFrame and direct DOM styling to prevent React re-renders, ensuring 100% reliable clicks
 * and buttery-smooth 60/120fps hardware-accelerated 3D motion.
 */
export const Tilt3D = ({
  children,
  className = '',
  style = {},
  maxTilt = 12,
  scale = 1.025,
  perspective = 1000,
  glare = true,
  onClick
}) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !innerRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const inner = innerRef.current;
      if (!card || !inner) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      inner.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
      inner.style.transition = 'transform 0.08s ease-out';

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
        glareRef.current.style.opacity = '0.35';
      }
    });
  }, [maxTilt, scale, perspective, glare]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    if (innerRef.current) {
      innerRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      innerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
      glareRef.current.style.transition = 'opacity 0.4s ease';
    }
  }, [perspective, glare]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-3d-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: `${perspective}px`,
        position: 'relative',
        display: 'block',
        ...style
      }}
    >
      <div
        ref={innerRef}
        className="tilt-3d-inner"
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
          willChange: 'transform'
        }}
      >
        {children}

        {/* Dynamic 3D Glare Reflection Effect */}
        {glare && (
          <div
            ref={glareRef}
            className="tilt-3d-glare"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              opacity: 0,
              zIndex: 1
            }}
          />
        )}
      </div>
    </div>
  );
};
