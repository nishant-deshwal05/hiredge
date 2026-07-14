import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  IcArrowRight,
  IcArrowUpRight,
  IcCheck,
  IcBriefcase,
  IcCalendar,
  IcTrend,
  IcScan,
  IcSearch,
  IcFilter,
  IcTarget,
  IcMenu,
  IcX,
} from "@/components/icons";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <EdgeMarker />
        <Workflow />
        <Features />
        <Privacy />
        <FinalCTA />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ============================== HEADER ============================== */

function SiteHeader() {
  const [open, setOpen] = useState(false);

  const navLinks: Array<{ href: string; label: string }> = [
    { href: "#workflow", label: "Workflow" },
    { href: "#features", label: "Features" },
    { href: "#privacy", label: "Privacy" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          to="/"
          aria-label="Hiredge home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo showWordmark />
        </Link>

        <nav aria-label="Primary" className="ml-8 hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Button asChild variant="ghost" size="sm" className="hidden text-[13px] sm:inline-flex">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-md bg-foreground px-3 text-[13px] font-medium text-background hover:bg-foreground/90"
          >
            <Link to="/auth" search={{ mode: "signup" }}>
              Get started
            </Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground md:hidden"
          >
            {open ? <IcX size={16} /> : <IcMenu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ============================== HERO ============================== */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Signature backdrop: soft grid + a single emerald rising edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
      />
      <RisingEdge className="pointer-events-none absolute -right-10 top-10 hidden h-[420px] w-[520px] text-primary/30 lg:block" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-14 md:pb-28 md:pt-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-ring" />
            Job Search OS
          </div>

          <h1 className="mt-5 text-balance text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[56px] md:leading-[1.02]">
            Your job search,
            <br className="hidden sm:block" />{" "}
            <span className="text-emerald-gradient">organized</span> from
            <br className="hidden sm:block" /> application to offer.
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            Hiredge is a focused workspace to capture opportunities, track every application,
            prepare for interviews, and see your pipeline move — without the spreadsheet chaos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-md bg-foreground px-5 text-[14px] font-medium text-background hover:bg-foreground/90"
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                Start organizing free
                <IcArrowRight size={15} className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-md border-border bg-transparent px-5 text-[14px] hover:bg-muted"
            >
              <a href="#workflow">
                See how it works
              </a>
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <IcCheck size={12} className="text-primary" /> Free while in beta
            </li>
            <li className="inline-flex items-center gap-1.5">
              <IcCheck size={12} className="text-primary" /> No credit card required
            </li>
            <li className="inline-flex items-center gap-1.5">
              <IcCheck size={12} className="text-primary" /> Your data stays yours
            </li>
          </ul>
        </div>

        <div className="relative">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

/* Signature motif — the abstract rising edge, used tastefully */
function RisingEdge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 420" fill="none" className={className} aria-hidden>
      <path
        d="M20 360 L160 300 L240 330 L360 180 L500 60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="500" cy="60" r="4" fill="currentColor" />
      <circle cx="360" cy="180" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="240" cy="330" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="160" cy="300" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function EdgeMarker() {
  return (
    <div className="border-b border-border/60 bg-muted/20">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-5 sm:px-6">
        <div className="hidden shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:flex">
          <span className="inline-block h-px w-6 bg-border" />
          Built for the modern job seeker
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-muted-foreground sm:justify-end">
          <span>Zero spreadsheets</span>
          <Dot />
          <span>One workspace</span>
          <Dot />
          <span>Real analytics</span>
          <Dot />
          <span>Private by default</span>
        </div>
      </div>
    </div>
  );
}
function Dot() {
  return <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />;
}

/* ============================== WORKFLOW ============================== */

function Workflow() {
  const steps = [
    {
      n: "01",
      t: "Capture opportunities",
      d: "Save any role in seconds — company, position, link, deadline, notes. Nothing gets lost between tabs.",
      icon: <IcTarget size={16} />,
    },
    {
      n: "02",
      t: "Organize applications",
      d: "Move roles through Saved, Applied, Assessment, Interview, and Offer as the process unfolds.",
      icon: <IcBriefcase size={16} />,
    },
    {
      n: "03",
      t: "Prepare for interviews",
      d: "See what's coming up next and revisit the notes and links that matter, right when you need them.",
      icon: <IcCalendar size={16} />,
    },
    {
      n: "04",
      t: "Track progress to offer",
      d: "A live funnel shows exactly where your pipeline is stalling — so you know what to adjust.",
      icon: <IcTrend size={16} />,
    },
  ];

  return (
    <section id="workflow" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">The loop</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A simple ritual that
              <br /> compounds into offers.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Every serious search follows the same four moves. Hiredge makes them
              effortless to repeat until the offer lands.
            </p>
          </div>

          <ol className="relative grid gap-3 sm:grid-cols-2">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group relative rounded-xl border border-border bg-card p-5 hover-lift"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background text-primary">
                    {s.icon}
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                    STEP {s.n}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================== FEATURES (BENTO) ============================== */

function Features() {
  return (
    <section id="features" className="border-b border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            What's inside
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything a job search actually needs.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            No dashboards for the sake of dashboards. Every surface earns its place.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-6 md:grid-rows-2">
          {/* Big card: Pipeline */}
          <Card className="md:col-span-4 md:row-span-2">
            <CardEyebrow icon={<IcBriefcase size={13} />}>Application tracking</CardEyebrow>
            <CardTitle>The pipeline, at a glance.</CardTitle>
            <CardBody>
              Every role, every stage — with sort, search, and status all in one clean list.
              No more hunting through email threads.
            </CardBody>
            <div className="mt-6">
              <PipelinePreview />
            </div>
          </Card>

          {/* Search & filters */}
          <Card className="md:col-span-2">
            <CardEyebrow icon={<IcSearch size={13} />}>Search &amp; filters</CardEyebrow>
            <CardTitle>Find any role in seconds.</CardTitle>
            <CardBody>
              Filter by status, sort by deadline, or search by company — instantly.
            </CardBody>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Saved", "Applied", "Interview", "Offer"].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  <IcFilter size={10} /> {f}
                </span>
              ))}
            </div>
          </Card>

          {/* Deadlines */}
          <Card className="md:col-span-2">
            <CardEyebrow icon={<IcCalendar size={13} />}>Deadlines</CardEyebrow>
            <CardTitle>Nothing slips.</CardTitle>
            <CardBody>
              Upcoming deadlines surface on your dashboard so the next move is always obvious.
            </CardBody>
            <div className="mt-5 space-y-1.5">
              {[
                { d: "Tue", l: "Application due" },
                { d: "Thu", l: "Follow-up" },
                { d: "Fri", l: "Interview" },
              ].map((r) => (
                <div
                  key={r.d}
                  className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-1.5 text-[12px]"
                >
                  <span className="font-mono text-muted-foreground">{r.d}</span>
                  <span>{r.l}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Analytics */}
          <Card className="md:col-span-2">
            <CardEyebrow icon={<IcTrend size={13} />}>Dashboard insights</CardEyebrow>
            <CardTitle>Your funnel, honestly.</CardTitle>
            <CardBody>
              Charts drawn from your data — never invented numbers. See where things stall.
            </CardBody>
            <div className="mt-5 space-y-1.5">
              {[
                { l: "Saved", w: 100 },
                { l: "Applied", w: 68 },
                { l: "Interview", w: 34 },
                { l: "Offer", w: 12 },
              ].map((r) => (
                <div key={r.l} className="flex items-center gap-2">
                  <span className="w-16 text-[10px] text-muted-foreground">{r.l}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary/70" style={{ width: `${r.w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resume insights */}
          <Card className="md:col-span-2">
            <CardEyebrow icon={<IcScan size={13} />}>
              Resume insights <BetaTag />
            </CardEyebrow>
            <CardTitle>Match your resume to the JD.</CardTitle>
            <CardBody>
              A transparent keyword comparison highlights what you cover — and what's missing.
            </CardBody>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {[
                { l: "TypeScript", ok: true },
                { l: "React", ok: true },
                { l: "GraphQL", ok: false },
                { l: "PostgreSQL", ok: true },
                { l: "AWS", ok: false },
              ].map((k) => (
                <span
                  key={k.l}
                  className={
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] " +
                    (k.ok
                      ? "border border-primary/25 bg-primary/10 text-primary"
                      : "border border-border bg-background text-muted-foreground")
                  }
                >
                  {k.ok ? <IcCheck size={10} /> : <IcX size={10} />} {k.l}
                </span>
              ))}
            </div>
          </Card>

          {/* Status pipeline (wide) */}
          <Card className="md:col-span-2">
            <CardEyebrow icon={<IcTarget size={13} />}>Status pipeline</CardEyebrow>
            <CardTitle>Six stages, one flow.</CardTitle>
            <CardBody>
              Saved → Applied → Assessment → Interview → Offer → Rejected. Move roles as they move.
            </CardBody>
            <div className="mt-5 flex items-center gap-1 overflow-hidden">
              {["Saved", "Applied", "Assess.", "Interview", "Offer"].map((s, i) => (
                <div key={s} className="flex min-w-0 items-center gap-1">
                  <span className="truncate rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {s}
                  </span>
                  {i < 4 && <IcArrowRight size={10} className="shrink-0 text-muted-foreground/60" />}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative flex flex-col rounded-xl border border-border bg-card p-6 hover-lift ${className}`}>
      {children}
    </div>
  );
}
function CardEyebrow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {children}
    </div>
  );
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-3 text-[17px] font-semibold tracking-tight">{children}</h3>;
}
function CardBody({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{children}</p>;
}
function BetaTag() {
  return (
    <span className="ml-1 rounded-sm border border-primary/30 bg-primary/10 px-1 py-px text-[9px] font-medium text-primary">
      BETA
    </span>
  );
}

function PipelinePreview() {
  const rows = [
    { p: "Senior Frontend Engineer", c: "Linear", s: "Interview", d: "Fri" },
    { p: "Product Designer", c: "Vercel", s: "Applied", d: "Mon" },
    { p: "Full-stack Engineer", c: "Raycast", s: "Assessment", d: "Wed" },
    { p: "Data Analyst", c: "Stripe", s: "Saved", d: "—" },
  ];
  const tone: Record<string, string> = {
    Interview: "border-primary/30 bg-primary/10 text-primary",
    Applied: "border-border bg-background text-foreground",
    Assessment: "border-border bg-background text-muted-foreground",
    Saved: "border-border bg-background text-muted-foreground",
  };
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background/60">
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Role</span>
        <span className="hidden sm:inline">Status</span>
        <span>Due</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.p} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-2.5 text-[12.5px]">
            <div className="min-w-0">
              <div className="truncate font-medium">{r.p}</div>
              <div className="truncate text-[11px] text-muted-foreground">{r.c}</div>
            </div>
            <span className={`hidden shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] sm:inline-flex ${tone[r.s]}`}>
              {r.s}
            </span>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== PRIVACY ============================== */

function Privacy() {
  return (
    <section id="privacy" className="border-b border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr] md:py-28">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Privacy</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your search is yours.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Hiredge is a workspace, not a data broker. Nothing you write is shared,
            trained on, or sold — ever.
          </p>
        </div>
        <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Applications, notes, and resume drafts live in a private workspace scoped to
            your account. Row-level access controls mean only you can read your data.
          </p>
          <p>
            Resume insights run as a transparent keyword comparison — nothing is scraped
            or used to train a model. Delete your account and its data at any time.
          </p>
          <ul className="grid gap-2 pt-2 sm:grid-cols-2">
            {[
              "Per-user data isolation",
              "No third-party trackers",
              "Export or delete on request",
              "HTTPS everywhere",
            ].map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                <IcCheck size={14} className="mt-0.5 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================== CTA ============================== */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-bg opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_60%_at_50%_50%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Job Search OS
        </div>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Track smarter.{" "}
          <span className="text-emerald-gradient">Get hired faster.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
          Start organizing your search in under a minute. Free while in beta —
          no credit card required.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-md bg-foreground px-5 text-[14px] font-medium text-background hover:bg-foreground/90"
          >
            <Link to="/auth" search={{ mode: "signup" }}>
              Create free account
              <IcArrowRight size={15} className="ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 rounded-md border-border bg-transparent px-5 text-[14px] hover:bg-muted"
          >
            <Link to="/auth">
              Sign in
              <IcArrowUpRight size={14} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo showWordmark />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            The Job Search OS. Capture, organize, and land your next role — without the spreadsheets.
          </p>
        </div>
        <FooterCol title="Product">
          <FooterLink href="#workflow">Workflow</FooterLink>
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#privacy">Privacy</FooterLink>
        </FooterCol>
        <FooterCol title="Account">
          <FooterRouterLink to="/auth">Sign in</FooterRouterLink>
          <FooterRouterLink to="/auth" search={{ mode: "signup" }}>Create account</FooterRouterLink>
        </FooterCol>
        <FooterCol title="Info">
          <span className="text-[13px] text-muted-foreground">Currently in beta</span>
          <span className="text-[13px] text-muted-foreground">Made for job seekers</span>
        </FooterCol>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-[12px] text-muted-foreground sm:px-6">
          <span>© {new Date().getFullYear()} Hiredge</span>
          <span className="font-mono uppercase tracking-widest">v1.0 · beta</span>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">{title}</h4>
      {children}
    </div>
  );
}
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}
function FooterRouterLink({
  to,
  search,
  children,
}: {
  to: string;
  search?: { mode: "signup" };
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      search={search as never}
      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

/* ============================== DASHBOARD PREVIEW ============================== */

function DashboardPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-3xl bg-primary/[0.06] blur-2xl"
      />
      <div className="relative rounded-2xl border border-border bg-card/80 p-2 shadow-elegant">
        <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-border/70 bg-muted/30 px-3 py-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="ml-1 flex items-center gap-1 rounded bg-background/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
              hiredge.app / dashboard
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 p-3">
            {/* sidebar */}
            <aside className="col-span-12 flex items-center gap-2 sm:col-span-3 sm:flex-col sm:items-stretch">
              <div className="hidden sm:block">
                <Logo showWordmark size={22} />
              </div>
              <div className="ml-auto flex gap-1 sm:ml-0 sm:mt-4 sm:flex-col">
                {[
                  { i: <IcTarget size={12} />, l: "Dashboard", a: true },
                  { i: <IcBriefcase size={12} />, l: "Applications" },
                  { i: <IcScan size={12} />, l: "Resume" },
                  { i: <IcCalendar size={12} />, l: "Deadlines" },
                ].map((r) => (
                  <div
                    key={r.l}
                    className={
                      "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10.5px] transition-colors " +
                      (r.a
                        ? "bg-muted text-foreground ring-1 ring-inset ring-border"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {r.i}
                    <span className="hidden sm:inline">{r.l}</span>
                  </div>
                ))}
              </div>
            </aside>

            {/* main */}
            <div className="col-span-12 space-y-2 sm:col-span-9">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-medium">Overview</div>
                <div className="hidden items-center gap-1 rounded-md border border-border bg-card px-1.5 py-0.5 text-[9.5px] text-muted-foreground sm:flex">
                  <IcCalendar size={10} /> Last 30 days
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: "Applications", v: "24", trend: "+6" },
                  { l: "Interviews", v: "5", trend: "+2" },
                  { l: "Offers", v: "1", trend: "new" },
                ].map((s) => (
                  <div key={s.l} className="rounded-md border border-border/70 bg-card p-2">
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      {s.l}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <div className="font-mono text-base font-semibold tabular">{s.v}</div>
                      <div className="font-mono text-[9px] text-primary">{s.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-md border border-border/70 bg-card p-2">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-medium">Funnel</span>
                  <span className="font-mono text-[9px] text-muted-foreground">your data</span>
                </div>
                <div className="space-y-1">
                  {[
                    { l: "Saved", w: 100 },
                    { l: "Applied", w: 72 },
                    { l: "Interview", w: 42 },
                    { l: "Offer", w: 14 },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center gap-2">
                      <span className="w-14 text-[9px] text-muted-foreground">{r.l}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary/80"
                          style={{ width: `${r.w}%` }}
                        />
                      </div>
                      <span className="w-6 text-right font-mono text-[9px] text-muted-foreground">
                        {r.w}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-border/70 rounded-md border border-border/70 bg-card">
                {[
                  { p: "Senior Frontend Engineer", c: "Linear", s: "Interview" },
                  { p: "Product Designer", c: "Vercel", s: "Applied" },
                  { p: "Data Analyst", c: "Stripe", s: "Saved" },
                ].map((r) => (
                  <div key={r.p} className="flex items-center justify-between px-2 py-1.5 text-[10px]">
                    <div className="min-w-0 truncate">
                      <span className="font-medium">{r.p}</span>
                      <span className="text-muted-foreground"> · {r.c}</span>
                    </div>
                    <span
                      className={
                        "shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] " +
                        (r.s === "Interview"
                          ? "border-primary/30 bg-primary/10 text-primary"
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
