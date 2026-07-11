import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles, FileText, Briefcase, Loader2, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { analyzeResume } from "@/lib/resume-analysis.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type Analysis = {
  id: string;
  match_score: number;
  summary: string | null;
  missing_skills: string[];
  strengths: string[];
  suggestions: string[];
  created_at: string;
  job_description: string;
};

export const Route = createFileRoute("/_authenticated/resume")({
  component: ResumePage,
});

function ResumePage() {
  const qc = useQueryClient();
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [current, setCurrent] = useState<Analysis | null>(null);
  const analyzeFn = useServerFn(analyzeResume);

  const { data: history } = useQuery({
    queryKey: ["resume-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resume_analyses")
        .select("id,match_score,summary,missing_skills,strengths,suggestions,created_at,job_description")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data as Analysis[];
    },
  });

  const analyze = useMutation({
    mutationFn: async () => {
      return (await analyzeFn({
        data: { resume_text: resume, job_description: jd },
      })) as Analysis;
    },
    onSuccess: (data) => {
      setCurrent(data);
      qc.invalidateQueries({ queryKey: ["resume-history"] });
      toast.success("Analysis complete");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const uploadResume = async (file: File) => {
    const text = await file.text();
    setResume(text);
    toast.success(`Loaded ${file.name}`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Match your resume against any job description — powered by AI.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="resume-upload"
                className="cursor-pointer rounded-md border border-input px-3 py-1.5 text-xs hover:bg-accent"
              >
                Upload .txt / .md
              </Label>
              <input
                id="resume-upload"
                type="file"
                accept=".txt,.md,text/plain"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && uploadResume(e.target.files[0])}
              />
              <span className="text-xs text-muted-foreground">or paste below</span>
            </div>
            <Textarea
              placeholder="Paste your resume text..."
              rows={14}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              maxLength={30000}
            />
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="h-4 w-4 text-primary" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="Paste the job description you're targeting..."
              rows={16}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              maxLength={20000}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => analyze.mutate()}
          disabled={analyze.isPending || resume.length < 20 || jd.length < 20}
          size="lg"
          className="gradient-brand text-primary-foreground shadow-glow"
        >
          {analyze.isPending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Analyze with AI</>
          )}
        </Button>
      </div>

      {current && <AnalysisResult analysis={current} />}

      {history && history.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent analyses</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {history.map((h) => (
              <Card key={h.id} className="hover-lift cursor-pointer" onClick={() => setCurrent(h)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ScoreRing score={h.match_score} size={44} />
                      <div>
                        <div className="text-sm font-medium">{h.match_score}% match</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(h.created_at), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{h.missing_skills.length} gaps</Badge>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {h.summary ?? "—"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisResult({ analysis }: { analysis: Analysis }) {
  return (
    <Card className="border-primary/30 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <ScoreRing score={analysis.match_score} size={110} />
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Match score</span>
                <span className="font-semibold">{analysis.match_score}/100</span>
              </div>
              <Progress value={analysis.match_score} className="mt-2 h-2" />
            </div>
            {analysis.summary && (
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <InsightList
            icon={CheckCircle2}
            title="Strengths"
            tint="var(--color-success)"
            items={analysis.strengths}
          />
          <InsightList
            icon={AlertCircle}
            title="Missing Skills"
            tint="var(--color-destructive)"
            items={analysis.missing_skills}
          />
          <InsightList
            icon={Lightbulb}
            title="Suggestions"
            tint="var(--color-warning)"
            items={analysis.suggestions}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InsightList({
  icon: Icon,
  title,
  tint,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tint: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="grid h-7 w-7 place-items-center rounded-md"
          style={{ background: `color-mix(in oklab, ${tint} 15%, transparent)`, color: tint }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">Nothing to show.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((it, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: tint }} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ScoreRing({ score, size }: { score: number; size: number }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  const color =
    score >= 75 ? "var(--color-success)" : score >= 50 ? "var(--color-warning)" : "var(--color-destructive)";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-muted)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-lg font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}
