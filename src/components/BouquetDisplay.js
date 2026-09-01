import { useMemo, useRef, useState } from "react";
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
 *   flowerList      – array of { id, name, src } objects (may contain duplicates)
 *   bushSrc         – image src of the chosen greenery bush
 *   isDraggable     – enable drag interaction (customize step only), default false
 *   dragOffsets     – { [index]: { x, y } } pixel offsets applied on top of % position
 *   onFlowerDragEnd – (index, { x, y }) => void  called when a drag ends
 */
function BouquetDisplay({
  flowerList = [],
  bushSrc,
  seed = 0,
  isDraggable = false,
  dragOffsets = {},
  onFlowerDragEnd,
}) {
  const containerRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

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

        const minDist = size * 0.85;
        const overlaps = placed.some(
          (p) => Math.hypot(p.x - x, p.y - y) < minDist
        );

        if (!overlaps) { best = { x, y }; break; }
        if (!best) best = { x, y };
        attempts++;
      }

      const sizeMultiplier = 0.6 + rand() * 0.6;

      placed.push({
        x: best.x,
        y: best.y,
        size: size * sizeMultiplier,
        rotate: (rand() - 0.5) * 50,
        zIndex: Math.round(rand() * 6) + 1,
      });
    }

    return placed;
  }, [flowerList.length, seed]);

  return (
    <div className="bouquet-display" ref={containerRef}>
      {/* Greenery background */}
      {bushSrc && (
        <img src={bushSrc} alt="Greenery bush background" className="bouquet-bush" />
      )}

      {/* Drag hint badge — only in draggable mode, disappears after first drag */}
      {isDraggable && flowerList.length > 0 && Object.keys(dragOffsets).length === 0 && (
        <div className="drag-hint-badge">
          <span>✋ Drag to rearrange</span>
        </div>
      )}

      {/* Flowers */}
      {flowerList.map((flower, i) => {
        const pos = positions[i] || { x: 50, y: 50, rotate: 0, size: 18, zIndex: 1 };
        const offset = dragOffsets[i] || { x: 0, y: 0 };
        const isDragging = isDraggable && draggingIndex === i;

        return (
          <motion.img
            key={`${flower.id}-${i}`}
            src={flower.src}
            alt={`${flower.name} flower in bouquet`}
            className={`bouquet-flower${isDraggable ? " bouquet-flower--draggable" : ""}${isDragging ? " bouquet-flower--dragging" : ""}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${pos.size}%`,
              rotate: `${pos.rotate}deg`,
              zIndex: isDragging ? 50 : pos.zIndex,
              pointerEvents: isDraggable ? "auto" : "none",
            }}
            // Drag — only when isDraggable
            drag={isDraggable}
            dragMomentum={isDraggable ? false : undefined}
            dragConstraints={isDraggable ? containerRef : undefined}
            dragElastic={isDraggable ? 0.08 : undefined}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: isDragging ? 1.15 : 1,
              x: offset.x,
              y: offset.y,
            }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onDragStart={isDraggable ? () => setDraggingIndex(i) : undefined}
            onDragEnd={isDraggable ? (_, info) => {
              setDraggingIndex(null);
              if (onFlowerDragEnd) {
                onFlowerDragEnd(i, {
                  x: (offset.x || 0) + info.offset.x,
                  y: (offset.y || 0) + info.offset.y,
                });
              }
            } : undefined}
            whileHover={isDraggable ? { scale: isDragging ? 1.15 : 1.08 } : {}}
          />
        );
      })}
    </div>
  );
}

export default BouquetDisplay;