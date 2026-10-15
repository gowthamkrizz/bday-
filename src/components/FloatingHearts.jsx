import React, { useMemo } from 'react';

/**
 * Floating dreamy pastel hearts and glowing sparkle particles
 */
export const FloatingHearts = () => {
  // Generate random floating particles
  const particles = useMemo(() => {
    const items = [];
    const symbols = ["💖", "✨", "🌸", "💕", "⭐", "💗"];
    
    for (let i = 0; i < 22; i++) {
      const symbol = symbols[i % symbols.length];
      const left = Math.random() * 100;
      const size = 12 + Math.random() * 18;
      const duration = 12 + Math.random() * 16;
      const delay = Math.random() * 15;
      const opacity = 0.35 + Math.random() * 0.45;

      items.push({
        id: i,
        symbol,
        style: {
          left: `${left}%`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
          opacity: opacity
        }
      });
    }
    return items;
  }, []);

  return (
    <div className="particles-background" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="floating-heart-particle"
          style={p.style}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};
