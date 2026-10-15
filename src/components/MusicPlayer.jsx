import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { config } from '../config';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Initialize audio instance once
    romanticAudio.init(config.audio.src);

    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // Show friendly hint after 3 seconds if visitor hasn't started audio yet
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleToggle = async () => {
    setShowTooltip(false);
    await romanticAudio.toggle();
  };

  return (
    <div className="audio-player-control">
      {showTooltip && !isPlaying && (
        <div className="audio-tooltip" role="status">
          Tap for romantic music 🎵
        </div>
      )}
      <button
        onClick={handleToggle}
        className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={isPlaying ? "Pause background romantic music" : "Play romantic background music"}
        title={isPlaying ? "Mute music" : "Play romantic music"}
      >
        <span className="music-pulse-ring" />
        {isPlaying ? (
          <Volume2 size={20} className="music-icon" />
        ) : (
          <VolumeX size={20} className="music-icon" />
        )}
      </button>
    </div>
  );
};
