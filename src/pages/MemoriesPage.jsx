import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Heart, Sparkles, ArrowRight, Play, Video } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Tilt3D } from '../components/Tilt3D';
import { config } from '../config';
import gsap from 'gsap';

export const MemoriesPage = () => {
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const gridRef = useRef(null);
  const photos = config.memories.photos;

  // Staggered entrance animation for polaroid scrapbook cards
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.polaroid-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handleImageError = (e) => {
    // Keep image display clean if an error occurs
    e.target.style.opacity = '0.9';
  };

  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const [likes, setLikes] = useState({});

  const toggleFlip = (e, id) => {
    e.stopPropagation();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.tag?.toLowerCase().includes(activeFilter));

  const SECRET_NOTES = {
    'mem-1': "You looked so genuinely happy here. Your kindness towards every living being is what made me fall in love with your pure soul.",
    'mem-2': "If Hogwarts were real, you'd be in Gryffindor with your brave heart and magical charm that casts a spell on me every single day.",
    'mem-3': "Under the moon, the world felt quiet and peaceful. But the prettiest thing under that sky was simply sitting next to you.",
    'mem-4': "Seeing the deep love and warmth between you and your parents shows how pure, grounded, and truly loving your heart is.",
    'mem-5': "The laughter and bond you share with your sisters is priceless. Always keep that bright, silly giggle that fills every room.",
    'mem-6': "With your friends cheering around you, you were the center of all smiles. You deserve to be celebrated every single day!"
  };

  return (
    <PageTransition>
      <div className="memories-container">
        {/* Gallery Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div className="romantic-love-tag" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={15} color="var(--rose-pink)" />
            <span>Surprise 3: Our Little Memories</span>
            <span className="heart-beat-pulse">📸</span>
          </div>
          <h1 className="heading-display" style={{ marginBottom: '0.4rem', fontSize: 'clamp(2.1rem, 5vw, 2.8rem)' }}>
            {config.memories.heading}
          </h1>
          <p className="text-subtle" style={{ maxWidth: '580px', margin: '0 auto 1.25rem', fontSize: '1.05rem' }}>
            {config.memories.subheading}
          </p>

          {/* Interactive Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            margin: '1rem 0'
          }}>
            {[
              { id: 'all', label: '🌸 All Memories' },
              { id: 'family', label: '👨‍👩‍👧 Family Warmth' },
              { id: 'sister', label: '👭 Sister Bond' },
              { id: 'dreams', label: '🌙 Magical Dreams' },
              { id: 'squad', label: '🎉 Squad Party' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className="romantic-love-tag"
                style={{
                  cursor: 'pointer',
                  border: activeFilter === tab.id ? '2px solid var(--rose-pink)' : '1px solid rgba(255, 111, 159, 0.3)',
                  background: activeFilter === tab.id ? '#FFF0F6' : 'rgba(255, 255, 255, 0.85)',
                  transform: activeFilter === tab.id ? 'scale(1.05)' : 'scale(1)',
                  fontWeight: activeFilter === tab.id ? 700 : 500,
                  boxShadow: activeFilter === tab.id ? '0 6px 18px rgba(255, 111, 159, 0.3)' : 'none',
                  fontSize: '0.84rem'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p style={{ fontSize: '0.86rem', color: '#966380', fontStyle: 'italic', margin: '0.25rem 0' }}>
            ✨ Tip: Hover to tilt in 3D • Click "Flip 🔄" to read the secret note on the back!
          </p>
        </div>

        {/* 3D Polaroid Scrapbook Grid with Tilt3D and Flip */}
        <div ref={gridRef} className="scrapbook-grid">
          {filteredPhotos.map((photo, idx) => {
            const isFlipped = !!flippedCards[photo.id];
            const likeCount = likes[photo.id] || 0;

            return (
              <Tilt3D key={photo.id} maxTilt={14} scale={1.03}>
                <div
                  className={`polaroid-card ${isFlipped ? 'flipped' : ''}`}
                  style={{
                    transform: `rotate(${photo.rotation}deg)`
                  }}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedPhotoIndex(idx);
                  }}
                  aria-label={`View photo: ${photo.title}`}
                >
                  {/* Pastel Washi Tape Decor */}
                  <div className="washi-tape" />

                  <div className="polaroid-card-inner">
                    {/* Front of Polaroid */}
                    <div className="polaroid-card-front">
                      <div className="polaroid-img-wrapper">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="polaroid-img"
                          loading="lazy"
                          onError={(e) => handleImageError(e, idx)}
                        />
                      </div>

                      {/* Handwritten Caption & Interactions */}
                      <p className="polaroid-caption">{photo.title}</p>
                      <span className="polaroid-date">{photo.date}</span>

                      {/* Card Action Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.85rem',
                        paddingTop: '0.5rem',
                        borderTop: '1px dashed #FFD6E7'
                      }}>
                        <button
                          onClick={(e) => toggleFlip(e, photo.id)}
                          style={{
                            background: '#FFF0F5',
                            border: '1px solid #FFB8D2',
                            borderRadius: '12px',
                            padding: '0.25rem 0.65rem',
                            fontSize: '0.78rem',
                            color: '#B02A5B',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                          title="Flip card to read secret message"
                        >
                          Flip Note 🔄
                        </button>

                        <button
                          onClick={(e) => toggleLike(e, photo.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--rose-pink)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                          title="Send love to this memory"
                        >
                          <Heart size={16} fill={likeCount > 0 ? 'var(--rose-pink)' : 'none'} className={likeCount > 0 ? 'heart-beat-pulse' : ''} />
                          <span>{likeCount > 0 ? likeCount : 'Love'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Back of Polaroid (3D Secret Note) */}
                    <div className="polaroid-card-back">
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💌</div>
                      <h4 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.5rem', color: 'var(--rose-pink)', marginBottom: '0.5rem' }}>
                        Behind This Moment
                      </h4>
                      <p style={{
                        fontFamily: 'var(--font-handwriting)',
                        fontSize: '1.25rem',
                        color: 'var(--deep-plum)',
                        lineHeight: '1.6',
                        margin: '0 0 1rem'
                      }}>
                        "{SECRET_NOTES[photo.id] || photo.caption}"
                      </p>
                      <button
                        onClick={(e) => toggleFlip(e, photo.id)}
                        className="btn-romantic-secondary"
                        style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', borderRadius: '12px' }}
                      >
                        Back to Photo 🖼️
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>

        {/* Next Page Surprise Button */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={() => navigate('/letter')}
            className="btn-romantic-primary"
          >
            <span>{config.memories.nextButtonText}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Full-screen Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <div
            className="lightbox-overlay"
            onClick={() => setSelectedPhotoIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged photo lightbox"
          >
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="lightbox-close-btn"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close photo preview (Escape)"
              >
                <X size={20} />
              </button>

              {/* Previous Control */}
              <button
                className="lightbox-nav-btn lightbox-prev"
                onClick={handlePrev}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Next Control */}
              <button
                className="lightbox-nav-btn lightbox-next"
                onClick={handleNext}
                aria-label="Next photograph"
              >
                <ChevronRight size={28} />
              </button>

              {/* Lightbox Image / Video Box */}
              <div className="lightbox-img-box" style={{ background: photos[selectedPhotoIndex].type === 'video' ? '#000000' : '#FAF0F4' }}>
                {photos[selectedPhotoIndex].type === 'video' ? (
                  <video
                    src={photos[selectedPhotoIndex].videoSrc}
                    controls
                    autoPlay
                    playsInline
                    style={{
                      width: '100%',
                      maxHeight: '520px',
                      borderRadius: '8px',
                      outline: 'none'
                    }}
                  >
                    Your browser does not support playing this video.
                  </video>
                ) : (
                  <img
                    src={photos[selectedPhotoIndex].src}
                    alt={photos[selectedPhotoIndex].title}
                    className="lightbox-img"
                    onError={(e) => handleImageError(e, selectedPhotoIndex)}
                  />
                )}
              </div>

              {/* Lightbox Info */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem', width: '100%' }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(255, 111, 159, 0.15)',
                  color: 'var(--rose-pink)',
                  padding: '0.2rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  {photos[selectedPhotoIndex].tag}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.65rem',
                  color: 'var(--deep-plum)',
                  marginBottom: '0.35rem'
                }}>
                  {photos[selectedPhotoIndex].title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.45rem',
                  color: 'var(--rose-pink)'
                }}>
                  "{photos[selectedPhotoIndex].caption}"
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#A0758F',
                  marginTop: '0.4rem'
                }}>
                  {photos[selectedPhotoIndex].date} • Photo {selectedPhotoIndex + 1} of {photos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
