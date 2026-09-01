import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import SEOHead from "../components/SEOHead";
import FloatingFlowers from "../components/FloatingFlowers";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF3E6 0%, #FCE8EE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
        color: "#381932",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SEOHead
        title="404 - Page Not Found | Bloomify"
        description="The page you are looking for does not exist or has moved. Return to Bloomify home to create a digital flower bouquet."
        noindex={true}
      />
      <FloatingFlowers />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          zIndex: 10,
          maxWidth: "500px",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "40px 30px",
          borderRadius: "24px",
          border: "1px solid rgba(56, 25, 50, 0.12)",
          boxShadow: "0 20px 40px rgba(56, 25, 50, 0.08)",
        }}
      >
        <div style={{ fontSize: "72px", marginBottom: "10px" }}>🌸</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
            margin: "10px 0",
            color: "#381932",
          }}
        >
          404 - Page Not Found
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.05rem",
            color: "#6b4e64",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Oops! The page or bouquet link you are looking for doesn't exist or has withered away.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#381932",
            color: "#FFF3E6",
            padding: "14px 28px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 8px 20px rgba(56, 25, 50, 0.25)",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
        >
          <FaHome /> Return to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
