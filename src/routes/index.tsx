import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  IcArrowRight,
  IcCheck,
  IcBriefcase,
  IcCalendar,
  IcTrend,
  IcScan,
  IcTarget,
} from "@/components/icons";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            to="/"
            aria-label="Hiredge home"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Logo showWordmark />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#workflow" className="hover:text-foreground transition-colors">Workflow</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          </nav>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/auth" search={{ mode: "signup" }}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-14 md:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
              Job Search OS
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-[52px] md:leading-[1.05]">
              Your job search, organized from application to offer.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Hiredge is a focused workspace for tracking applications, staying on top of
              deadlines, and reviewing your funnel — with lightweight resume insights when
              you need them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Button asChild size="lg" className="h-10 bg-foreground text-background hover:bg-foreground/90">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Create free account
                  <IcArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-10">
                <a href="#workflow">See how it works</a>
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

          <DashboardPreview />
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A simple loop that keeps you moving.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Capture the role",
                d: "Save any opportunity with company, position, link, deadline, and notes — in seconds.",
              },
              {
                n: "02",
                t: "Track the pipeline",
                d: "Move applications through Saved, Applied, Interview, Offer, and Rejected as things progress.",
              },
              {
                n: "03",
                t: "Review and adjust",
                d: "See your funnel and upcoming deadlines so you know what needs attention next.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-lg border border-border bg-card p-6"
              >
                <span className="font-mono text-xs text-primary">{s.n}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Core features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for the work, not for demos.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <IcBriefcase size={16} />,
                t: "Application tracking",
                d: "One source of truth for every role you're considering, applied to, or interviewing for.",
              },
              {
                icon: <IcCalendar size={16} />,
                t: "Deadline reminders",
                d: "Upcoming deadlines surface on your dashboard so nothing slips.",
              },
              {
                icon: <IcTrend size={16} />,
                t: "Funnel analytics",
                d: "Understand your pipeline with charts based on your own data — no fabricated numbers.",
              },
              {
                icon: <IcScan size={16} />,
                t: "Resume insights (Beta)",
                d: "Paste a resume and a job description to see matched and missing keywords.",
              },
            ].map((f) => (
              <div key={f.t} className="rounded-lg border border-border bg-card p-5">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-muted text-primary">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight">{f.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Privacy</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your search is yours.
            </h2>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Hiredge stores your applications and notes in a private workspace scoped to
              your account. Row-level access controls mean only you can read your data.
            </p>
            <p>
              Resume insights run as a transparent keyword comparison — nothing is scraped,
              shared, or used to train a model. You can delete your account and all its
              data at any time.
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

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Track smarter. Get hired faster.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Start organizing your search in under a minute.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <Button asChild size="lg" className="h-10 bg-foreground text-background hover:bg-foreground/90">
            <Link to="/auth" search={{ mode: "signup" }}>
              Create free account <IcArrowRight size={15} className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-10">
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:px-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span>© {new Date().getFullYear()} Hiredge</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <Link to="/auth" className="hover:text-foreground transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Dashboard preview (illustrative UI only, no fake metrics) ---------- */

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="rounded-xl border border-border bg-card p-2 shadow-sm">
        <div className="rounded-lg border border-border/70 bg-background">
          <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted" />
              <span className="h-2 w-2 rounded-full bg-muted" />
              <span className="h-2 w-2 rounded-full bg-muted" />
            </div>
            <div className="ml-1 rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              hiredge.app / dashboard
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 p-3">
            <div className="col-span-12 flex items-center gap-2 sm:col-span-3 sm:flex-col sm:items-stretch">
              <Logo showWordmark size={22} />
              <div className="ml-auto flex gap-1 sm:ml-0 sm:mt-3 sm:flex-col">
                {[
                  { i: <IcBriefcase size={12} />, l: "Dashboard", a: true },
                  { i: <IcBriefcase size={12} />, l: "Applications" },
                  { i: <IcScan size={12} />, l: "Resume" },
                  { i: <IcTarget size={12} />, l: "Settings" },
                ].map((r) => (
                  <div
                    key={r.l}
                    className={
                      "flex items-center gap-1.5 rounded px-1.5 py-1 text-[10px] " +
                      (r.a ? "bg-muted text-foreground" : "text-muted-foreground")
                    }
                  >
                    {r.i}
                    <span className="hidden sm:inline">{r.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 space-y-2 sm:col-span-9">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: "Applications", v: "—" },
                  { l: "Interviews", v: "—" },
                  { l: "Offers", v: "—" },
                ].map((s) => (
                  <div key={s.l} className="rounded-md border border-border/70 bg-card p-2">
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                    <div className="mt-1 font-mono text-base font-semibold">{s.v}</div>
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
                    { l: "Applied", w: 70 },
                    { l: "Interview", w: 42 },
                    { l: "Offer", w: 14 },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center gap-2">
                      <span className="w-14 text-[9px] text-muted-foreground">{r.l}</span>
                      <div className="h-1.5 flex-1 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary/70"
                          style={{ width: `${r.w}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-border/70 rounded-md border border-border/70 bg-card">
                {[
                  { p: "Frontend Engineer", c: "Company A", s: "Interview" },
                  { p: "Product Designer", c: "Company B", s: "Applied" },
                  { p: "Data Analyst", c: "Company C", s: "Saved" },
                ].map((r) => (
                  <div key={r.p} className="flex items-center justify-between px-2 py-1.5 text-[10px]">
                    <div className="min-w-0 truncate">
                      <span className="font-medium">{r.p}</span>
                      <span className="text-muted-foreground"> · {r.c}</span>
                    </div>
                    <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
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
