import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBouquet from "./pages/CreateBouquet";
import PreviewBouquet from "./pages/PreviewBouquet";
import RevealBouquet from "./pages/RevealBouquet";
import Navbar from "./components/Navbar";
import IntroVideo from "./components/IntroVideo";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateBouquet />} />
            <Route path="/preview/:id" element={<PreviewBouquet />} />
            <Route path="/b/:id" element={<RevealBouquet />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;