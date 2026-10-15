import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Sparkles, ChevronDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Tilt3D } from '../components/Tilt3D';
import { config } from '../config';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerRomanticConfetti } from '../utils/confetti';

const TEN_REASONS = [
  { num: "01", icon: "✨", title: "Your Heart of Pure Gold", desc: "You genuinely care for everyone around you with so much warmth, empathy, and grace." },
  { num: "02", icon: "🌸", title: "Your Radiant Smile", desc: "It has the magic power to turn my heaviest days into absolute sunshine in a split second." },
  { num: "03", icon: "💕", title: "Your Laughter", desc: "The sweet, silly way you giggle when something is truly funny is music to my ears." },
  { num: "04", icon: "🦋", title: "Your Playful Spark", desc: "You find delight in small things and make even ordinary grocery runs feel like adventures." },
  { num: "05", icon: "💎", title: "Your Quiet Strength", desc: "The quiet determination and elegance with which you carry yourself through every challenge." },
  { num: "06", icon: "🌙", title: "Your Kind Eyes", desc: "Looking into your eyes feels like coming home after a long journey—safe, warm, and understood." },
  { num: "07", icon: "👨‍👩‍👧", title: "Your Love for Family", desc: "The beautiful bond and deep care you have for your parents and sisters melts my heart." },
  { num: "08", icon: "☕", title: "The Comfort of Being With You", desc: "Even in total silence, just sitting beside you is the happiest place in the universe." },
  { num: "09", icon: "🍓", title: "Your Cute Expressions", desc: "The tiny adorable pout or curious look you make when you are concentrating." },
  { num: "10", icon: "💍", title: "Simply Because You Are YOU", desc: "Flawed, perfect, radiant, silly, beautiful Abirami—I adore every single piece of you." }
];

