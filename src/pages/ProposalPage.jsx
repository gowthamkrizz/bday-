import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Tilt3D } from '../components/Tilt3D';
import { config } from '../config';
import { triggerRomanticConfetti, triggerSparkleRain } from '../utils/confetti';
import { romanticAudio } from '../utils/audioPlayer';
import gsap from 'gsap';

const BUCKET_LIST = [
  { id: 1, icon: '🌅', title: 'Sunset Beach Walks', desc: 'Holding hands while listening to the waves crash softly under a painted pink sky.' },
  { id: 2, icon: '✈️', title: 'Fairytale Escapes', desc: 'Traveling to magical destinations, exploring hidden cafes, and taking candid pictures.' },
  { id: 3, icon: '☕', title: 'Cozy Rainy Mornings', desc: 'Wrapped in warm blankets, sipping hot coffee, and playing our favorite playlist on repeat.' },
  { id: 4, icon: '🏡', title: 'Our Dream Sanctuary', desc: 'Building a peaceful home overflowing with love, green plants, and continuous laughter.' },
  { id: 5, icon: '💍', title: 'Loving You Forever', desc: 'Choosing you, cherishing you, and falling in love with you more every single passing day.' }
];

export const ProposalPage = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [noEscapeCount, setNoEscapeCount] = useState(0);
  const [completedPromises, setCompletedPromises] = useState({ 1: true, 2: true, 3: true, 4: true, 5: true });

  const arenaRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  const ringRef = useRef(null);

  // Animate proposal ring entrance
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ring,
        { scale: 0.6, opacity: 0, rotation: -20 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)' }
      );
    }, ring);

    return () => ctx.revert();
  }, [accepted]);

  // Handle Playful Escaping NO Button
  const escapeNoButton = useCallback(() => {
    if (accepted) return;

    const btn = noButtonRef.current;
    const arena = arenaRef.current;
    const yesBtn = yesButtonRef.current;
    if (!btn || !arena) return;

    // Viewport dimensions & boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = btn.getBoundingClientRect();
    const yesRect = yesBtn ? yesBtn.getBoundingClientRect() : null;

    // Margins from edges to prevent overflow
    const margin = 24;
    const maxX = viewportWidth - btnRect.width - margin;
    const minX = margin;
    const maxY = viewportHeight - btnRect.height - margin;
    const minY = 100; // Keep below progress header

    // Randomize position while avoiding overlapping the YES button or heading
    let randomX = minX + Math.random() * (maxX - minX);
    let randomY = minY + Math.random() * (maxY - minY);

    // If too close to the YES button, nudge further away
    if (yesRect) {
      const distance = Math.hypot(randomX - yesRect.left, randomY - yesRect.top);
      if (distance < 140) {
        randomX = randomX > viewportWidth / 2 ? minX + 30 : maxX - 30;
      }
    }

    // Convert absolute screen coordinate to offset relative to arena
    const arenaRect = arena.getBoundingClientRect();
    const targetOffsetX = randomX - (arenaRect.left + (arenaRect.width / 2) - (btnRect.width / 2));
    const targetOffsetY = randomY - (arenaRect.top + 30);

    // Playful GSAP spring motion
    gsap.to(btn, {
      x: targetOffsetX,
      y: targetOffsetY,
      rotation: (Math.random() - 0.5) * 24,
      duration: 0.38,
      ease: 'back.out(1.8)',
      overwrite: 'auto'
    });

    setNoEscapeCount(prev => prev + 1);
  }, [accepted]);

  // Window resize listener to keep NO button safely inside visible area
  useEffect(() => {
    const handleResize = () => {
      const btn = noButtonRef.current;
      if (btn) {
        gsap.to(btn, { x: 0, y: 0, rotation: 0, duration: 0.3 });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // When YES is clicked
  const handleYes = () => {
    setAccepted(true);
    romanticAudio.playCelebrationSound();
    triggerRomanticConfetti();
    triggerSparkleRain(6000);
  };

  // Replay love story from Page 1
  const handleReplay = () => {
    setAccepted(false);
    setNoEscapeCount(0);
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="proposal-hero-container">
        {!accepted ? (
          <>
            {/* Romantic Heading */}
            <h1 className="heading-display" style={{ marginBottom: '0.5rem' }}>
              {config.proposal.heading}
            </h1>
            <p className="text-subtle" style={{ maxWidth: '580px', margin: '0 auto 1.5rem' }}>
              {config.proposal.subheading}
            </p>

            {/* Glowing 3D Diamond Engagement Ring Scene with Tilt3D */}
            <Tilt3D maxTilt={24} scale={1.08}>
              <div ref={ringRef} className="ring-scene" aria-hidden="true" title="3D Diamond Ring • Hover to tilt!">
                <div className="ring-glow-circle" />
                <svg
                  viewBox="0 0 100 100"
                  className="ring-svg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="40%" stopColor="#FFD54F" />
                      <stop offset="80%" stopColor="#FFA000" />
                      <stop offset="100%" stopColor="#FFF8E1" />
                    </linearGradient>
                    <linearGradient id="diamondShine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="30%" stopColor="#E1F5FE" />
                      <stop offset="70%" stopColor="#81D4FA" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                  {/* Ring Band */}
                  <circle cx="50" cy="58" r="28" fill="none" stroke="url(#goldBand)" strokeWidth="8" />
                  <circle cx="50" cy="58" r="28" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeDasharray="6 14" />
                  {/* Ring Mount */}
                  <polygon points="42,32 58,32 54,38 46,38" fill="url(#goldBand)" />
                  {/* Brilliant Diamond */}
                  <polygon points="50,14 64,26 50,34 36,26" fill="url(#diamondShine)" filter="drop-shadow(0 2px 6px rgba(129,212,250,0.8))" />
                  <polygon points="50,14 57,26 50,34 43,26" fill="#FFFFFF" opacity="0.75" />
                  {/* Diamond Sparkle Prongs */}
                  <circle cx="50" cy="14" r="2" fill="#FFFFFF" />
                  <circle cx="36" cy="26" r="1.5" fill="#FFFFFF" />
                  <circle cx="64" cy="26" r="1.5" fill="#FFFFFF" />
                </svg>
              </div>
            </Tilt3D>

            {/* The Main Question */}
            <h2
              className="heading-handwritten"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
                margin: '0.75rem 0 1.5rem',
                color: 'var(--rose-pink)',
                textShadow: '0 4px 18px rgba(255, 111, 159, 0.35)'
              }}
            >
              {config.proposal.question}
            </h2>

            {/* Buttons Arena with Escaping NO button */}
            <div ref={arenaRef} className="proposal-actions-arena">
              {/* Stationary YES Button */}
              <button
                ref={yesButtonRef}
                onClick={handleYes}
                className="btn-proposal-yes"
                aria-label="Say YES to the proposal"
              >
                <span>{config.proposal.yesButtonText}</span>
                <Heart size={24} fill="#FFFFFF" className="heart-beat-pulse" />
              </button>

              {/* Playful Escaping NO Button */}
              <button
                ref={noButtonRef}
                className="btn-proposal-no"
                onMouseEnter={escapeNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  escapeNoButton();
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  escapeNoButton();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  escapeNoButton();
                }}
                aria-label="Playful escape button"
              >
                <span>
                  {noEscapeCount === 0
                    ? config.proposal.noButtonText
                    : [
                        "Are you sure? 🙈",
                        "Nope! Destiny says YES! 💖",
                        "My heart only takes YES! 🥰",
                        "Catch me if you can! 🏃‍♀️💕",
                        "You know you want to say YES! 💍",
                        "Forever & Always YES! ❤️"
                      ][(noEscapeCount - 1) % 6]}
                </span>
              </button>
            </div>

            {noEscapeCount > 0 && (
              <p style={{
                marginTop: '1.75rem',
                color: 'var(--rose-pink)',
                fontWeight: 600,
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.6rem',
                animation: 'popIn 0.3s ease'
              }}>
                (Hint: There is only one true answer written in the stars! 💖✨)
              </p>
            )}
          </>
        ) : (
          /* YES Romantic Celebration Reveal */
          <div className="yes-celebration-container">
            <div className="celebration-heart-hero heart-beat-pulse">💖</div>

            <h1 className="heading-handwritten" style={{ fontSize: 'clamp(2.4rem, 7vw, 3.6rem)', color: 'var(--rose-pink)' }}>
              {config.proposal.celebration.title}
            </h1>

            <p style={{
              fontSize: '1.3rem',
              color: 'var(--deep-plum)',
              margin: '1.25rem auto 1.5rem',
              maxWidth: '620px',
              lineHeight: '1.8',
              fontWeight: 500
            }}>
              {config.proposal.celebration.message}
            </p>

            {/* Deeper Romantic Promise Card with Tilt3D */}
            <Tilt3D maxTilt={10} scale={1.02}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.92)',
                borderRadius: '24px',
                padding: '2rem 2.2rem',
                maxWidth: '580px',
                margin: '0 auto 1.75rem',
                border: '1.5px solid rgba(255, 111, 159, 0.35)',
                boxShadow: '0 16px 40px rgba(255, 111, 159, 0.22)'
              }}>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2rem', color: 'var(--rose-pink)', marginBottom: '0.6rem' }}>
                  "To love, honor, cherish & smile together always"
                </p>
                <p style={{ fontSize: '1.02rem', color: '#663B55', lineHeight: '1.7' }}>
                  Abirami, you are my dream come true. You make ordinary days extraordinary, and with you, my heart is completely at home. 💍💖
                </p>
              </div>
            </Tilt3D>

            {/* Our Future Romantic Bucket List Section */}
            <div style={{
              margin: '2rem auto',
              maxWidth: '620px',
              width: '100%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 250, 0.95))',
              borderRadius: '24px',
              padding: '1.75rem 1.5rem',
              border: '2px solid rgba(255, 111, 159, 0.35)',
              boxShadow: '0 12px 35px rgba(255, 111, 159, 0.15)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <span className="romantic-love-tag" style={{ fontSize: '0.85rem' }}>
                  <Sparkles size={14} color="var(--rose-pink)" />
                  Our Lifelong Journey
                </span>
                <h3 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2.2rem', color: 'var(--rose-pink)', margin: '0.4rem 0 0.2rem' }}>
                  Our Future Romantic Bucket List 🗺️✨
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#8A5C77', margin: 0 }}>
                  Tap each promise to seal it in our stars!
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
                {BUCKET_LIST.map((item) => {
                  const isChecked = !!completedPromises[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePromise(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '16px',
                        background: isChecked ? 'rgba(255, 214, 231, 0.35)' : 'rgba(255, 255, 255, 0.7)',
                        border: isChecked ? '1.5px solid var(--rose-pink)' : '1px solid rgba(255, 111, 159, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.4rem', marginTop: '-2px' }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <strong style={{ color: 'var(--deep-plum)', fontSize: '0.98rem' }}>{item.title}</strong>
                          <span style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: isChecked ? 'var(--rose-pink)' : 'transparent',
                            border: '1.5px solid var(--rose-pink)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '11px'
                          }}>
                            {isChecked ? '✓' : ''}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: '#663B55', margin: '0.2rem 0 0', lineHeight: '1.45' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, rgba(255, 214, 231, 0.9), rgba(230, 223, 255, 0.9))',
              border: '2px solid var(--rose-pink)',
              padding: '0.75rem 1.8rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--deep-plum)',
              fontSize: '1.15rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(255, 111, 159, 0.35)',
              margin: '1rem 0 2rem'
            }}>
              <Sparkles size={20} color="var(--rose-pink)" />
              <span>{config.proposal.celebration.foreverBadge}</span>
              <Sparkles size={20} color="var(--rose-pink)" />
            </div>

            {/* Replay Button */}
            <div>
              <button
                onClick={handleReplay}
                className="btn-romantic-secondary"
              >
                <RotateCcw size={18} />
                <span>{config.proposal.celebration.replayButtonText}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
