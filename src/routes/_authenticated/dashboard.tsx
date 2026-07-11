import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type App = {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_date: string | null;
  deadline: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

const statusColors: Record<string, string> = {
  wishlist: "var(--color-muted-foreground)",
  applied: "var(--color-info)",
  interviewing: "var(--color-warning)",
  offer: "var(--color-success)",
  accepted: "var(--color-primary)",
  rejected: "var(--color-destructive)",
};

function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["applications-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("id,company,position,status,applied_date,deadline,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as App[];
    },
  });

  const apps = data ?? [];
  const total = apps.length;
  const interviews = apps.filter((a) => a.status === "interviewing").length;
  const offers = apps.filter((a) => a.status === "offer" || a.status === "accepted").length;
  const rejections = apps.filter((a) => a.status === "rejected").length;

  const upcoming = apps
    .filter((a) => a.deadline && new Date(a.deadline) >= new Date())
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 5);

  // Status distribution
  const statusData = Object.keys(statusColors).map((s) => ({
    name: s,
    value: apps.filter((a) => a.status === s).length,
    color: statusColors[s],
  }));

  // Last 6 months trend
  const now = new Date();
  const monthly = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const key = format(d, "MMM");
    const count = apps.filter((a) => {
      const created = new Date(a.created_at);
      return created.getFullYear() === d.getFullYear() && created.getMonth() === d.getMonth();
    }).length;
    return { month: key, applications: count };
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your job search at a glance.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Applications"
          value={total}
          icon={Briefcase}
          tint="var(--color-primary)"
          loading={isLoading}
        />
        <StatCard
          label="Interviews"
          value={interviews}
          icon={Users}
          tint="var(--color-warning)"
          loading={isLoading}
        />
        <StatCard
          label="Offers"
          value={offers}
          icon={CheckCircle2}
          tint="var(--color-success)"
          loading={isLoading}
        />
        <StatCard
          label="Rejections"
          value={rejections}
          icon={XCircle}
          tint="var(--color-destructive)"
          loading={isLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" />
              Applications over time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={monthly}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Bar dataKey="applications" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData.filter((s) => s.value > 0)}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {statusData.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs">
              {statusData
                .filter((s) => s.value > 0)
                .map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5 capitalize">
                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    {s.name} · {s.value}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarClock className="h-4 w-4 text-primary" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : upcoming.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No upcoming deadlines. Add applications with deadlines to see them here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {upcoming.map((a) => (
                <li key={a.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{a.position}</div>
                    <div className="truncate text-sm text-muted-foreground">{a.company}</div>
                  </div>
                  <div className="ml-4 flex shrink-0 items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {a.status}
                    </Badge>
                    <span className="text-sm font-medium">
                      {format(new Date(a.deadline!), "MMM d, yyyy")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  loading: boolean;
}) {
  return (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            {loading ? (
              <Skeleton className="mt-2 h-9 w-16" />
            ) : (
              <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
            )}
          </div>
          <div
            className="grid h-10 w-10 place-items-center rounded-lg"
            style={{ background: `color-mix(in oklab, ${tint} 15%, transparent)`, color: tint }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
