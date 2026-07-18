import { useEffect, useState } from "react";
import { useLandingLang } from "../../context/landingLang";
import styles from "../../../styles/specific/blog/shareBar.module.css";

/* Barre de partage d'article : réseaux sociaux + copier le lien +
   partage natif (mobile). Aucun script tiers — juste des intents. */

const NETS = [
  { key: "x", label: "X (Twitter)", icon: "/icons/ph/x-logo__ffffff.svg", href: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { key: "linkedin", label: "LinkedIn", icon: "/icons/ph/linkedin-logo__ffffff.svg", href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { key: "facebook", label: "Facebook", icon: "/icons/ph/facebook-logo__ffffff.svg", href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { key: "whatsapp", label: "WhatsApp", icon: "/icons/ph/whatsapp-logo__ffffff.svg", href: (u, t) => `https://wa.me/?text=${t}%20${u}` },
  { key: "telegram", label: "Telegram", icon: "/icons/ph/telegram-logo__ffffff.svg", href: (u, t) => `https://t.me/share/url?url=${u}&text=${t}` },
  { key: "email", label: "Email", icon: "/icons/ph/envelope-simple__ffffff.svg", href: (u, t) => `mailto:?subject=${t}&body=${u}` },
];

const T = {
  fr: { share: "Partager", copy: "Copier le lien", copied: "Lien copié !", native: "Partager…" },
  en: { share: "Share", copy: "Copy link", copied: "Link copied!", native: "Share…" },
};

const ga = (method) => { try { if (typeof window.gtag === "function") window.gtag("event", "share", { method, content_type: "article" }); } catch {} };

export default function ShareBar({ url, title }) {
  const { lang } = useLandingLang();
  const t = T[lang === "en" ? "en" : "fr"];
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);

  useEffect(() => { setCanNative(typeof navigator !== "undefined" && typeof navigator.share === "function"); }, []);

  const u = encodeURIComponent(url);
  const tit = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    ga("copy_link");
  };

  const nativeShare = async () => {
    try { await navigator.share({ title, url }); ga("native"); } catch {}
  };

  return (
    <div className={styles.share}>
      <span className={styles.label}>{t.share}</span>
      <div className={styles.btns}>
        {canNative && (
          <button type="button" className={styles.btn} onClick={nativeShare} title={t.native} aria-label={t.native}>
            <img src="/icons/ph/share-network__ffffff.svg" alt="" width={18} height={18} />
          </button>
        )}
        {NETS.map((n) => (
          <a
            key={n.key}
            className={styles.btn}
            href={n.href(u, tit)}
            target="_blank"
            rel="noopener noreferrer"
            title={n.label}
            aria-label={n.label}
            onClick={() => ga(n.key)}
          >
            <img src={n.icon} alt="" width={18} height={18} />
          </a>
        ))}
        <button
          type="button"
          className={`${styles.btn} ${styles.copy} ${copied ? styles.copiedBtn : ""}`}
          onClick={copy}
          title={t.copy}
          aria-label={t.copy}
        >
          <img src={copied ? "/icons/ph/check__ffffff.svg" : "/icons/ph/link__ffffff.svg"} alt="" width={18} height={18} />
          <span className={styles.copyLabel}>{copied ? t.copied : t.copy}</span>
        </button>
      </div>
    </div>
  );
}
