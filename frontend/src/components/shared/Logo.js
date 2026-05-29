export function Logo({ size = "md", showText = true }) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 44, text: "text-3xl" },
    xl: { icon: 56, text: "text-4xl" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Logo mark — abstract vibe wave */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vibes-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#vibes-grad)" opacity="0.15" />
        <path
          d="M10 25C12 18 15 14 18 18C21 22 23 12 26 16C29 20 31 15 33 15"
          stroke="url(#vibes-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="10" cy="25" r="2" fill="#8b5cf6" />
        <circle cx="33" cy="15" r="2" fill="#f59e0b" />
      </svg>

      {showText && (
        <span className={`font-heading font-bold tracking-tight ${s.text} gradient-text`}>
          Vibes
        </span>
      )}
    </div>
  );
}
