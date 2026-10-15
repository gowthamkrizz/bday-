import confetti from "canvas-confetti";

let heartShape = null;
try {
  if (typeof confetti.shapeFromPath === 'function') {
    heartShape = confetti.shapeFromPath({
      path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    });
  }
} catch (e) {
  heartShape = null;
}

/**
 * Triggers a romantic heart and pastel sparkle confetti celebration
 */
export const triggerRomanticConfetti = () => {
  try {
    // Pastel romantic palette
    const colors = ["#FF6F9F", "#FFD6E7", "#E6DFFF", "#FFCBA4", "#FFE082", "#FF3366"];
    const shapes = heartShape ? [heartShape, "circle"] : ["circle", "square"];

    // Center burst
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      shapes: shapes,
      scalar: 1.4,
      ticks: 200,
      gravity: 0.8
    });

    // Side fireworks
    setTimeout(() => {
      try {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: colors,
          shapes: shapes,
          scalar: 1.2
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: colors,
          shapes: shapes,
          scalar: 1.2
        });
      } catch (err) {}
    }, 250);
  } catch (err) {
    console.warn("Romantic confetti error ignored:", err);
  }
};

/**
 * Continuous gentle sparkle rain for proposals and cake wishes
 */
export const triggerSparkleRain = (duration = 3000) => {
  const end = Date.now() + duration;
  const colors = ["#FF6F9F", "#FFD6E7", "#FFE082", "#FFF9F5"];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      scalar: 1.1,
      ticks: 150
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      scalar: 1.1,
      ticks: 150
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
