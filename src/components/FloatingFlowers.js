import { motion } from "framer-motion";
import "../styles/floating-flowers.css";

const TOTAL_PETALS = 40; // Increased count for lush feel

function FloatingFlowers() {
  const petals = Array.from({ length: TOTAL_PETALS });

  return (
    <div className="floating-flowers">
      {petals.map((_, index) => {
        // Randomize depth and appearance
        const isFar = Math.random() > 0.6;
        const baseSize = isFar ? 12 : 24;
        const scale = Math.random() * 0.5 + 0.8; 
        const blur = isFar ? "2px" : "0px";
        const opacity = isFar ? 0.4 : 0.8;
        
        // Randomize starting position
        const startX = Math.random() * 120 - 10; 
        // Mix of starting above and starting within the viewport for immediate effect
        const startY = index < TOTAL_PETALS / 2 ? (Math.random() * 100 - 10) + "vh" : "-10vh";
        
        const delay = Math.random() * 5; // Reduced delay
        const duration = Math.random() * 8 + 12;
        
        const driftX = Math.random() * 200 - 100;
        
        return (
          <motion.div
            key={index}
            className="flower"
            style={{
              left: `${startX}%`,
              filter: `blur(${blur})`,
              zIndex: isFar ? 1 : 15,
            }}
            initial={{ 
              y: startY, 
              opacity: 0, 
              rotateX: 0, 
              rotateY: 0, 
              rotateZ: Math.random() * 360 
            }}
            animate={{ 
              y: "110vh",
              x: [0, driftX * 0.5, driftX],
              rotateX: [0, 180, 360, 540],
              rotateY: [0, 360],
              rotateZ: [0, 180, 360],
              opacity: [0, opacity, opacity, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: [0.45, 0.05, 0.55, 0.95],
            }}
          >
            <div 
              className="cherry-petal" 
              style={{ 
                width: `${baseSize * scale}px`, 
                height: `${(baseSize * 1.3) * scale}px` 
              }}
            ></div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default FloatingFlowers;