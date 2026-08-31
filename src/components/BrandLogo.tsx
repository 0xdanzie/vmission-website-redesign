import React from 'react';

interface Props {
  variant?: 'primary' | 'monochrome-light' | 'monochrome-dark' | 'emblem-only';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant = 'primary',
  size = 'md',
  showSubtitle = true,
  className = '',
}: Props) {
  const isDark = variant === 'monochrome-dark';
  const isLight = variant === 'monochrome-light';

  const omColor = isLight ? '#FFFFFF' : isDark ? '#1B1714' : '#D95D39';
  const titleColor = isLight ? '#FFFFFF' : isDark ? '#1B1714' : '#262322';
  const subColor = isLight ? 'rgba(255,255,255,0.7)' : isDark ? '#5E5852' : '#8F8880';

  const scale = size === 'sm' ? 0.85 : size === 'lg' ? 1.25 : 1;
  const emblemSize = Math.round(36 * scale);

  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.round(10 * scale)}px`,
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* Sacred Emblem: Geometric Sun / Lotus / Om Crest */}
      <svg
        width={emblemSize}
        height={emblemSize}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Outer Circular Aura */}
        <circle
          cx="22"
          cy="22"
          r="20"
          stroke={omColor}
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.6"
        />
        {/* Inner Solid Sanctuary Ring */}
        <circle cx="22" cy="22" r="16" stroke={omColor} strokeWidth="1.25" />

        {/* 8-Ray Jyoti (Light of Knowledge) */}
        <line x1="22" y1="3" x2="22" y2="5" stroke={omColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="39" x2="22" y2="41" stroke={omColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="22" x2="5" y2="22" stroke={omColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="39" y1="22" x2="41" y2="22" stroke={omColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="8.5" y1="8.5" x2="10" y2="10" stroke={omColor} strokeWidth="1.75" strokeLinecap="round" />
        <line x1="34" y1="34" x2="35.5" y2="35.5" stroke={omColor} strokeWidth="1.75" strokeLinecap="round" />
        <line x1="8.5" y1="35.5" x2="10" y2="34" stroke={omColor} strokeWidth="1.75" strokeLinecap="round" />
        <line x1="34" y1="10" x2="35.5" y2="8.5" stroke={omColor} strokeWidth="1.75" strokeLinecap="round" />

        {/* Sacred Om Symbol in Central Sanctum */}
        <text
          x="22"
          y="27"
          fontFamily="var(--font-serif), Georgia, serif"
          fontSize="17"
          fontWeight="600"
          fill={omColor}
          textAnchor="middle"
        >
          ॐ
        </text>
      </svg>

      {variant !== 'emblem-only' && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: `${1.05 * scale}rem`,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: titleColor,
              textTransform: 'uppercase',
            }}
          >
            Vedanta Mission
          </span>
          {showSubtitle && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: `${0.6875 * scale}rem`,
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: subColor,
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Indore · Central India
            </span>
          )}
        </div>
      )}
    </div>
  );
}
