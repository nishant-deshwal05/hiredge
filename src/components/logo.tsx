import { cn } from "@/lib/utils";

/**
 * HirePilot AI mark — an emerald wing/arrow ascending inside a rounded
 * charcoal square. Custom SVG, no external icon.
 */
export function Logo({
  className,
  size = 32,
  showWordmark = false,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative inline-grid place-items-center rounded-[9px] bg-foreground text-background shadow-[0_1px_0_oklch(1_0_0/0.08)_inset,0_6px_18px_-6px_oklch(0_0_0/0.55)]"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg
          viewBox="0 0 32 32"
          width={size * 0.62}
          height={size * 0.62}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hp-em" x1="0" y1="32" x2="32" y2="0">
              <stop offset="0%" stopColor="oklch(0.62 0.19 156)" />
              <stop offset="100%" stopColor="oklch(0.85 0.18 156)" />
            </linearGradient>
          </defs>
          {/* Ascending wing / arrow — origami plane silhouette */}
          <path
            d="M4 24 L28 6 L20 26 L16 18 L4 24 Z"
            fill="url(#hp-em)"
          />
          <path
            d="M16 18 L28 6"
            stroke="oklch(0.18 0 0)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="pointer-events-none absolute inset-0 rounded-[9px]"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 10%, oklch(1 0 0 / 0.08), transparent 60%)",
          }}
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-semibold tracking-tight">
            HirePilot<span className="ml-1 text-primary">AI</span>
          </span>
        </span>
      )}
    </span>
  );
}
