import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const InputSchema = z.object({
  resume_text: z.string().min(20, "Resume text is too short"),
  job_description: z.string().min(20, "Job description is too short"),
});

const OutputSchema = z.object({
  match_score: z.number().min(0).max(100),
  summary: z.string(),
  missing_skills: z.array(z.string()),
  strengths: z.array(z.string()),
  suggestions: z.array(z.string()),
});

export const analyzeResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data, context }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(apiKey);

    try {
      const { output } = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        output: Output.object({ schema: OutputSchema }),
        prompt: `You are a technical recruiter. Analyze how well the resume matches the job description.

Return:
- match_score (0-100 integer)
- summary (2-3 sentences)
- strengths (3-6 items the candidate has that align)
- missing_skills (3-8 required skills not present)
- suggestions (3-6 concrete actions to improve the match)

RESUME:
${data.resume_text}

JOB DESCRIPTION:
${data.job_description}`,
      });

      const { supabase, userId } = context;
      const { data: saved, error } = await supabase
        .from("resume_analyses")
        .insert({
          user_id: userId,
          resume_text: data.resume_text,
          job_description: data.job_description,
          match_score: Math.round(output.match_score),
          missing_skills: output.missing_skills,
          strengths: output.strengths,
          suggestions: output.suggestions,
          summary: output.summary,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return saved;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("429")) throw new Error("AI rate limit reached. Please try again shortly.");
      if (msg.includes("402")) throw new Error("AI credits exhausted. Please upgrade your plan.");
      throw new Error(msg);
    }
  });
