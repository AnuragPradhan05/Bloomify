import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiFlowerEmblem } from "react-icons/gi";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <motion.div 
          className="top-left-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05, filter: "drop-shadow(0px 4px 6px rgba(56,25,50,0.3))" }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <GiFlowerEmblem className="top-logo-icon" />
          </motion.div>
        </motion.div>
      </Link>
    </nav>
  );
}

export default Navbar;
