import { useMemo } from "react";
import { motion } from "framer-motion";

// Deterministic-ish pseudo-random using a seed so the layout is stable per
// render but changes entirely when the `key` prop changes (via shuffleKey).
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/**
 * BouquetDisplay
 * Props:
 *   flowerList  – array of { id, name, src } objects (may contain duplicates)
 *   bushSrc     – image src of the chosen greenery bush
 */
function BouquetDisplay({ flowerList = [], bushSrc, seed = 0 }) {
  const positions = useMemo(() => {
    const rand = seededRandom(seed + flowerList.length * 9999);
    const n = flowerList.length;
    if (n === 0) return [];

    // Flower size: scales down slightly with count so things fit
    const size = Math.max(16, Math.min(38, 52 - n * 1.8));

    // Center zone where flowers are allowed
    const X0 = 10, X1 = 90 - size;
    const Y0 = 8,  Y1 = 92 - size;

    const placed = [];

    for (let i = 0; i < n; i++) {
      let best = null;
      let attempts = 0;

      // Try up to 25 times to find a non-overlapping spot
      while (attempts < 25) {
        const x = X0 + rand() * (X1 - X0);
        const y = Y0 + rand() * (Y1 - Y0);

        // Check distance from every already-placed flower
        // Use ~85% of size as the min gap so a little overlap is allowed but it stays readable
        const minDist = size * 0.85;
        const overlaps = placed.some(
          (p) => Math.hypot(p.x - x, p.y - y) < minDist
        );

        if (!overlaps) { best = { x, y }; break; }
        if (!best) best = { x, y }; // fallback: keep first attempt
        attempts++;
      }

      placed.push({
        x: best.x,
        y: best.y,
        size,
        rotate: (rand() - 0.5) * 50, // -25° to +25°
        zIndex: Math.round(rand() * 6) + 1,
      });
    }

    return placed;
  }, [flowerList.length, seed]);

  return (
    <div className="bouquet-display">
      {/* Greenery background */}
      {bushSrc && (
        <img src={bushSrc} alt="Greenery" className="bouquet-bush" />
      )}

      {/* Flowers scattered on top */}
      {flowerList.map((flower, i) => {
        const pos = positions[i] || { x: 50, y: 50, rotate: 0, size: 18, zIndex: 1 };
        return (
          <motion.img
            key={`${flower.id}-${i}`}
            src={flower.src}
            alt={flower.name}
            className="bouquet-flower"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${pos.size}%`,
              rotate: `${pos.rotate}deg`,
              zIndex: pos.zIndex,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          />
        );
      })}
    </div>
  );
}

export default BouquetDisplay;
