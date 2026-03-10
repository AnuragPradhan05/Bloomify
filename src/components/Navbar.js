import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiFlowerEmblem } from "react-icons/gi";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [hovered, setHovered] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link" title="Back to Home">
        <motion.div
          className="top-left-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          {/* Spinning flower icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{
              filter: hovered
                ? "drop-shadow(0px 4px 8px rgba(56,25,50,0.35))"
                : "none",
              transition: "filter 0.3s ease",
            }}
          >
            <GiFlowerEmblem className="top-logo-icon" />
          </motion.div>

          {/* Desktop: slides in on hover via AnimatePresence */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="nav-home-label nav-home-label--desktop"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
              >
                Home
              </motion.span>
            )}
          </AnimatePresence>

          {/* Mobile: always visible, controlled purely by CSS */}
          <span className="nav-home-label nav-home-label--mobile">
            Home
          </span>
        </motion.div>
      </Link>
    </nav>
  );
}

export default Navbar;