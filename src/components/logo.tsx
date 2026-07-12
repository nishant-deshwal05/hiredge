import { cn } from "@/lib/utils";

/**
 * Hiredge mark — an abstract upward path (three ascending segments forming
 * a rising edge) inside a rounded square. No gradients, no glow.
 */
export function Logo({
  className,
  size = 28,
  showWordmark = false,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="inline-grid place-items-center rounded-[7px] bg-foreground text-background"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          width={size * 0.62}
          height={size * 0.62}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rising edge — three ascending line segments */}
          <path
            d="M4 18 L9 14 L13 16 L20 6"
            stroke="var(--primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="6" r="1.6" fill="var(--primary)" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight">
          Hiredge
        </span>
      )}
    </span>
  );
}
