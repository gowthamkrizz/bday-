import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, RotateCcw, Star, Cake, PartyPopper } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Tilt3D } from '../components/Tilt3D';
import { config } from '../config';
import { triggerRomanticConfetti, triggerSparkleRain } from '../utils/confetti';
import { romanticAudio } from '../utils/audioPlayer';

const WISHING_STARS = [
  { id: 1, title: 'Star of Happiness 🌟', quote: 'May every step you take bring you closer to boundless joy and bright laughter.' },
  { id: 2, title: 'Star of Serenity 🌸', quote: 'May you always feel safe, deeply respected, and wrapped in warm gentle peace.' },
  { id: 3, title: 'Star of Dreams ✨', quote: 'May your aspirations take flight and turn into your most beautiful reality.' },
  { id: 4, title: 'Star of True Love 💖', quote: 'May you always remember that you are the most precious person to my heart.' }
];

export const CelebrationPage = () => {
  const navigate = useNavigate();
  const [candles, setCandles] = useState([true, true, true]); // State for 3 individual candles
  const [wishRevealed, setWishRevealed] = useState(false);
  const [activeStar, setActiveStar] = useState(null);
  const [cakeCut, setCakeCut] = useState(false);

  const allCandlesBlown = candles.every((c) => !c);

  const handleCandleClick = (idx, e) => {
    e.stopPropagation();
    const updated = [...candles];
    updated[idx] = !updated[idx];
    setCandles(updated);
    romanticAudio.playBlowoutSound();

    if (updated.every((c) => !c)) {
      triggerRomanticConfetti();
      triggerSparkleRain(3000);
      setTimeout(() => setWishRevealed(true), 600);
    }
  };

  const handleBlowAll = () => {
    if (!allCandlesBlown) {
      setCandles([false, false, false]);
      romanticAudio.playBlowoutSound();
      triggerRomanticConfetti();
      triggerSparkleRain(3500);
      setTimeout(() => {
        setWishRevealed(true);
      }, 700);
    } else {
      setCandles([true, true, true]);
      setWishRevealed(false);
      setCakeCut(false);
    }
  };

  const handleCutCake = () => {
    setCakeCut(true);
    romanticAudio.playBlowoutSound();
    triggerRomanticConfetti();
  };

  return (
    <PageTransition>
      <div className="cake-stage-container">
        {/* Celebration Header */}
        <div className="romantic-love-tag" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={16} color="var(--rose-pink)" />
          <span>Surprise 2: A Sweet Celebration</span>
          <span className="heart-beat-pulse">🎂</span>
        </div>

        <h1 className="heading-display" style={{ marginBottom: '0.4rem', fontSize: 'clamp(2.1rem, 5vw, 2.8rem)' }}>
          {config.celebration.heading}
        </h1>
        <p className="text-subtle" style={{ maxWidth: '540px', margin: '0 auto 1.25rem', fontSize: '1.05rem' }}>
          {config.celebration.subheading}
        </p>

        {/* 3D Interactive Moving Birthday Cake with Tilt3D */}
        <Tilt3D maxTilt={18} scale={1.04}>
          <div
            className="cake-scene"
            role="region"
            aria-label="Interactive 3D birthday cake with candles"
            title="Hover to tilt cake in 3D! Tap candles to blow out."
          >
            {/* Row of 3 candles with individual interactive tap */}
            <div className="candles-row">
              {candles.map((isLit, idx) => (
                <div
                  key={idx}
                  className="candle-stick"
                  onClick={(e) => handleCandleClick(idx, e)}
                  style={{ cursor: 'pointer' }}
                  title={isLit ? "Tap candle to blow out!" : "Tap candle to relight!"}
                >
                  <div className="candle-wick" />
                  <div className={`candle-flame ${!isLit ? 'extinguished' : ''}`} />
                  <div className="candle-smoke" />
                </div>
              ))}
            </div>

            {/* Top Cake Tier */}
            <div className="cake-tier cake-tier-top" />

            {/* Bottom Cake Tier */}
            <div className="cake-tier cake-tier-bottom" />

            {/* Cake Serving Plate */}
            <div className="cake-plate" />
          </div>
        </Tilt3D>

        <p style={{
          fontSize: '0.92rem',
          color: '#8A5C77',
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          justifyContent: 'center'
        }}>
          <Sparkles size={16} color="var(--rose-pink)" />
          <span>
            {allCandlesBlown
              ? "All 3 candles blown with love! Click to relight ✨"
              : "Hover to tilt in 3D • Tap each candle or click below to make a wish!"}
          </span>
        </p>

        {/* Celebration Buttons */}
        <div style={{ margin: '1.5rem 0 1rem', display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleBlowAll}
            className="btn-romantic-primary"
          >
            <span>{allCandlesBlown ? "Relight Candles 🕯️" : "Blow Out All Candles ✨"}</span>
            {allCandlesBlown ? <RotateCcw size={18} /> : <Sparkles size={18} />}
          </button>

          {allCandlesBlown && !cakeCut && (
            <button
              onClick={handleCutCake}
              className="btn-romantic-secondary"
              style={{ animation: 'popIn 0.35s ease' }}
            >
              <span>Cut First Slice 🍰</span>
              <PartyPopper size={18} color="var(--rose-pink)" />
            </button>
          )}
        </div>

        {/* Virtual Cake Slice Celebratory Message */}
        {cakeCut && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid var(--rose-pink)',
            borderRadius: '20px',
            padding: '1.25rem 1.8rem',
            margin: '1rem auto 1.5rem',
            maxWidth: '520px',
            animation: 'popIn 0.5s var(--ease-romantic)',
            boxShadow: '0 12px 30px rgba(255, 111, 159, 0.25)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>🍰🍓✨</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--deep-plum)', fontSize: '1.3rem', marginBottom: '0.3rem' }}>
              Here is Your Special Birthday Slice!
            </h4>
            <p style={{ color: '#7A4D67', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
              Sweet, joyful, and full of warmth — just like you. Have the most wonderful birthday year ahead! 💖
            </p>
          </div>
        )}

        {/* Revealed Secret Wish Message */}
        {wishRevealed && (
          <div className="wish-revealed-card" style={{ maxWidth: '640px', width: '100%' }}>
            <Heart size={32} color="var(--rose-pink)" fill="var(--rose-pink)" className="heart-beat-pulse" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '2.4rem',
              color: 'var(--rose-pink)',
              marginBottom: '0.5rem'
            }}>
              Your Wish is Carried to the Stars ✨
            </h3>
            <p style={{
              fontSize: '1.18rem',
              color: 'var(--deep-plum)',
              lineHeight: '1.7',
              maxWidth: '560px',
              margin: '0 auto',
              fontWeight: 500
            }}>
              {config.celebration.wishRevealedMessage}
            </p>

            {/* Interactive 3D Birthday Wishing Stars */}
            <div style={{
              marginTop: '1.5rem',
              background: 'rgba(255, 255, 255, 0.82)',
              borderRadius: '18px',
              padding: '1.4rem 1.25rem',
              border: '1px solid rgba(255, 111, 159, 0.28)',
              boxShadow: '0 8px 25px rgba(255, 111, 159, 0.1)'
            }}>
              <p style={{ fontWeight: 700, color: 'var(--deep-plum)', marginBottom: '0.85rem', fontSize: '1rem' }}>
                🌟 Abirami's 4 Birthday Wishing Stars (Tap to Open):
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.65rem'
              }}>
                {WISHING_STARS.map((star) => (
                  <button
                    key={star.id}
                    onClick={() => setActiveStar(star)}
                    className="romantic-love-tag"
                    style={{
                      cursor: 'pointer',
                      border: activeStar?.id === star.id ? '2px solid var(--rose-pink)' : '1px solid rgba(255, 111, 159, 0.3)',
                      background: activeStar?.id === star.id ? '#FFF0F6' : 'rgba(255, 255, 255, 0.9)',
                      boxShadow: activeStar?.id === star.id ? '0 8px 18px rgba(255, 111, 159, 0.35)' : 'none',
                      transform: activeStar?.id === star.id ? 'scale(1.04)' : 'scale(1)',
                      transition: 'all 0.25s ease',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: '0.86rem'
                    }}
                  >
                    <span>{star.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Star Blessing Box */}
              {activeStar && (
                <div style={{
                  marginTop: '1.1rem',
                  padding: '1.1rem 1.3rem',
                  background: 'linear-gradient(135deg, #FFF9FA, #FFF2F7)',
                  borderRadius: '14px',
                  border: '1.5px dashed var(--rose-pink)',
                  animation: 'popIn 0.35s ease'
                }}>
                  <p style={{ fontWeight: 700, color: 'var(--rose-pink)', marginBottom: '0.3rem', fontSize: '0.98rem' }}>
                    {activeStar.title}
                  </p>
                  <p style={{ color: '#5B374C', fontSize: '0.94rem', margin: 0, lineHeight: '1.6' }}>
                    "{activeStar.quote}" 💖
                  </p>
                </div>
              )}
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#8A5C77',
              fontStyle: 'italic',
              marginTop: '1.25rem'
            }}>
              {config.celebration.sincereNote}
            </p>
          </div>
        )}

        {/* Continue to Memories Page */}
        <div style={{ marginTop: '2.5rem' }}>
          <button
            onClick={() => navigate('/memories')}
            className="btn-romantic-primary"
          >
            <span>{config.celebration.nextButtonText}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageTransition>
  );
};
