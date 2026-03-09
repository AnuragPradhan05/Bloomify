import React from "react";
import { FaCopy, FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

function CopyLinkBox({ link }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    Swal.fire({
      title: "Success!",
      text: "Link copied to clipboard 💐",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end"
    });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`I've made a digital bouquet for you! check it out here: ${link}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="copy-link-box">
      <div className="link-input-group">
        <input
          type="text"
          value={link}
          readOnly
          className="link-display-input"
        />
        <button className="copy-action-btn" onClick={handleCopy} title="Copy Link">
          <FaCopy />
        </button>
      </div>
      
      <div className="share-shortcut-group">
        <button className="whatsapp-share-btn" onClick={handleWhatsAppShare}>
          <FaWhatsapp /> Share on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default CopyLinkBox;
