import { motion } from "framer-motion";

function TypingMessage({ text }) {
  if (!text) return null;

  const lines = text.split("\n");

  let globalIndex = 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, 
        delayChildren: 1.2
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      className="typing-message-content"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        textAlign: "center",
        width: "100%"
      }}
    >
      {lines.map((line, lineIdx) => {
        if (line === "") {
          globalIndex++;
          return (
            <div key={`empty-${lineIdx}`} style={{ height: "1.2em" }}>
              <br />
            </div>
          );
        }

        const tokens = line.match(/(\S+|\s+)/g) || [line];

        return (
          <div key={`line-${lineIdx}`} className="typing-line" style={{ display: "block" }}>
            {tokens.map((token, tokenIdx) => {
              const chars = Array.from(token);

              return (
                <span
                  key={`token-${lineIdx}-${tokenIdx}`}
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                  }}
                >
                  {chars.map((char) => {
                    const currentIndex = globalIndex++;
                    return (
                      <motion.span
                        key={`char-${currentIndex}`}
                        variants={letterVariants}
                        style={{ display: "inline-block" }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </div>
        );
      })}
    </motion.div>
  );
}

export default TypingMessage;
