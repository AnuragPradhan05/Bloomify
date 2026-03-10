import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import BouquetDisplay from "../components/BouquetDisplay";
import FloatingFlowers from "../components/FloatingFlowers";
import CopyLinkBox from "../components/CopyLinkBox";
import "../styles/preview.css";

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

function PreviewBouquet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bouquet, setBouquet] = useState(null);

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



  if (!bouquet) return <div className="preview-container">Loading your bouquet...</div>;

  return (
    <div className="preview-page">
      <FloatingFlowers />
      <div className="preview-content">
        <header className="preview-header">
          <h1>Your Bouquet is Ready!</h1>
          <p>Share this with your loved one to brighten their day.</p>
        </header>

        <div className="preview-main">
          {/* Bouquet Preview */}
          <div className="preview-visual">
            <div className="bouquet-preview-container">
              <BouquetDisplay 
                flowerList={flowerList} 
                bushSrc={BUSHES[bouquet.selectedBushId] || BUSHES["bush-1"]} 
                seed={bouquet.shuffleKey || 0}
              />
            </div>
          </div>

          {/* Card Info */}
          <div className="preview-details">
            <div className="share-card">
              <h3>For: {bouquet.receiverName}</h3>
              <div className="message-box">
                <p>{bouquet.message}</p>
              </div>
              
              <div className="share-actions">
                <CopyLinkBox link={`${window.location.origin}/b/${id}`} />

                <button
                  className="view-btn"
                  onClick={() => navigate(`/b/${id}`, { state: { fromPreview: true } })}
                >
                  See Receiver View 🌷
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBouquet;