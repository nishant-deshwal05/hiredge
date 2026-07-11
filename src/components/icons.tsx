/**
 * Custom icon set (no lucide) — hand-crafted 1.5px stroke, currentColor.
 * Each icon: 24x24 viewbox, `size` prop, `className` for color.
 */
type IconProps = {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
};

const wrap = (children: React.ReactNode, size: number | string, className?: string, sw = 1.5) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {children}
  </svg>
);

export const IcDashboard = ({ size = 18, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>,
    size, className, strokeWidth,
  );

export const IcBriefcase = ({ size = 18, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 13h18" />
      <path d="M11 12v2" />
    </>,
    size, className, strokeWidth,
  );

export const IcScan = ({ size = 18, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M4 7V5a1 1 0 0 1 1-1h2" />
      <path d="M20 7V5a1 1 0 0 0-1-1h-2" />
      <path d="M4 17v2a1 1 0 0 0 1 1h2" />
      <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
      <path d="M7 12h10" />
      <path d="M7 9h6" />
      <path d="M7 15h8" />
    </>,
    size, className, strokeWidth,
  );

export const IcSettings = ({ size = 18, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>,
    size, className, strokeWidth,
  );

export const IcArrowRight = ({ size = 16, className, strokeWidth = 2 }: IconProps) =>
  wrap(
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>,
    size, className, strokeWidth,
  );

export const IcArrowUpRight = ({ size = 16, className, strokeWidth = 2 }: IconProps) =>
  wrap(
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>,
    size, className, strokeWidth,
  );

export const IcCheck = ({ size = 16, className, strokeWidth = 2 }: IconProps) =>
  wrap(<path d="M4 12l5 5L20 6" />, size, className, strokeWidth);

export const IcPlus = ({ size = 16, className, strokeWidth = 2 }: IconProps) =>
  wrap(
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>,
    size, className, strokeWidth,
  );

export const IcSearch = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-3.5-3.5" />
    </>,
    size, className, strokeWidth,
  );

export const IcFilter = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10 19h4" />
    </>,
    size, className, strokeWidth,
  );

export const IcEdit = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M4 20h4l10-10-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </>,
    size, className, strokeWidth,
  );

export const IcTrash = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
    </>,
    size, className, strokeWidth,
  );

export const IcExternal = ({ size = 16, className, strokeWidth = 1.75 }: IconProps) =>
  wrap(
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>,
    size, className, strokeWidth,
  );

export const IcSpark = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M12 7c0 3 2 5 5 5-3 0-5 2-5 5 0-3-2-5-5-5 3 0 5-2 5-5z" />
    </>,
    size, className, strokeWidth,
  );

export const IcTrend = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M4 17l6-6 4 4 6-8" />
      <path d="M14 7h6v6" />
    </>,
    size, className, strokeWidth,
  );

export const IcCalendar = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>,
    size, className, strokeWidth,
  );

export const IcCheckCircle = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>,
    size, className, strokeWidth,
  );

export const IcX = ({ size = 16, className, strokeWidth = 2 }: IconProps) =>
  wrap(
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>,
    size, className, strokeWidth,
  );

export const IcUsers = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15 20c0-2.5 1.8-4.5 4-4.5" />
    </>,
    size, className, strokeWidth,
  );

export const IcLogout = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M15 8l4 4-4 4" />
      <path d="M19 12H9" />
    </>,
    size, className, strokeWidth,
  );

export const IcSun = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>,
    size, className, strokeWidth,
  );

export const IcMoon = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
    size, className, strokeWidth,
  );

export const IcBolt = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(<path d="M13 3L5 14h6l-2 7 8-11h-6l2-7z" />, size, className, strokeWidth);

export const IcTarget = ({ size = 16, className, strokeWidth }: IconProps) =>
  wrap(
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>,
    size, className, strokeWidth,
  );

export const IcMenu = ({ size = 16, className, strokeWidth = 1.75 }: IconProps) =>
  wrap(
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>,
    size, className, strokeWidth,
  );

export const IcLoader = ({ size = 16, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    className={className + " animate-spin"}
    aria-hidden
  >
    <path d="M12 3a9 9 0 1 0 9 9" opacity="0.3" />
    <path d="M12 3a9 9 0 0 1 9 9" />
  </svg>
);
