import React, { useState, useRef } from "react";
import introVideo from "../assets/intro.mp4";
import "../styles/intro.css";

function IntroVideo({ onComplete }) {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setTimeout(() => {
      onComplete();
    }, 500); // 500ms fade out transition
  };

  return (
    <div className={`intro-container ${isVideoEnded ? "fade-out" : ""}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
      <button className="skip-button" onClick={handleVideoEnd}>
        Skip
      </button>
    </div>
  );
}

export default IntroVideo;
