"use client";

const font = "var(--font-poppins), Poppins, system-ui, sans-serif";

export default function CookieSettingsButton() {
  const open = () => window.dispatchEvent(new CustomEvent("cookie-settings-open"));

  return (
    <button onClick={open} className="footer-legal-link footer-cookies-btn" style={{ fontFamily: font }}>
      Nastavení cookies
    </button>
  );
}
