import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  FileText,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">HirePilot AI</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="gradient-brand text-primary-foreground">
              <Link to="/auth" search={{ mode: "signup" }}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-32">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Powered by Lovable AI · Live now
          </div>
          <h1 className="mx-auto max-w-4xl text-balance text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            The <span className="gradient-brand-text">AI copilot</span> for your job search
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Track every application, get instant AI resume feedback for any job description, and
            never miss a deadline. Built for students, powerful enough for recruiters.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gradient-brand text-primary-foreground shadow-glow">
              <Link to="/auth" search={{ mode: "signup" }}>
                Start free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>

          {/* Preview card */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-2xl border border-border/70 surface-glass p-2 shadow-elegant">
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-background/60 p-6 sm:grid-cols-4">
                {[
                  { label: "Applications", value: "42", icon: FileText },
                  { label: "Interviews", value: "8", icon: Target },
                  { label: "Offers", value: "3", icon: CheckCircle2 },
                  { label: "Match score", value: "87%", icon: Brain },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4 text-left">
                    <s.icon className="h-5 w-5 text-primary" />
                    <div className="mt-3 text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Everything you need to land the role</h2>
          <p className="mt-4 text-muted-foreground">
            A modern applicant tracking system with AI baked into every step.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "AI Resume Matching",
              desc: "Paste any job description and get an instant match score, missing skills, and rewrite suggestions.",
            },
            {
              icon: BarChart3,
              title: "Real-time Analytics",
              desc: "See your funnel from applied to offer. Understand what's working and what to change.",
            },
            {
              icon: Zap,
              title: "Never miss a deadline",
              desc: "Track statuses, notes and upcoming deadlines. Everything in one calm workspace.",
            },
          ].map((f) => (
            <Card key={f.title} className="hover-lift border-border/70 p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="border-t border-border/60 bg-muted/20 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">From chaos to clarity in 3 steps</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Add your applications", d: "Log every role in seconds with company, position, status, and notes." },
              { n: "02", t: "Analyze your resume", d: "Match your resume against a JD and get concrete AI suggestions." },
              { n: "03", t: "Track your funnel", d: "Watch interviews and offers roll in from your live dashboard." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border/70 bg-card/60 p-6">
                <div className="text-sm font-mono text-primary">{s.n}</div>
                <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <div className="rounded-3xl border border-border/70 gradient-brand p-12 shadow-glow">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Start free. Land your dream job.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            No credit card required. Sign up in 30 seconds and start tracking applications today.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/auth" search={{ mode: "signup" }}>
              Create your free account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} HirePilot AI. Built with love.
      </footer>
    </div>
  );
}
