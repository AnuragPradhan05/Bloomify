import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { FaArrowRight, FaPlus, FaMinus, FaRandom, FaPenNib, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import BouquetDisplay from "../components/BouquetDisplay";
import bouquet1 from "../assets/bouqet1.jpeg";
import bouquet2 from "../assets/bouquet2.jpeg";
import illustration2 from "../assets/illustrations/illustration2.png";
import illustration3 from "../assets/illustrations/illustration3.png";
import bee from "../assets/illustrations/bee.png";
import bee2 from "../assets/illustrations/bee2.png";
import writeIllustration from "../assets/illustrations/write.svg";
import "../styles/create.css";

// ── Catalogues ────────────────────────────────────────────────────────────────
const FLOWERS = [
  { id: "rose",      name: "Rose",      src: require("../assets/Flowers/rose.jpg") },
  { id: "tulip",     name: "Tulip",     src: require("../assets/Flowers/tulip.jpg") },
  { id: "sunflower", name: "Sunflower", src: require("../assets/Flowers/sunflower.jpg") },
  { id: "orchid",    name: "Orchid",    src: require("../assets/Flowers/orchid.jpg") },
  { id: "lily",      name: "Lily",      src: require("../assets/Flowers/lily.jpg") },
  { id: "daisy",     name: "Daisy",     src: require("../assets/Flowers/daisy.jpg") },
  { id: "carnation", name: "Carnation", src: require("../assets/Flowers/carnation.jpg") },
  { id: "dahlia",    name: "Dahlia",    src: require("../assets/Flowers/dahlia.jpg") },
  { id: "anemone",   name: "Anemone",   src: require("../assets/Flowers/anemone.jpg") },
  { id: "zinnia",    name: "Zinnia",    src: require("../assets/Flowers/zinnia.jpg") },
];

const BUSHES = [
  { id: "bush-1", name: "Wild Meadow",   src: require("../assets/Bushes/bush-1.png") },
  { id: "bush-2", name: "Garden Rose",   src: require("../assets/Bushes/bush-2.png") },
  { id: "bush-3", name: "Rustic Fern",   src: require("../assets/Bushes/bush-3.png") },
];

const FLOWER_MAP = Object.fromEntries(FLOWERS.map((f) => [f.id, f]));
const MAX_FLOWERS = 10;

// ── Router entry ──────────────────────────────────────────────────────────────
function CreateBouquet() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  if (mode === "customise") return <CustomiseStep />;
  if (mode === "message") return <MessageStep />;
  return <PickFlowersStep />;
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 1 — Pick Flowers
// ══════════════════════════════════════════════════════════════════════════════
function PickFlowersStep() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [error, setError] = useState("");

  const getCount = (id) => counts[id] || 0;

  const add = (id, e) => {
    e.stopPropagation();
    setError("");
    setCounts((prev) => {
      const currentTotal = Object.values(prev).reduce((s, n) => s + n, 0);
      if (currentTotal >= MAX_FLOWERS) return prev;
      return { ...prev, [id]: (prev[id] || 0) + 1 };
    });
  };

  const remove = (id, e) => {
    e.stopPropagation();
    setError("");
    setCounts((prev) => {
      const next = { ...prev };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  };

  const total = Object.values(counts).reduce((s, n) => s + n, 0);
  const isEven = total > 0 && total % 2 === 0;
  const atMax = total >= MAX_FLOWERS;

  const handleBuild = () => {
    if (total === 0) { setError("Pick at least 2 flowers to start your bouquet 🌸"); return; }
    if (total % 2 !== 0) { setError(`You've chosen ${total} flower${total !== 1 ? "s" : ""} — add one more to make it even 🌺`); return; }
    navigate("/create?mode=customise", { state: { counts } });
  };

  return (
    <div className="create-page">
      <motion.div className="create-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="create-title">Build Your Bouquet</h1>
        <p className="create-subtitle">
          Add flowers you like.
        </p>
        <motion.div
          className={`counter-badge ${isEven ? "counter-valid" : total > 0 ? "counter-odd" : ""}`}
          animate={{ scale: total > 0 ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 0.3 }}
          key={total}
        >
          {total === 0
            ? `Choose up to ${MAX_FLOWERS} flowers`
            : `${total} / ${MAX_FLOWERS} flowers ${isEven ? "✅" : "— need even number"}`}
        </motion.div>
      </motion.div>

      {/* Decorative Illustrations */}
      <motion.img 
        src={illustration2} 
        alt="" 
        className="decorative-illustration decorative-illustration-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: 0.6, 
          x: 0,
          y: [0, -10, 0],
          rotate: [-0.5, 0.5, -0.5]
        }}
        transition={{ 
          opacity: { duration: 1.5 },
          x: { duration: 1.5 },
          y: { repeat: Infinity, duration: 10, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 12, ease: "easeInOut" }
        }}
      />
      <motion.img 
        src={illustration3} 
        alt="" 
        className="decorative-illustration decorative-illustration-right"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: 0.6, 
          x: 0,
          y: [0, 10, 0],
          rotate: [0.5, -0.5, 0.5]
        }}
        transition={{ 
          opacity: { duration: 1.5 },
          x: { duration: 1.5 },
          y: { repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 },
          rotate: { repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }
        }}
      />

      <div className="flower-grid">
        {FLOWERS.map((flower, i) => {
          const count = getCount(flower.id);
          const isSelected = count > 0;
          return (
            <motion.div
              key={flower.id}
              className={`flower-card ${isSelected ? "flower-card--selected" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.span className="flower-count-badge"
                    key={count}
                    initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="flower-img-wrap">
                <img src={flower.src} alt={flower.name} className="flower-img" />
              </div>
              <span className="flower-name">{flower.name}</span>
              <div className="flower-controls">
                <motion.button className="ctrl-btn ctrl-minus" onClick={(e) => remove(flower.id, e)}
                  disabled={!isSelected} whileTap={{ scale: 0.85 }} title="Remove one">
                  <FaMinus />
                </motion.button>
                <motion.button className="ctrl-btn ctrl-plus" onClick={(e) => add(flower.id, e)}
                  disabled={atMax} whileTap={{ scale: 0.85 }} title={atMax ? "Max 10 reached" : "Add one"}>
                  <FaPlus />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p className="create-error"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        className={`build-btn ${isEven ? "build-btn--active" : ""}`}
        onClick={handleBuild}
        whileHover={isEven ? { scale: 1.05 } : {}}
        whileTap={isEven ? { scale: 0.95 } : {}}
      >
        Build My Bouquet <FaArrowRight className="btn-arrow" />
      </motion.button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 2 — Customise (Greenery + Arrangement)
// ══════════════════════════════════════════════════════════════════════════════
function CustomiseStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const counts = location.state?.counts || {};

  // Expand counts → flat array of flower objects for the preview
  const flowerList = useMemo(() => {
    const list = [];
    Object.entries(counts).forEach(([id, qty]) => {
      const flower = FLOWER_MAP[id];
      if (flower) for (let i = 0; i < qty; i++) list.push(flower);
    });
    return list;
  }, [counts]);

  const [selectedBush, setSelectedBush] = useState(BUSHES[0]);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const shuffle = () => setShuffleKey((k) => k + 1);

  const handleNext = () => {
    navigate("/create?mode=message", { 
      state: { 
        counts, 
        selectedBushId: selectedBush.id,
        shuffleKey 
      } 
    });
  };

  return (
    <div className="create-page customise-page">
      {/* ── Header ── */}
      <motion.div className="create-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h1 className="create-title">Customise</h1>
        <p className="create-subtitle">
          Choose your <strong>greenery</strong> and shuffle the arrangement until it feels right.
        </p>
      </motion.div>

      <div className="customise-layout">
        {/* ── Left: Live bouquet preview ── */}
        <motion.div 
          className="bouquet-preview-wrap"
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.7, delay: 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Localized Interactive Bees */}
          <div className="bouquet-bee-container">
            {[...Array(4)].map((_, i) => (
              <motion.img 
                key={i}
                src={i % 2 === 0 ? bee : bee2} 
                alt="" 
                className="decoration-bee"
                animate={{
                  x: isHovered 
                    ? (i === 0 ? -600 : i === 1 ? 600 : i === 2 ? -400 : 400) // Fly far off-screen
                    : [0, (i % 2 === 0 ? 30 : -30), 0], // Gentle buzz
                  y: isHovered 
                    ? (i < 2 ? -600 : 600) // Fly far off-screen
                    : [0, (i % 2 === 0 ? -40 : 40), 0],
                  rotate: isHovered 
                    ? (i % 2 === 0 ? -90 : 90) 
                    : [0, 15, -15, 0],
                  scale: isHovered ? 0.4 : 1.1,
                  opacity: isHovered ? 0 : 1
                }}
                transition={{
                  x: { 
                    duration: isHovered ? 0.6 : (2.5 + i * 0.5), 
                    repeat: isHovered ? 0 : Infinity, 
                    ease: "easeInOut" 
                  },
                  y: { 
                    duration: isHovered ? 0.6 : (2.5 + i * 0.5), 
                    repeat: isHovered ? 0 : Infinity, 
                    ease: "easeInOut" 
                  },
                  rotate: { 
                    duration: isHovered ? 0.6 : (2.5 + i * 0.5), 
                    repeat: isHovered ? 0 : Infinity, 
                    ease: "easeInOut" 
                  },
                  scale: { duration: 0.6 },
                  opacity: { duration: 0.6 }
                }}
                style={{
                  top: `${30 + (i % 2) * 20}%`,
                  left: `${30 + (i > 1 ? 1 : 0) * 30}%`,
                  zIndex: 10
                }}
              />
            ))}
          </div>

          <BouquetDisplay
            key={shuffleKey}
            seed={shuffleKey}
            flowerList={flowerList}
            bushSrc={selectedBush.src}
          />
          <motion.button className="shuffle-btn" onClick={shuffle}
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
            <FaRandom /> Shuffle
          </motion.button>
        </motion.div>

        {/* ── Right: Greenery picker ── */}
        <motion.div className="greenery-panel"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <h3 className="panel-label">Choose Greenery</h3>
          <div className="greenery-grid">
            {BUSHES.map((bush) => (
              <motion.div
                key={bush.id}
                className={`greenery-card ${selectedBush.id === bush.id ? "greenery-card--selected" : ""}`}
                onClick={() => setSelectedBush(bush)}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <img src={bush.src} alt={bush.name} className="greenery-img" />
                <span className="greenery-name">{bush.name}</span>
                {selectedBush.id === bush.id && (
                  <span className="greenery-selected-dot" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button className="build-btn build-btn--active next-btn"
            onClick={handleNext}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Next — Add a Message <FaArrowRight className="btn-arrow" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STEP 3 — Message (Diary/Letter)
// ══════════════════════════════════════════════════════════════════════════════
function MessageStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { counts, selectedBushId, shuffleKey } = location.state || {};

  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleFinalize = async () => {
    if (!receiverName.trim() || !message.trim()) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in both the name and your message! ✨",
        icon: "warning",
        confirmButtonColor: "#381932"
      });
      return;
    }

    setIsSending(true);
    try {
      const docRef = await addDoc(collection(db, "bouquets"), {
        counts,
        selectedBushId,
        shuffleKey,
        receiverName,
        message,
        createdAt: serverTimestamp(),
      });
      navigate(`/preview/${docRef.id}`);
    } catch (error) {
      console.error("Error saving bouquet:", error);
      Swal.fire({
        title: "Submission Error",
        text: "Something went wrong saving your bouquet. Please try again! 🌸",
        icon: "error",
        confirmButtonColor: "#381932"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="create-page message-page">
      {/* ── Background Decoration ── */}
      <motion.img
        src={writeIllustration}
        alt=""
        className="message-decoration-svg"
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 0.12,
          x: 0,
          y: [0, -10, 0]
        }}
        transition={{
          duration: 1.5,
          y: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      <motion.div className="create-header"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="create-title">Write a Note</h1>
        <p className="create-subtitle">Personalize your bouquet with a loving message in your digital diary.</p>
      </motion.div>

      <motion.div 
        className="diary-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative Bouquets on Sides */}
        <motion.img 
          src={bouquet1} 
          alt="" 
          className="side-bouquet side-bouquet-left"
          animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <motion.img 
          src={bouquet2} 
          alt="" 
          className="side-bouquet side-bouquet-right"
          animate={{ y: [0, 15, 0], rotate: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
        />

        <div className="diary-paper">
          <div className="diary-header">
            <FaPenNib className="diary-icon" />
            <span className="diary-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <div className="diary-body">
            <div className="input-group">
              <label htmlFor="receiver">To my dearest,</label>
              <input 
                type="text" 
                id="receiver"
                placeholder="Name of your loved one..."
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="diary-input-name"
                autoComplete="off"
              />
            </div>

            <textarea 
              placeholder="Write your heart out here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="diary-textarea"
            />
          </div>
          
          <div className="diary-footer">
            <p>With love, Bloomify 🌸</p>
          </div>
        </div>

        <motion.button 
          className={`build-btn build-btn--active send-btn ${isSending ? "sending" : ""}`}
          onClick={handleFinalize}
          disabled={isSending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSending ? "Sending Bouquet..." : "Send Bouquet"} 
          {!isSending && <FaPaperPlane className="btn-arrow" />}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default CreateBouquet;