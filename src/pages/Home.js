import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import bouquet1 from "../assets/bouqet1.jpeg";
import bouquet2 from "../assets/bouquet2.jpeg";
import bouquet3 from "../assets/bouquet3.jpeg";
import butterfly1 from "../assets/butterfly1.jpeg";
import butterfly2 from "../assets/butterfly2.jpeg";
import butterfly3 from "../assets/butterfly3.jpeg";
import "../styles/home.css";
import FloatingFlowers from "../components/FloatingFlowers";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="backdrop-text">Bloomify</div>
      <FloatingFlowers />

      {/* Fixed Background Decorations */}
      <div className="bouquet-decorations fixed-decor">
        <motion.img 
          src={bouquet1} 
          alt="Bouquet 1" 
          className="bouquet-img img-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.img 
          src={bouquet2} 
          alt="Bouquet 2" 
          className="bouquet-img img-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <motion.img 
          src={bouquet3} 
          alt="Bouquet 3" 
          className="bouquet-img img-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        />

        {/* Butterfly Decorations */}
        <motion.img 
          src={butterfly1} 
          alt="Butterfly 1" 
          className="butterfly-img bfly-1"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.img 
          src={butterfly2} 
          alt="Butterfly 2" 
          className="butterfly-img bfly-2"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        />
        <motion.img 
          src={butterfly3} 
          alt="Butterfly 3" 
          className="butterfly-img bfly-3"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="sections-wrapper">
        {/* Section 1: Hero */}
        <section className="home-section section-hero">
          <motion.div
            className="home-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="logo"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="logo-wrapper">Bloomify</span>
            </motion.h1>

            <motion.p
              className="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Where emotions bloom into petals
            </motion.p>
          </motion.div>
        </section>

        {/* Section 2: Details */}
        <section className="home-section section-details">
          <motion.div
            className="home-content promo-box"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <div className="promo-badge">
              <HiSparkles className="badge-icon" /> THE FUTURE OF GIFTING
            </div>
            <h2 className="promo-title">
              Bouquets that <br />
              <span className="never-fade-italic">never fade.</span>
            </h2>
            <p className="promo-paragraph">
              Experience the romance of digital gifting. Send a hand-crafted, <br />
              animated bouquet that lives forever in their heart and on their screen.
            </p>

            <motion.button
              className="create-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create")}
            >
              Create a Bouquet <FaArrowRight className="btn-icon" />
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Home;