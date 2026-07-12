import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, formatDistanceToNow } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IcArrowRight, IcBriefcase, IcCalendar, IcTrend } from "@/components/icons";
import { STATUS_ORDER, statusLabel, statusTone, type Status } from "@/lib/status";

type App = {
  id: string;
  company: string;
  position: string;
  status: Status;
  applied_date: string | null;
  deadline: string | null;
  created_at: string;
  updated_at: string | null;
};

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["applications-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("id,company,position,status,applied_date,deadline,created_at,updated_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as App[];
    },
  });

  if (isError) return <ErrorState message={(error as Error).message} onRetry={() => refetch()} />;

  const apps = data ?? [];
  const total = apps.length;
  const applied = apps.filter((a) => a.status === "applied").length;
  const interviews = apps.filter((a) => a.status === "interviewing").length;
  const offers = apps.filter((a) => a.status === "offer" || a.status === "accepted").length;

  const upcoming = apps
    .filter((a) => a.deadline && new Date(a.deadline) >= startOfToday())
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 5);

  const recent = [...apps]
    .sort((a, b) =>
      new Date(b.updated_at ?? b.created_at).getTime() -
      new Date(a.updated_at ?? a.created_at).getTime(),
    )
    .slice(0, 5);

  const funnel = STATUS_ORDER.map((s) => ({
    status: s,
    label: statusLabel(s),
    value: apps.filter((a) => a.status === s).length,
  }));

  const hasZeroData = !isLoading && total === 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your job search at a glance.</p>
        </div>
        <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
          <Link to="/applications">
            Add application <IcArrowRight size={14} className="ml-1.5" />
          </Link>
        </Button>
      </header>

      {hasZeroData ? (
        <EmptyState />
      ) : (
        <>
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total" value={total} loading={isLoading} />
            <StatCard label="Applied" value={applied} loading={isLoading} />
            <StatCard label="Interviewing" value={interviews} loading={isLoading} />
            <StatCard label="Offers" value={offers} loading={isLoading} accent />
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <IcTrend size={14} className="text-primary" />
                  Application funnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-60 w-full" />
                ) : (
                  <div className="h-60 w-full">
                    <ResponsiveContainer>
                      <BarChart data={funnel} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="label"
                          stroke="var(--color-muted-foreground)"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="var(--color-muted-foreground)"
                          fontSize={11}
                          allowDecimals={false}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: "var(--color-muted)" }}
                          contentStyle={{
                            background: "var(--color-popover)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 6,
                            fontSize: 12,
                            color: "var(--color-popover-foreground)",
                          }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {funnel.map((f) => (
                            <Cell
                              key={f.status}
                              fill={
                                f.status === "offer" || f.status === "accepted"
                                  ? "var(--color-primary)"
                                  : "color-mix(in oklab, var(--color-foreground) 65%, transparent)"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2.5">
                    {funnel.map((f) => {
                      const pct = total > 0 ? (f.value / total) * 100 : 0;
                      return (
                        <li key={f.status}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>{f.label}</span>
                            <span className="font-mono text-muted-foreground">{f.value}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary/70"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <IcCalendar size={14} className="text-primary" />
                  Upcoming deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <SkeletonList />
                ) : upcoming.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No deadlines in the next few weeks.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {upcoming.map((a) => (
                      <li key={a.id} className="flex items-center justify-between py-2.5">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{a.position}</div>
                          <div className="truncate text-xs text-muted-foreground">{a.company}</div>
                        </div>
                        <span className="ml-3 shrink-0 font-mono text-xs">
                          {format(new Date(a.deadline!), "MMM d")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <IcBriefcase size={14} className="text-primary" />
                  Recent activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <SkeletonList />
                ) : recent.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    Nothing here yet.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {recent.map((a) => (
                      <li key={a.id} className="flex items-center justify-between py-2.5">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{a.position}</div>
                          <div className="truncate text-xs text-muted-foreground">
                            {a.company} ·{" "}
                            {formatDistanceToNow(new Date(a.updated_at ?? a.created_at), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                        <StatusPill status={a.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

          <NextActions apps={apps} loading={isLoading} />
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  loading,
  accent,
}: {
  label: string;
  value: number;
  loading: boolean;
  accent?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {loading ? (
          <Skeleton className="mt-2 h-8 w-14" />
        ) : (
          <p
            className={
              "mt-1 font-mono text-3xl font-semibold tracking-tight " +
              (accent ? "text-primary" : "")
            }
          >
            {value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={
        "ml-3 shrink-0 rounded-full border px-2 py-0.5 text-[11px] " + statusTone(status)
      }
    >
      {statusLabel(status)}
    </span>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-2 py-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-muted text-primary">
          <IcBriefcase size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold tracking-tight">No applications yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first role to start tracking your search.
          </p>
        </div>
        <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
          <Link to="/applications">
            Add application <IcArrowRight size={14} className="ml-1.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Card className="border-destructive/40">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <h2 className="text-base font-semibold">Couldn't load your dashboard</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}

function NextActions({ apps, loading }: { apps: App[]; loading: boolean }) {
  const suggestions = buildSuggestions(apps);
  if (loading || suggestions.length === 0) return null;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Next actions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function buildSuggestions(apps: App[]): string[] {
  const out: string[] = [];
  const saved = apps.filter((a) => a.status === "wishlist").length;
  const interviewing = apps.filter((a) => a.status === "interviewing").length;
  const dueSoon = apps.filter(
    (a) =>
      a.deadline &&
      new Date(a.deadline) >= startOfToday() &&
      new Date(a.deadline).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000,
  ).length;

  if (dueSoon > 0) out.push(`${dueSoon} deadline${dueSoon === 1 ? "" : "s"} in the next 7 days — review them first.`);
  if (saved > 0) out.push(`${saved} saved role${saved === 1 ? "" : "s"} waiting to be applied to.`);
  if (interviewing > 0) out.push(`${interviewing} in interview stage — prep questions and follow-ups.`);
  if (out.length === 0) out.push("You're on top of things. Add a new role or update your latest activity.");
  return out;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
