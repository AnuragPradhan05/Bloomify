import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import BouquetDisplay from "../components/BouquetDisplay";
import FloatingFlowers from "../components/FloatingFlowers";
import TypingMessage from "../components/TypingMessage";
import "../styles/reveal.css";

const BUSHES = {
  "bush-1": require("../assets/Bushes/bush-1.png"),
  "bush-2": require("../assets/Bushes/bush-2.png"),
  "bush-3": require("../assets/Bushes/bush-3.png"),
};

const FLOWERS = {
  rose:      { id: "rose",      name: "Rose",      src: require("../assets/Flowers/rose.jpg") },
  tulip:     { id: "tulip",     name: "Tulip",     src: require("../assets/Flowers/tulip.jpg") },
  sunflower: { id: "sunflower", name: "Sunflower", src: require("../assets/Flowers/sunflower.jpg") },
  orchid:    { id: "orchid",    name: "Orchid",    src: require("../assets/Flowers/orchid.jpg") },
  lily:      { id: "lily",      name: "Lily",      src: require("../assets/Flowers/lily.jpg") },
  daisy:     { id: "daisy",     name: "Daisy",     src: require("../assets/Flowers/daisy.jpg") },
  carnation: { id: "carnation", name: "Carnation", src: require("../assets/Flowers/carnation.jpg") },
  dahlia:    { id: "dahlia",    name: "Dahlia",    src: require("../assets/Flowers/dahlia.jpg") },
  anemone:   { id: "anemone",   name: "Anemone",   src: require("../assets/Flowers/anemone.jpg") },
  zinnia:    { id: "zinnia",    name: "Zinnia",    src: require("../assets/Flowers/zinnia.jpg") },
};

function RevealBouquet() {
  const { id } = useParams();
  const [bouquet, setBouquet] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  
  // Randomly select card style (1, 2, 3 or 4) - memoized so it stays same for the session of viewing this bouquet
  const cardStyle = useMemo(() => Math.floor(Math.random() * 4) + 1, []);

  useEffect(() => {
    const fetchBouquet = async () => {
      const docRef = doc(db, "bouquets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBouquet(docSnap.data());
      } else {
        Swal.fire({
          title: "Not Found",
          text: "Bouquet not found 💔",
          icon: "error",
          confirmButtonColor: "#381932"
        });
      }
    };
    fetchBouquet();
  }, [id]);

  const flowerList = useMemo(() => {
    if (!bouquet?.counts) return [];
    const list = [];
    Object.entries(bouquet.counts).forEach(([fid, qty]) => {
      const flower = FLOWERS[fid];
      if (flower) for (let i = 0; i < qty; i++) list.push(flower);
    });
    return list;
  }, [bouquet]);

  if (!bouquet) return <div className="reveal-container loading-state">Loading your surprise... 🌷</div>;

  return (
    <div className="reveal-page">
      <FloatingFlowers />
      <div className="reveal-backdrop-text">For You</div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div 
            key="closed"
            className="reveal-intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="gift-box-container">
              <motion.div 
                className="gift-box"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                🎁
              </motion.div>
              <h1 className="tap-title">A surprise for {bouquet.receiverName}</h1>
              <p className="tap-subtitle">Tap the gift to open your digital bouquet</p>
              <motion.button 
                className="open-surprise-btn"
                onClick={() => setIsOpened(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Your Surprise 🌸
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="opened"
            className="reveal-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div 
              className="reveal-visual"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.4 }}
            >
              <BouquetDisplay 
                flowerList={flowerList} 
                bushSrc={BUSHES[bouquet.selectedBushId] || BUSHES["bush-1"]} 
                seed={bouquet.shuffleKey || 0}
              />
            </motion.div>

            <motion.div 
              className={`reveal-card reveal-card--style-${cardStyle}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h1 className="receiver-header">For {bouquet.receiverName}</h1>
              <div className="reveal-message-container">
                <div className="reveal-message">
                  <TypingMessage text={bouquet.message} />
                </div>
              </div>
              <div className="reveal-footer">
                <p>Sent with Bloomify 🌸</p>
              </div>
              <div className="reveal-card-moon">🌙</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RevealBouquet;