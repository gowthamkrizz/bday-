import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FloatingHearts } from './components/FloatingHearts';
import { RomanticCursor } from './components/RomanticCursor';
import { MusicPlayer } from './components/MusicPlayer';
import { ProgressIndicator } from './components/ProgressIndicator';
import './styles/index.css';

import { WelcomePage } from './pages/WelcomePage';
import { CountdownPage } from './pages/CountdownPage';
import { CelebrationPage } from './pages/CelebrationPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { LetterPage } from './pages/LetterPage';
import { ProposalPage } from './pages/ProposalPage';

// Ensures new page opens cleanly from the top without inheriting previous scroll
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-viewport">
        {/* Interactive romantic cursor heart trail */}
        <RomanticCursor />

        {/* Floating dreamy particle background */}
        <FloatingHearts />

        {/* Global Floating Music Player in top right */}
        <MusicPlayer />

        {/* Subtle Progress Indicator header ("Your Surprise X of 5") */}
        <ProgressIndicator />

        {/* Multi-Page Routes */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/countdown" element={<Navigate to="/celebration" replace />} />
          <Route path="/celebration" element={<CelebrationPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/video" element={<Navigate to="/letter" replace />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/proposal" element={<ProposalPage />} />
          {/* Catch-all redirect to welcome */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
