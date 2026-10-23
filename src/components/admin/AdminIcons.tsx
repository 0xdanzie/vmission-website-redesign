import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const OverviewIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="11" y="3" width="6" height="6" rx="1.5" />
    <rect x="3" y="11" width="6" height="6" rx="1.5" />
    <rect x="11" y="11" width="6" height="6" rx="1.5" />
  </svg>
);

export const ContentIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H8l2 2h4.5A2.5 2.5 0 0 1 17 7.5v7a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5v-9z" />
  </svg>
);

export const PublicationsIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M4 4h12v12H4z" rx="1.5" />
    <path d="M7 7h6M7 10h6M7 13h4" />
  </svg>
);

export const TeachingsIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M10 2.5a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0v-5a3 3 0 0 0-3-3z" />
    <path d="M16 9.5a6 6 0 0 1-12 0" />
    <line x1="10" y1="15.5" x2="10" y2="18.5" />
    <line x1="7" y1="18.5" x2="13" y2="18.5" />
  </svg>
);

export const EventsIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="3" y="4" width="14" height="13" rx="2" />
    <line x1="13" y1="2" x2="13" y2="5" />
    <line x1="7" y1="2" x2="7" y2="5" />
    <line x1="3" y1="8" x2="17" y2="8" />
    <circle cx="7" cy="11.5" r="0.8" fill="currentColor" />
    <circle cx="10" cy="11.5" r="0.8" fill="currentColor" />
    <circle cx="13" cy="11.5" r="0.8" fill="currentColor" />
  </svg>
);

export const CoursesIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5V16a1 1 0 0 1-1.5.86L10 13.5l-5.5 3.36A1 1 0 0 1 3 16V5.5z" />
    <line x1="6.5" y1="7" x2="13.5" y2="7" />
    <line x1="6.5" y1="10" x2="11.5" y2="10" />
  </svg>
);

export const AcharyasIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    {/* Diya / Lamp motif */}
    <path d="M4 12c0 3.3 2.7 5 6 5s6-1.7 6-5H4z" />
    <path d="M10 3s2.5 2.5 2.5 4.5a2.5 2.5 0 0 1-5 0C7.5 5.5 10 3 10 3z" fill="currentColor" stroke="none" />
    <line x1="3" y1="17.5" x2="17" y2="17.5" />
  </svg>
);

export const MediaIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <polygon points="8.5,7 13.5,10 8.5,13" fill="currentColor" stroke="none" />
  </svg>
);

export const EnquiriesIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="3" y="4" width="14" height="12" rx="2" />
    <path d="m3 6 7 5 7-5" />
  </svg>
);

export const SevaIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="4" y="3" width="12" height="14" rx="1.5" />
    <line x1="7" y1="7" x2="13" y2="7" />
    <line x1="7" y1="10" x2="13" y2="10" />
    <path d="M7 13.5l1.5 1.5 4-4" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <circle cx="10" cy="10" r="3" />
    <path d="M16.5 10a6.5 6.5 0 0 0-.2-1.6l1.6-1.2-1.5-2.6-1.9.6a6.8 6.8 0 0 0-1.4-.8l-.3-2h-3l-.3 2a6.8 6.8 0 0 0-1.4.8l-1.9-.6-1.5 2.6 1.6 1.2A6.5 6.5 0 0 0 6 10c0 .5.1 1.1.2 1.6l-1.6 1.2 1.5 2.6 1.9-.6c.4.3.9.6 1.4.8l.3 2h3l.3-2c.5-.2 1-.5 1.4-.8l1.9.6 1.5-2.6-1.6-1.2c.1-.5.2-1.1.2-1.6z" />
  </svg>
);

export const AuditIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M6 3h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <line x1="7" y1="8" x2="13" y2="8" />
    <line x1="7" y1="11" x2="13" y2="11" />
    <line x1="7" y1="14" x2="10" y2="14" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <line x1="8" y1="3" x2="8" y2="13" />
    <line x1="3" y1="8" x2="13" y2="8" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" />
    <line x1="10.5" y1="10.5" x2="14" y2="14" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M2.5 8a5.5 5.5 0 0 1 9.3-3.9L13.5 6M13.5 2v4h-4" />
    <path d="M13.5 8a5.5 5.5 0 0 1-9.3 3.9L2.5 10M2.5 14v-4h4" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <polyline points="3 8.5 6.5 12 13 4" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
    <polyline points="8 4.5 8 8 10.5 9.5" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <line x1="4" y1="4" x2="12" y2="12" />
    <line x1="12" y1="4" x2="4" y2="12" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M8 1.5s5 1.5 5 4.5c0 4.5-3.5 7.5-5 8.5-1.5-1-5-4-5-8.5 0-3 5-4.5 5-4.5z" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size = 16, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="3" y="7" width="10" height="7" rx="1.5" />
    <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M12 9v4H3V4h4M9 2h5v5M7 9l7-7" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <rect x="2" y="3" width="12" height="10" rx="1.5" />
    <path d="m2 5 6 4 6-4" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M14.5 11.2v2a1.3 1.3 0 0 1-1.4 1.3A12.7 12.7 0 0 1 1.5 2.9 1.3 1.3 0 0 1 2.8 1.5h2a1.3 1.3 0 0 1 1.3 1.1c.1.8.3 1.6.6 2.3.2.5.1 1-.3 1.4L5.3 7.4a10.1 10.1 0 0 0 4.3 4.3l1.1-1.1c.4-.4.9-.5 1.4-.3.7.3 1.5.5 2.3.6a1.3 1.3 0 0 1 1.1 1.3z" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M11.5 2.5a1.8 1.8 0 0 1 2.5 2.5L5 14l-3.5 1 1-3.5 9-9z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M2.5 4.5h11M5.5 4.5v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M12.5 4.5v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-9" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <path d="M2 2l12 12M6.7 6.7a2 2 0 0 0 2.6 2.6M4.2 4.4C2.8 5.4 1.5 8 1.5 8s2.5 4.5 6.5 4.5c1.4 0 2.7-.5 3.8-1.3M7 3.6c.3 0 .7 0 1 .1 4 0 6.5 4.3 6.5 4.3s-.9 1.6-2.3 2.7" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 18, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} style={style} aria-hidden="true">
    <line x1="3" y1="5" x2="17" y2="5" />
    <line x1="3" y1="10" x2="17" y2="10" />
    <line x1="3" y1="15" x2="17" y2="15" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <line x1="3" y1="8" x2="13" y2="8" />
    <polyline points="9 4 13 8 9 12" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 14, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <line x1="13" y1="8" x2="3" y2="8" />
    <polyline points="7 4 3 8 7 12" />
  </svg>
);
