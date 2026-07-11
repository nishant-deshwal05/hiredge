import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  IcArrowRight,
  IcArrowUpRight,
  IcCheck,
  IcSpark,
  IcTrend,
  IcTarget,
  IcBolt,
  IcScan,
  IcBriefcase,
  IcCheckCircle,
} from "@/components/icons";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const COMPANIES = ["Stripe", "Linear", "Vercel", "Ramp", "Notion", "Anthropic", "Figma", "Airbnb"];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" aria-label="HirePilot AI">
            <Logo showWordmark size={30} />
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#workflow" className="hover:text-foreground transition-colors">Workflow</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/auth" search={{ mode: "signup" }}>
                Start free
                <IcArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--primary) 26%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-[520px] h-40 bg-gradient-to-b from-transparent to-background" />

        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-16 sm:pt-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="tabular">v1.0 — public beta</span>
              <span className="text-border">·</span>
              <span>Powered by Gemini</span>
            </div>

            <h1 className="animate-fade-up mt-7 text-balance text-5xl font-semibold tracking-[-0.03em] sm:text-6xl md:text-[76px] md:leading-[1.02]" style={{ animationDelay: "60ms" }}>
              The operating system<br />
              for your <span className="text-emerald-gradient">job search</span>.
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground" style={{ animationDelay: "120ms" }}>
              Track every application, get instant AI resume feedback on any job description,
              and ship offers — from one calm, keyboard-first workspace.
            </p>

            <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-2" style={{ animationDelay: "180ms" }}>
              <Button asChild size="lg" className="h-11 bg-foreground text-background hover:bg-foreground/90 px-5">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Get started — it's free
                  <IcArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-5">
                <a href="#features">
                  See how it works
                </a>
              </Button>
            </div>

            <div className="animate-fade-up mt-6 flex items-center gap-4 text-xs text-muted-foreground" style={{ animationDelay: "240ms" }}>
              <span className="inline-flex items-center gap-1.5"><IcCheck size={12} className="text-primary" /> No credit card</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5"><IcCheck size={12} className="text-primary" /> Ready in 30s</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5"><IcCheck size={12} className="text-primary" /> Private by default</span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="animate-fade-up mx-auto mt-20 max-w-5xl" style={{ animationDelay: "320ms" }}>
            <DashboardPreview />
          </div>
        </div>

        {/* Trusted-by marquee */}
        <div className="relative border-t border-border/60 py-8">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Students hired at
            </p>
            <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max gap-14 animate-marquee">
                {[...COMPANIES, ...COMPANIES].map((c, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap text-2xl font-semibold tracking-tight text-muted-foreground/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES bento */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Features</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built with the same care as the tools you already love — Linear, Stripe, Notion.
          </p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-6 md:grid-rows-2">
          <FeatureCard
            className="md:col-span-4"
            icon={<IcScan size={18} />}
            title="AI resume matching"
            desc="Paste any JD, get a match score, missing skills and rewrite suggestions in seconds."
          >
            <ResumePreview />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2"
            icon={<IcTarget size={18} />}
            title="Kanban-quiet tracking"
            desc="Track statuses, deadlines and notes without the noise."
          >
            <StatusPreview />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2"
            icon={<IcTrend size={18} />}
            title="Real-time analytics"
            desc="Understand what's working across your funnel."
          >
            <MiniChart />
          </FeatureCard>
          <FeatureCard
            className="md:col-span-4"
            icon={<IcBolt size={18} />}
            title="Keyboard-first, calm by design"
            desc="Every action reachable in two keystrokes. Zero clutter, zero anxiety."
          >
            <KeyboardPreview />
          </FeatureCard>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Workflow</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              From chaos to offers in three moves.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Capture", d: "Log every role with company, position, status and notes." },
              { n: "02", t: "Analyze", d: "Score your resume against any JD and rewrite it with AI." },
              { n: "03", t: "Advance", d: "Watch your funnel from applied to accepted, live." },
            ].map((s) => (
              <div
                key={s.n}
                className="surface-elevated hover-lift group rounded-xl p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="tabular font-mono text-xs text-primary">{s.n}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                <div className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                  Learn more <IcArrowUpRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-4xl px-5 py-24 text-center">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-12">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--primary) 40%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Start free. Land the offer.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Free forever for individuals. Bring your resume, we bring the AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Button asChild size="lg" className="h-11 bg-foreground text-background hover:bg-foreground/90 px-5">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Create your account <IcArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-5">
                <Link to="/auth">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Logo size={22} />
            <span>© {new Date().getFullYear()} HirePilot AI</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Preview widgets ---------- */

function DashboardPreview() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-2 rounded-3xl"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--primary) 25%, transparent), transparent 60%)",
          filter: "blur(30px)",
        }}
      />
      <div className="relative rounded-2xl border border-border bg-card p-2 shadow-elegant">
        <div className="rounded-xl border border-border/70 bg-background">
          {/* window bar */}
          <div className="flex items-center gap-3 border-b border-border/70 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            </div>
            <div className="ml-2 flex items-center gap-2 rounded-md bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              app.hirepilot.ai/dashboard
            </div>
          </div>
          {/* content */}
          <div className="grid grid-cols-12 gap-3 p-4">
            {/* Mini sidebar */}
            <div className="col-span-3 hidden flex-col gap-1 sm:flex">
              <Logo showWordmark size={22} />
              <div className="mt-4 space-y-0.5">
                {[
                  { i: <IcBriefcase size={14} />, l: "Dashboard", a: true },
                  { i: <IcBriefcase size={14} />, l: "Applications" },
                  { i: <IcScan size={14} />, l: "Resume" },
                  { i: <IcTarget size={14} />, l: "Settings" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className={
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] " +
                      (r.a ? "bg-muted text-foreground" : "text-muted-foreground")
                    }
                  >
                    {r.i}
                    <span>{r.l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Main */}
            <div className="col-span-12 space-y-3 sm:col-span-9">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { l: "Applications", v: "42", d: "+8" },
                  { l: "Interviews", v: "8", d: "+2" },
                  { l: "Offers", v: "3", d: "+1" },
                  { l: "Response rate", v: "62%", d: "+9%" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg border border-border/70 bg-card p-3 text-left">
                    <div className="text-[10px] text-muted-foreground">{s.l}</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <div className="tabular text-lg font-semibold">{s.v}</div>
                      <div className="text-[10px] text-primary tabular">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border/70 bg-card p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium">Application funnel</span>
                  <span className="text-[10px] text-muted-foreground tabular">last 30 days</span>
                </div>
                <BarSpark />
              </div>
              <div className="rounded-lg border border-border/70 bg-card">
                {[
                  { c: "Stripe", p: "New Grad SWE", s: "Interviewing" },
                  { c: "Linear", p: "Product Engineer", s: "Applied" },
                  { c: "Vercel", p: "Frontend Intern", s: "Offer" },
                ].map((r, i, arr) => (
                  <div
                    key={r.c}
                    className={
                      "flex items-center justify-between px-3 py-2.5 text-[11px]" +
                      (i < arr.length - 1 ? " border-b border-border/70" : "")
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 place-items-center rounded bg-muted text-[9px] font-semibold">
                        {r.c[0]}
                      </span>
                      <span className="font-medium">{r.p}</span>
                      <span className="text-muted-foreground">{r.c}</span>
                    </div>
                    <span
                      className={
                        "rounded-full border px-2 py-0.5 text-[10px] " +
                        (r.s === "Offer"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : r.s === "Interviewing"
                          ? "border-warning/30 bg-warning/10 text-warning"
                          : "border-border bg-muted text-muted-foreground")
                      }
                    >
                      {r.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarSpark() {
  const bars = [30, 46, 38, 62, 54, 78, 66, 88, 72, 92, 80, 100];
  return (
    <div className="flex h-16 items-end gap-1">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-primary/50 to-primary"
          style={{ height: `${b}%`, opacity: 0.4 + (i / bars.length) * 0.6 }}
        />
      ))}
    </div>
  );
}

function FeatureCard({
  className,
  icon,
  title,
  desc,
  children,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={
        "surface-elevated hover-lift relative flex flex-col overflow-hidden rounded-xl p-6 " +
        (className ?? "")
      }
    >
      <div className="flex items-center gap-2 text-primary">
        <span className="grid h-7 w-7 place-items-center rounded-md border border-primary/30 bg-primary/10">
          {icon}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.15em]">Feature</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{desc}</p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </div>
  );
}

function ResumePreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <div className="space-y-2 rounded-lg border border-border/70 bg-card p-3">
        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Missing skills
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["TypeScript", "GraphQL", "System Design", "PostgreSQL"].map((s) => (
            <span
              key={s}
              className="rounded border border-border bg-muted px-2 py-0.5 text-[10px]"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Suggestion
        </div>
        <div className="text-[11px] leading-relaxed text-muted-foreground">
          Lead with impact: "Shipped GraphQL API serving 12M reqs/day" beats
          "Worked on backend".
        </div>
      </div>
      <div className="grid place-items-center rounded-lg border border-primary/30 bg-primary/5 p-5 min-w-[120px]">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Match</div>
        <div className="tabular text-4xl font-semibold text-primary">87</div>
        <div className="text-[10px] text-primary">Strong fit</div>
      </div>
    </div>
  );
}

function StatusPreview() {
  const items = [
    { l: "Interviewing", n: 8, w: "70%" },
    { l: "Applied", n: 24, w: "100%" },
    { l: "Offer", n: 3, w: "26%" },
  ];
  return (
    <div className="space-y-2.5">
      {items.map((it) => (
        <div key={it.l} className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">{it.l}</span>
            <span className="tabular font-medium">{it.n}</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
              style={{ width: it.w }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniChart() {
  const pts = [10, 20, 14, 32, 26, 42, 38, 56, 50, 68];
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - p}`).join(" ");
  return (
    <div className="rounded-lg border border-border/70 bg-card p-3">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] text-muted-foreground">Response rate</div>
          <div className="tabular text-lg font-semibold">62%</div>
        </div>
        <div className="tabular text-[11px] text-primary">↑ 9%</div>
      </div>
      <svg viewBox="0 0 100 80" className="mt-2 h-16 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mini-f" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.19 156)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.72 0.19 156)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={`0,80 ${path} 100,80`} fill="url(#mini-f)" />
        <polyline points={path} fill="none" stroke="oklch(0.72 0.19 156)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function KeyboardPreview() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px]">
      {[
        ["N", "New application"],
        ["/", "Search"],
        ["R", "Resume scan"],
        ["G", "Go to dashboard"],
      ].map(([k, l]) => (
        <span
          key={k}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1"
        >
          <kbd className="grid h-5 min-w-5 place-items-center rounded border border-border bg-muted px-1 text-[10px] font-medium">
            {k}
          </kbd>
          <span className="text-muted-foreground">{l}</span>
        </span>
      ))}
    </div>
  );
}
