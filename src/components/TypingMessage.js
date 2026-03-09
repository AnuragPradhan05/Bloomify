import { motion } from "framer-motion";

function TypingMessage({ text }) {
  // Split text into characters
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 1.5 // Start after the card has settled
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 5,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ marginRight: char === " " ? "8px" : "1px" }}
        >
          {char === "\n" ? <br /> : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default TypingMessage;
