import { useMemo } from 'react';

export default function LandingDotsMid() {
  // Memoize the dots array so it only generates once
  const dots = useMemo(() => {
    const dotsArray = [];
    const rows = 32;
    const cols = 32;
    const spacing = 32;
    const containerSize = 520;

    // Calculate offsets to center the dot pattern within the container
    const offsetX = (containerSize - (cols - 1) * spacing) / 2;
    const offsetY = (containerSize - (rows - 1) * spacing) / 2;

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
          x: col * spacing + offsetX,
          y: row * spacing + offsetY,
          size: size,
          opacity: opacity,
        });
      }
    }

    return dotsArray;
  }, []);

  return (
    <div className="hidden lg:block absolute bottom-0 lg:bottom-40 -left-60 -translate-x-80 translate-y-80 lg:-translate-x-100 lg:-left-40 lg:translate-y-2/3 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <div
        className=""
        style={{
          width: '520px',
          height: '520px',
        }}
      >
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
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
    </div>
  );
}
