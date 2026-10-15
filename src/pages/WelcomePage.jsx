import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Star, Gift, Smile } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Tilt3D } from '../components/Tilt3D';
import { config } from '../config';
import { romanticAudio } from '../utils/audioPlayer';
import { triggerRomanticConfetti } from '../utils/confetti';
import gsap from 'gsap';

const CHARMS = [
  { id: 1, icon: '🌸', title: 'Radiant Smile', msg: 'Your laugh is my absolute favorite sound in the whole world.' },
  { id: 2, icon: '✨', title: 'Pure Magic', msg: 'You have a gentle superpower of making everything around you brighter.' },
  { id: 3, icon: '💖', title: 'Endless Love', msg: 'Loved for exactly who you are, through every high and low.' },
  { id: 4, icon: '🎂', title: 'Sweetest Wishes', msg: 'May this year shower you with peace, health, and limitless happiness!' }
];

export const WelcomePage = () => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [typewriterText, setTypewriterText] = useState('');
  const envelopeRef = useRef(null);
  const fullText = config.welcome.typewriterIntro;

  // Gentle floating 3D animation for envelope
  useEffect(() => {
    const el = envelopeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -10,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Typewriter effect after envelope opens
  useEffect(() => {
    if (!isOpened) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isOpened, fullText]);

  const handleOpenEnvelope = () => {
    if (isOpened) {
      navigate('/celebration');
      return;
    }
    setIsOpened(true);
    romanticAudio.playBlowoutSound();
    triggerRomanticConfetti();
  };

  const handleCharmClick = (charm) => {
    setSelectedCharm(charm);
    romanticAudio.playBlowoutSound();
  };

  const handleContinue = () => {
    navigate('/celebration');
  };

  return (
    <PageTransition>
      <div className="welcome-hero-wrap">
        {/* Romantic Glowing Badge */}
        <div className="romantic-love-tag" style={{ animation: 'fadeIn 0.6s ease' }}>
          <Sparkles size={16} color="var(--rose-pink)" />
          <span>Crafted with endless love for {config.recipientName}</span>
          <span className="heart-beat-pulse">💖</span>
        </div>

        <h1 className="welcome-main-heading">
          {config.welcome.greeting}
        </h1>
        <p className="text-subtle" style={{ maxWidth: '520px', margin: '0 auto 1rem', fontSize: '1.08rem' }}>
          Someone poured their whole heart into creating this dreamy surprise world just for you.
        </p>

        {/* 3D Moving Interactive Wax Sealed Envelope */}
        <Tilt3D maxTilt={15} scale={1.03}>
          <div
            ref={envelopeRef}
            className="envelope-wrapper"
            onClick={handleOpenEnvelope}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
            }}
            aria-label={isOpened ? "Envelope opened" : "Click to open birthday surprise envelope"}
          >
            <div className="envelope-shadow" />
            <div className={`envelope-box ${isOpened ? 'opened' : ''}`}>
              {/* Flap */}
              <div className="envelope-flap" />
              {/* Wax Seal */}
              <div className="wax-seal">
                <Heart size={26} fill="#FFFFFF" className="heart-beat-pulse" />
              </div>
              {/* Letter Inside */}
              <div className="letter-inside">
                <Sparkles size={24} color="#FF6F9F" style={{ marginBottom: '0.2rem' }} />
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: isOpened ? '1.15rem' : '1.05rem',
                  fontWeight: 700,
                  color: '#663B55'
                }}>
                  {isOpened ? `For You, ${config.recipientName} 🌸` : config.welcome.envelopeLabel}
                </p>
                <span style={{ fontSize: '0.82rem', color: '#D81B60', fontWeight: 500, marginTop: '0.25rem' }}>
                  {isOpened ? "Tap below to begin celebration 💖" : "Tap heart seal to unlock ✨"}
                </span>
              </div>
              {/* Front Envelope Pocket */}
              <div className="envelope-pocket" />
            </div>
          </div>
        </Tilt3D>

        {/* Typewriter message revealed on open */}
        {isOpened && (
          <div style={{ animation: 'popIn 0.6s var(--ease-romantic)', width: '100%', maxWidth: '640px' }}>
            <div className="typewriter-text" aria-live="polite">
              "{typewriterText}"
              <span style={{ animation: 'pulseMusic 0.8s infinite', opacity: 0.7 }}>|</span>
            </div>

            {/* Interactive 3D Birthday Charms */}
            <div style={{ margin: '1rem 0' }}>
              <p style={{ fontSize: '0.88rem', color: '#8A5C77', fontWeight: 600, marginBottom: '0.75rem' }}>
                ✨ Tap a birthday charm to open a secret whisper:
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                justifyContent: 'center'
              }}>
                {CHARMS.map((charm) => (
                  <button
                    key={charm.id}
                    onClick={() => handleCharmClick(charm)}
                    className="romantic-love-tag"
                    style={{
                      cursor: 'pointer',
                      border: selectedCharm?.id === charm.id ? '2px solid var(--rose-pink)' : '1px solid rgba(255, 111, 159, 0.35)',
                      transform: selectedCharm?.id === charm.id ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: selectedCharm?.id === charm.id ? '0 8px 20px rgba(255, 111, 159, 0.3)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span>{charm.icon}</span>
                    <strong style={{ color: 'var(--deep-plum)', fontSize: '0.88rem' }}>{charm.title}</strong>
                  </button>
                ))}
              </div>

              {/* Active Charm Message Box */}
              {selectedCharm && (
                <div style={{
                  marginTop: '1rem',
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1.5px dashed var(--rose-pink)',
                  borderRadius: '16px',
                  padding: '1rem 1.4rem',
                  animation: 'popIn 0.4s var(--ease-romantic)',
                  boxShadow: '0 8px 24px rgba(255, 111, 159, 0.15)'
                }}>
                  <p style={{ fontSize: '0.98rem', color: '#663B55', fontWeight: 500, margin: 0 }}>
                    {selectedCharm.icon} <em>"{selectedCharm.msg}"</em> 💖
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{ marginTop: '1.25rem' }}>
          {!isOpened ? (
            <button
              onClick={handleOpenEnvelope}
              className="btn-romantic-primary"
            >
              <span>{config.welcome.buttonText}</span>
              <Sparkles size={18} />
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="btn-romantic-primary"
            >
              <span>Begin Your Birthday Celebration 🎂</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