export const LetterPage = () => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const fullText = config.letter.body;
  const [displayedText, setDisplayedText] = useState(fullText);
  const [expandedReason, setExpandedReason] = useState(null);

  const handleOpenLetter = useCallback((e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    setIsOpened(true);

    try {
      romanticAudio.playBlowoutSound();
    } catch (err) {
      console.warn('Audio blowout sound error:', err);
    }

    try {
      triggerRomanticConfetti();
    } catch (err) {
      console.warn('Confetti error:', err);
    }
  }, []);

  // Smooth typewriter reveal when opened
  useEffect(() => {
    if (!isOpened) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      return;
    }

    setDisplayedText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 4;
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
      } else {
        setDisplayedText(fullText);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpened, fullText]);

  const handleSkipAnimation = () => {
    setDisplayedText(fullText);
  };

  const toggleReason = (idx) => {
    setExpandedReason(prev => (prev === idx ? null : idx));
    try {
      romanticAudio.playBlowoutSound();
    } catch (e) {}
  };

  return (
    <PageTransition>
      <div className="letter-stage-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div className="romantic-love-tag" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={15} color="var(--rose-pink)" />
            <span>Surprise 4: Words From The Heart</span>
            <span className="heart-beat-pulse">💌</span>
          </div>
          <h1 className="heading-display" style={{ marginBottom: '0.3rem', fontSize: 'clamp(2.1rem, 5vw, 2.8rem)' }}>
            {config.letter.heading}
          </h1>
          <p className="text-subtle" style={{ fontSize: '1.05rem' }}>
            {config.letter.subheading}
          </p>
        </div>

        {/* Envelope Opening State */}
        {!isOpened ? (
          <Tilt3D maxTilt={12} scale={1.02} style={{ width: '100%', maxWidth: '520px' }}>
            <div
              className="sealed-letter-card"
              onClick={handleOpenLetter}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenLetter(e);
              }}
            >
              {/* Wax Seal Icon */}
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF94B9 0%, #FF6F9F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 10px 28px rgba(255, 111, 159, 0.45)',
                marginBottom: '1.25rem',
                border: '3px solid rgba(255, 255, 255, 0.85)'
              }}>
                <Mail size={40} className="heart-beat-pulse" />
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                color: 'var(--deep-plum)',
                marginBottom: '0.5rem'
              }}>
                A Sealed Letter for {config.recipientName}
              </h2>

              <p style={{ color: '#8A5C77', fontSize: '0.98rem', marginBottom: '1.75rem', maxWidth: '400px', lineHeight: 1.6 }}>
                Written straight from the bottom of my heart. Click the button below to break the seal and read it.
              </p>

              {/* Explicit Clickable Button with high z-index and touch-ready handler */}
              <button
                type="button"
                onClick={handleOpenLetter}
                className="btn-romantic-primary"
                style={{
                  position: 'relative',
                  zIndex: 20,
                  cursor: 'pointer',
                  padding: '1rem 2.2rem',
                  fontSize: '1.1rem'
                }}
              >
                <span>{config.letter.openButtonText}</span>
                <Heart size={20} fill="#fff" />
              </button>

              <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#A0758F' }}>
                <span>✨ Or tap anywhere on this letter to open ✨</span>
              </div>
            </div>
          </Tilt3D>
        ) : (
          /* Unfolded Parchment Letter */
          <div className="letter-unfold-anim" style={{ width: '100%', maxWidth: '720px' }}>
            <Tilt3D maxTilt={6} scale={1.01}>
              <div className="letter-parchment" onClick={handleSkipAnimation} title="Click to show entire letter immediately">
                {/* Wax Heart Seal Decor */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid rgba(255, 111, 159, 0.2)',
                  paddingBottom: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={16} color="var(--rose-pink)" />
                    <span style={{ fontSize: '0.85rem', color: '#A0758F', letterSpacing: '0.08em', fontWeight: 600 }}>
                      SPECIAL BIRTHDAY EDITION 💖
                    </span>
                  </div>
                  <Heart size={22} color="var(--rose-pink)" fill="var(--rose-pink)" className="heart-beat-pulse" />
                </div>

                {/* Salutation */}
                <h2 className="letter-salutation">
                  {config.letter.salutation}
                </h2>

                {/* Letter Body */}
                <p className="letter-body-text">
                  {displayedText}
                  {displayedText.length < fullText.length && (
                    <span style={{ animation: 'pulseMusic 0.7s infinite', opacity: 0.6, fontWeight: 'bold', color: 'var(--rose-pink)' }}>|</span>
                  )}
                </p>

                {/* Signature Block */}
                <div className="letter-signature-block">
                  <p style={{ fontSize: '1.1rem', color: '#8A5C77', marginBottom: '0.2rem' }}>
                    {config.letter.closing}
                  </p>
                  <p style={{ fontSize: '2.1rem' }}>
                    {config.letter.signature}
                  </p>
                </div>

                {/* Sweet P.S. Love Note */}
                <div style={{
                  marginTop: '2rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px dashed rgba(255, 111, 159, 0.3)',
                  textAlign: 'center'
                }}>
                  <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.55rem', color: 'var(--rose-pink)' }}>
                    "P.S. Loving you is the easiest, sweetest, and most wonderful thing in my whole life. 💖"
                  </p>
                </div>
              </div>
            </Tilt3D>
          </div>
        )}

        {/* 10 Little Things I Adore About You Section */}
        {isOpened && (
          <div style={{ marginTop: '3rem', width: '100%', maxWidth: '720px', animation: 'popIn 0.6s var(--ease-romantic)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="romantic-love-tag" style={{ marginBottom: '0.4rem' }}>
                <Sparkles size={14} color="var(--rose-pink)" />
                <span>Reasons My Heart Chose You</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2.4rem', color: 'var(--rose-pink)', margin: 0 }}>
                10 Things I Adore About You 💖
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#8A5C77', marginTop: '0.3rem' }}>
                Tap on any card to read why you are so special to me:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {TEN_REASONS.map((item, idx) => {
                const isOpen = expandedReason === idx;
                return (
                  <div
                    key={item.num}
                    onClick={() => toggleReason(idx)}
                    style={{
                      background: isOpen ? 'linear-gradient(135deg, #FFF0F6 0%, #FFF9FA 100%)' : 'rgba(255, 255, 255, 0.92)',
                      border: isOpen ? '1.5px solid var(--rose-pink)' : '1px solid rgba(255, 111, 159, 0.22)',
                      borderRadius: '16px',
                      padding: '1.1rem 1.35rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isOpen ? '0 10px 25px rgba(255, 111, 159, 0.2)' : '0 4px 12px rgba(102, 59, 85, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                        <span style={{ fontWeight: 700, color: 'var(--deep-plum)', fontSize: '1.02rem' }}>
                          <span style={{ color: 'var(--rose-pink)', marginRight: '0.4rem', fontSize: '0.9rem' }}>#{item.num}</span>
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        color="var(--rose-pink)"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px dashed rgba(255, 111, 159, 0.2)', animation: 'fadeIn 0.3s ease' }}>
                        <p style={{ color: '#5B374C', fontSize: '0.98rem', lineHeight: '1.65', margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Transition to Next Page (Proposal) */}
        {isOpened && (
          <div style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/proposal')}
              className="btn-romantic-primary"
              style={{ padding: '1rem 2.4rem', fontSize: '1.12rem' }}
            >
              <span>{config.letter.nextButtonText}</span>
              <Heart size={20} fill="#fff" />
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
