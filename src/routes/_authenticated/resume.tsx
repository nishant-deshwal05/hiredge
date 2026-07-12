import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { IcScan, IcCheck, IcX, IcSpark } from "@/components/icons";

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

/** Stopwords excluded from keyword extraction. */
const STOPWORDS = new Set([
  "a","an","and","are","as","at","be","been","being","but","by","can","could","did","do","does","doing","done","for","from","had","has","have","having","he","her","here","him","his","how","i","if","in","into","is","it","its","just","me","more","my","of","on","or","our","ours","out","over","own","she","should","so","some","such","than","that","the","their","them","then","there","these","they","this","those","to","too","up","us","very","was","we","were","what","when","where","which","while","who","why","will","with","would","you","your","about","across","after","also","any","because","before","both","each","few","most","much","other","only","same","under","until","us","we're","you're","using","use","used","new","strong","excellent","good","great","ability","able","etc","must","need","needs","required","preferred","plus","years","year","team","teams","work","working","working","role","roles","candidate","candidates","opportunity","opportunities","company","join","looking","seeking","help","include","includes","including","across","one","two","three","four","five","10","5","3","+","–","-"
]);

const TECH_KEYWORDS = new Set([
  "react","typescript","javascript","node","node.js","python","java","c++","c#","go","rust","ruby","swift","kotlin","sql","postgres","postgresql","mysql","mongodb","redis","graphql","rest","aws","gcp","azure","docker","kubernetes","terraform","ci/cd","html","css","tailwind","next.js","nextjs","tanstack","vue","angular","svelte","express","django","flask","fastapi","spring","rails","dotnet",".net","git","linux","bash","figma","jira","agile","scrum","kanban","tdd","testing","jest","playwright","cypress","vitest","webpack","vite","kafka","spark","hadoop","tableau","excel","powerbi","looker","dbt","airflow","snowflake","bigquery","redshift","pytorch","tensorflow","scikit-learn","numpy","pandas","llm","nlp","ml","ai","seo","saas","b2b","b2c","product","design","ux","ui","research","analytics","metrics","kpi","okr","stakeholder","stakeholders","leadership","mentoring","communication","collaboration"
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.#\-\s/]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function extractKeywords(text: string): Set<string> {
  const words = tokens(text);
  const out = new Set<string>();
  for (const w of words) {
    if (STOPWORDS.has(w)) continue;
    if (w.length < 3) continue;
    if (TECH_KEYWORDS.has(w) || /[a-z]{3,}/.test(w)) out.add(w);
  }
  return out;
}

function analyzeLocal(resumeText: string, jdText: string): Omit<Analysis, "id" | "created_at" | "job_description"> {
  const resumeSet = extractKeywords(resumeText);
  const jdSet = extractKeywords(jdText);

  // Prioritize known technical/skill keywords from the JD as "signal".
  const jdSignals = Array.from(jdSet).filter((k) => TECH_KEYWORDS.has(k) || /^[a-z]{4,}$/.test(k));
  const uniqueSignals = Array.from(new Set(jdSignals));
  const matched = uniqueSignals.filter((k) => resumeSet.has(k));
  const missing = uniqueSignals.filter((k) => !resumeSet.has(k));

  const denom = uniqueSignals.length || 1;
  const score = Math.round((matched.length / denom) * 100);

  const strengthsCore = matched
    .filter((k) => TECH_KEYWORDS.has(k))
    .slice(0, 8);
  const strengths = strengthsCore.length > 0
    ? strengthsCore
    : matched.slice(0, 8);

  const missingCore = missing
    .filter((k) => TECH_KEYWORDS.has(k))
    .slice(0, 8);
  const missingSkills = missingCore.length > 0
    ? missingCore
    : missing.slice(0, 8);

  const suggestions: string[] = [];
  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider adding examples for: ${missingSkills.slice(0, 4).join(", ")}.`,
    );
  }
  if (score < 60) {
    suggestions.push("Mirror the job description's terminology where you have real experience.");
  }
  suggestions.push("Quantify impact — numbers, scale, and outcomes stand out to recruiters.");
  suggestions.push("Lead each bullet with a strong verb and the technology or method used.");

  return {
    match_score: score,
    summary: `Your resume matched ${matched.length} of ${uniqueSignals.length} keywords found in the job description. This is a keyword-based estimate, not a hiring prediction.`,
    strengths,
    missing_skills: missingSkills,
    suggestions,
  };
}

function ResumePage() {
  const qc = useQueryClient();
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [current, setCurrent] = useState<Analysis | null>(null);

  const { data: history, isLoading: historyLoading } = useQuery({
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
      const result = analyzeLocal(resume, jd);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not signed in");
      const { data, error } = await supabase
        .from("resume_analyses")
        .insert({
          user_id: userData.user.id,
          resume_text: resume,
          job_description: jd,
          match_score: result.match_score,
          summary: result.summary,
          strengths: result.strengths,
          missing_skills: result.missing_skills,
          suggestions: result.suggestions,
        })
        .select("id,match_score,summary,missing_skills,strengths,suggestions,created_at,job_description")
        .single();
      if (error) throw error;
      return data as Analysis;
    },
    onSuccess: (data) => {
      setCurrent(data);
      qc.invalidateQueries({ queryKey: ["resume-history"] });
      toast.success("Analysis saved");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const uploadResume = async (file: File) => {
    try {
      const text = await file.text();
      setResume(text);
      toast.success(`Loaded ${file.name}`);
    } catch {
      toast.error("Could not read file. Try .txt or .md.");
    }
  };

  const canAnalyze = resume.trim().length >= 40 && jd.trim().length >= 40;

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Resume insights</h1>
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
            Beta
          </Badge>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          A transparent keyword comparison between your resume and a job description.
          This is an assistive estimate, not a hiring prediction — recruiters weigh
          context, projects, and communication far more than word overlap.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Your resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="resume-upload"
                className="cursor-pointer rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted focus-within:ring-2 focus-within:ring-ring"
              >
                Upload .txt / .md
              </Label>
              <input
                id="resume-upload"
                type="file"
                accept=".txt,.md,text/plain"
                className="sr-only"
                onChange={(e) => e.target.files?.[0] && uploadResume(e.target.files[0])}
              />
              <span className="text-xs text-muted-foreground">or paste below</span>
            </div>
            <Textarea
              placeholder="Paste your resume text here…"
              rows={14}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              maxLength={30000}
              aria-label="Resume text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Job description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description you're targeting…"
              rows={16}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              maxLength={20000}
              aria-label="Job description text"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Minimum 40 characters in each field.
        </p>
        <Button
          onClick={() => analyze.mutate()}
          disabled={analyze.isPending || !canAnalyze}
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          {analyze.isPending ? (
            <>Analyzing…</>
          ) : (
            <>
              <IcScan size={14} className="mr-1.5" />
              Compare keywords
            </>
          )}
        </Button>
      </div>

      {current && <AnalysisResult analysis={current} />}

      <section className="space-y-3">
        <h2 className="text-sm font-medium">Recent comparisons</h2>
        {historyLoading ? (
          <div className="grid gap-2 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : !history || history.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              Your saved comparisons appear here.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-2 md:grid-cols-2">
            {history.map((h) => (
              <Card key={h.id}>
                <button
                  type="button"
                  onClick={() => setCurrent(h)}
                  className="w-full rounded-lg p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ScoreRing score={h.match_score} size={40} />
                      <div>
                        <div className="text-sm font-medium">{h.match_score}% match</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(h.created_at), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{h.missing_skills.length} missing</Badge>
                  </div>
                  {h.summary && (
                    <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{h.summary}</p>
                  )}
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AnalysisResult({ analysis }: { analysis: Analysis }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <IcSpark size={14} className="text-primary" />
          Comparison result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <ScoreRing score={analysis.match_score} size={92} />
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Keyword match</span>
                <span className="font-mono font-semibold">{analysis.match_score} / 100</span>
              </div>
              <Progress value={analysis.match_score} className="mt-2 h-1.5" />
            </div>
            {analysis.summary && (
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <KeywordList
            title="Matched keywords"
            items={analysis.strengths}
            tone="positive"
            emptyText="No keywords matched yet."
          />
          <KeywordList
            title="Missing keywords"
            items={analysis.missing_skills}
            tone="warning"
            emptyText="Nothing missing — nice."
          />
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-medium">Suggestions</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {analysis.suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KeywordList({
  title,
  items,
  tone,
  emptyText,
}: {
  title: string;
  items: string[];
  tone: "positive" | "warning";
  emptyText: string;
}) {
  const Icon = tone === "positive" ? IcCheck : IcX;
  const chipTone =
    tone === "positive"
      ? "border-primary/30 bg-primary/10 text-primary"
      : "border-border bg-muted text-muted-foreground";
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {items.map((k) => (
            <li
              key={k}
              className={"inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] " + chipTone}
            >
              <Icon size={10} />
              <span>{k}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ScoreRing({ score, size }: { score: number; size: number }) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  const color =
    score >= 70 ? "var(--color-primary)" : score >= 40 ? "var(--color-warning)" : "var(--color-muted-foreground)";
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
          style={{ transition: "stroke-dashoffset 500ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-sm font-semibold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}
