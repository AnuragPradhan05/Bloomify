import { useEffect } from "react";

const DEFAULT_SITE_URL = process.env.REACT_APP_SITE_URL || "https://bloomify-ashen.vercel.app";
const DEFAULT_TITLE = "Bloomify – Create Beautiful Digital Flower Bouquets Online 🌸";
const DEFAULT_DESCRIPTION = "Create, customize, and send hand-crafted digital flower bouquets with sweet personalized notes to your loved ones online.";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE_URL}/logo512.png`;

function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to update or create meta tag
    const setMetaTag = (selector, property, value, attr = "name") => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', "description", description);
    setMetaTag(
      'meta[name="robots"]',
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    // 3. Canonical URL
    const currentUrl = canonicalUrl || `${DEFAULT_SITE_URL}${window.location.pathname}`;
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", currentUrl);

    // 4. OpenGraph Meta Tags
    setMetaTag('meta[property="og:title"]', "og:title", title, "property");
    setMetaTag('meta[property="og:description"]', "og:description", description, "property");
    setMetaTag('meta[property="og:url"]', "og:url", currentUrl, "property");
    setMetaTag('meta[property="og:image"]', "og:image", ogImage, "property");
    setMetaTag('meta[property="og:type"]', "og:type", ogType, "property");
    setMetaTag('meta[property="og:site_name"]', "og:site_name", "Bloomify", "property");

    // 5. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    let scriptEl = document.getElementById("seo-json-ld");
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.setAttribute("id", "seo-json-ld");
        scriptEl.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalUrl, ogImage, ogType, noindex, jsonLd]);

  return null;
}

export default SEOHead;
