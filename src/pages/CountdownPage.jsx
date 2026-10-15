import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, PartyPopper } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { config } from '../config';

export const CountdownPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let target = new Date(config.birthdayDate);

      // Current year target
      const currentYearTarget = new Date(
        now.getFullYear(),
        target.getMonth(),
        target.getDate(),
        target.getHours() || 0,
        target.getMinutes() || 0,
        target.getSeconds() || 0
      );

      // Check if today is the birthday (same month & day)
      const isToday =
        now.getDate() === target.getDate() &&
        now.getMonth() === target.getMonth();

      let diff = currentYearTarget.getTime() - now.getTime();

      // If the birthday date has already passed this calendar year, target next year
      if (diff < 0 && !isToday) {
        const nextYearTarget = new Date(
          now.getFullYear() + 1,
          target.getMonth(),
          target.getDate(),
          target.getHours() || 0,
          target.getMinutes() || 0,
          target.getSeconds() || 0
        );
        diff = nextYearTarget.getTime() - now.getTime();
      }

      if (isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
        isToday: false
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <PageTransition>
      <div className="countdown-container">
        {/* Glowing Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 111, 159, 0.12)',
          border: '1px solid rgba(255, 111, 159, 0.3)',
          padding: '0.4rem 1.1rem',
          borderRadius: '9999px',
          color: 'var(--rose-pink)',
          fontSize: '0.88rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <Sparkles size={16} />
          <span>For Dearest {config.recipientName}</span>
        </div>

        <h1 className="heading-display" style={{ marginBottom: '0.6rem' }}>
          {config.countdown.heading}
        </h1>
        <p className="text-subtle" style={{ maxWidth: '520px' }}>
          {config.countdown.subtext}
        </p>

        {/* Today Birthday Banner or Countdown Tiles */}
        {timeLeft.isToday ? (
          <div className="birthday-today-card">
            <PartyPopper size={48} color="var(--rose-pink)" style={{ margin: '0 auto 1rem' }} />
            <h2 className="heading-handwritten" style={{ fontSize: '2.8rem' }}>
              {config.countdown.celebrateTodayHeading}
            </h2>
            <p style={{ marginTop: '0.75rem', fontSize: '1.15rem', color: '#663B55' }}>
              {config.countdown.celebrateTodaySubtext}
            </p>
          </div>
        ) : (
          <div className="countdown-grid" role="timer" aria-label="Countdown to birthday">
            <div className="countdown-tile">
              <span className="countdown-value">{formatNumber(timeLeft.days)}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-tile">
              <span className="countdown-value">{formatNumber(timeLeft.hours)}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-tile">
              <span className="countdown-value">{formatNumber(timeLeft.minutes)}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-tile">
              <span className="countdown-value">{formatNumber(timeLeft.seconds)}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        )}

        {/* Continue Button to Page 3 */}
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => navigate('/celebration')}
            className="btn-romantic-primary"
          >
            <span>{config.countdown.nextButtonText}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </PageTransition>
  );
};
