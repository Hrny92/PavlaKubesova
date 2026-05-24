import Reveal from "@/components/ui/Reveal";

const stats = [
  {
    value: "98%",
    label: "ÚSPĚŠNOST PRODEJE",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    value: "3D",
    label: "MATTERPORT PROHLÍDKY",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    value: "A–Z",
    label: "KOMPLETNÍ SERVIS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function Stats() {
  return (
    <div className="bg-[#111525] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-white/5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 110} style={{ display: "flex" }}>
              <div className="flex items-center gap-5 py-7 px-8 lg:px-16 w-full">
                {/* Kruhová ikona */}
                <div className="w-12 h-12 rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/5 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                {/* Text */}
                <div>
                  <p
                    className="text-white font-extrabold leading-none mb-1"
                    style={{
                      fontFamily: "var(--font-poppins), Poppins, system-ui, sans-serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[#C9A84C]/70 text-[10px] font-semibold tracking-[0.18em]">
                    {s.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
