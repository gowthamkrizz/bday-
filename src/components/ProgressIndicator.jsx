import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ROUTES = [
  { path: '/', step: 1, title: 'Welcome Surprise' },
  { path: '/celebration', step: 2, title: 'Birthday Celebration' },
  { path: '/memories', step: 3, title: 'Our Little Memories' },
  { path: '/letter', step: 4, title: 'A Letter From My Heart' },
  { path: '/proposal', step: 5, title: 'The Final Surprise' }
];

export const ProgressIndicator = () => {
  const location = useLocation();
  const currentRoute = ROUTES.find(r => r.path === location.pathname) || ROUTES[0];
  const currentStep = currentRoute.step;

  return (
    <nav className="surprise-progress-pill" aria-label="Surprise progress">
      <span>Your Surprise {currentStep} of {ROUTES.length}</span>
      <div className="hearts-indicator">
        {ROUTES.map((route) => {
          const isCompleted = route.step < currentStep;
          const isActive = route.step === currentStep;

          return (
            <Link
              key={route.path}
              to={route.path}
              title={route.title}
              aria-label={`Go to ${route.title}`}
              style={{ display: 'inline-flex' }}
            >
              <Heart
                size={16}
                className={`mini-step-heart ${
                  isActive ? 'active' : isCompleted ? 'completed' : 'upcoming'
                }`}
                fill={isActive || isCompleted ? 'currentColor' : 'none'}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
