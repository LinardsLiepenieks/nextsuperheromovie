import { useMemo } from 'react';

export default function LandingDotsMid() {
  // Memoize the dots array so it only generates once
  const dots = useMemo(() => {
    const dotsArray = [];
    const rows = 32;
    const cols = 32;
    const spacing = 32;

    // Center point for radial calculation
    const centerRow = (rows - 1) / 2;
    const centerCol = (cols - 1) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calculate Euclidean distance from center for circular gradient
        const distFromCenterRow = row - centerRow;
        const distFromCenterCol = col - centerCol;
        const euclideanDist = Math.sqrt(
          distFromCenterRow * distFromCenterRow +
            distFromCenterCol * distFromCenterCol
        );

        // Maximum distance from center to corner
        const maxDist = Math.sqrt(
          centerRow * centerRow + centerCol * centerCol
        );

        // Normalize distance (0 at center, 1 at edges)
        const normalizedDist = euclideanDist / maxDist;

        // Size decreases from center (classic halftone effect)
        const maxSize = 20;
        const minSize = 2;
        const sizeRange = maxSize - minSize;
        // Exponential falloff for more dramatic effect
        const sizeFactor = Math.pow(1 - normalizedDist, 1.5);
        const size = minSize + sizeRange * sizeFactor;

        // Skip dots that are too small (creates natural fade out)
        if (size < 3) {
          continue;
        }

        // Opacity also decreases from center
        const maxOpacity = 0.5;
        const minOpacity = 0.05;
        const opacityRange = maxOpacity - minOpacity;
        const opacity = minOpacity + opacityRange * sizeFactor;

        dotsArray.push({
          id: `${row}-${col}`,
          x: col * spacing,
          y: row * spacing,
          size: size,
          opacity: opacity,
        });
      }
    }

    return dotsArray;
  }, []);

  const containerSize = 32 * 32; // rows/cols * spacing = 1024px

  return (
    <div
      className="scale-50 lg:scale-100 absolute bottom-5 lg:bottom-20 -left-60 -translate-x-80 translate-y-80 lg:-translate-x-100 lg:-left-40 pointer-events-none z-0"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: 'var(--dot-color)',
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}
