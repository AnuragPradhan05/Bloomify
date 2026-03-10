import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { GiFlowerEmblem } from "react-icons/gi";

const skipStyle = {
  position: "absolute",
  bottom: "30px",
  right: "30px",
  background: "rgba(56, 25, 50, 0.08)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(56, 25, 50, 0.2)",
  color: "#381932",
  padding: "10px 25px",
  borderRadius: "30px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  fontWeight: "600",
  letterSpacing: "1px",
  cursor: "pointer",
  textTransform: "uppercase",
  zIndex: 10000,
};

function IntroParticleBurst({ onComplete }) {
  const [phase, setPhase] = useState("spin"); // spin → burst → done

  const particles = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 160 + Math.random() * 220;
      return {
        id: i,
        tx: Math.cos(rad) * dist,
        ty: Math.sin(rad) * dist,
        size: 9 + Math.random() * 16,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.18,
        emoji:
          i % 6 === 0 ? "🌸" :
          i % 6 === 1 ? "🌺" :
          i % 6 === 2 ? "✿" :
          null,
      };
    }), []
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("burst"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 2200);
    const t3 = setTimeout(() => onComplete(), 2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#FFF3E6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── Spinning center icon ── */}
          <motion.div
            animate={
              phase === "burst"
                ? { scale: [1, 2, 0], opacity: [1, 1, 0], rotate: 720 }
                : { rotate: 360, scale: 1 }
            }
            transition={
              phase === "burst"
                ? { duration: 0.55, ease: "easeOut" }
                : { repeat: Infinity, duration: 1.2, ease: "linear" }
            }
            style={{
              position: "absolute",
              color: "#381932",
              fontSize: "clamp(4rem, 12vw, 6rem)",
              zIndex: 3,
              filter: "drop-shadow(0 4px 14px rgba(56,25,50,0.25))",
            }}
          >
            <GiFlowerEmblem />
          </motion.div>

          {/* ── Burst particles ── */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
              animate={
                phase === "burst"
                  ? {
                      x: [0, p.tx * 0.25, p.tx],
                      y: [0, p.ty * 0.25, p.ty],
                      scale: [0, 1.3, 0],
                      opacity: [0, 1, 0],
                      rotate: p.rotate,
                    }
                  : {}
              }
              transition={{
                duration: 1,
                delay: p.delay,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                fontSize: p.emoji ? p.size + 6 : 0,
                width: p.emoji ? "auto" : p.size,
                height: p.emoji ? "auto" : p.size * 1.35,
                background: p.emoji
                  ? "none"
                  : "linear-gradient(135deg, rgba(255,220,235,0.95), rgba(240,150,180,0.85))",
                borderRadius: p.emoji ? 0 : "50% 0 50% 50%",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              {p.emoji || ""}
            </motion.div>
          ))}

          {/* ── Skip button ── */}
          <motion.button
            onClick={onComplete}
            style={skipStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05, background: "rgba(56, 25, 50, 0.14)" }}
            whileTap={{ scale: 0.96 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroParticleBurst;