/**
 * Edge Function: idea-conversation
 * AI-powered conversation engine for the Idea Capture Experience.
 */

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ConversationMessage {
  role: "founder" | "ai";
  content: string;
}

interface ConversationRequest {
  messages: ConversationMessage[];
  extracted?: Record<string, string>;
  phase: "opening" | "exploring" | "understanding" | "outputs";
}

interface IdeaOutputs {
  opportunity_summary: string;
  executive_brief: string;
  validation_plan: string;
  research_plan: string;
  key_assumptions: string[];
  open_questions: string[];
  success_metrics: string[];
  recommended_next_actions: string[];
}

function extractInformation(
  latestMessage: string,
  allText: string,
  existing: Record<string, string>
): Record<string, string> {
  const extracted = { ...existing };

  if (!extracted.vision) {
    const match = allText.match(/(?:vision|imagine|future|world where|want to create|want to build|mission is to).{0,300}/i);
    if (match) extracted.vision = match[0].substring(0, 300);
  }
  if (!extracted.problem) {
    const match = allText.match(/(?:problem|pain|struggle|frustrat|difficult|challenge).{0,300}/i);
    if (match) extracted.problem = match[0].substring(0, 300);
  }
  if (!extracted.customer) {
    const match = allText.match(/(?:for|target|audience|customer|user|people who|companies that|founders|businesses).{0,200}/i);
    if (match) extracted.customer = match[0].substring(0, 200);
  }
  if (!extracted.solution) {
    const match = allText.match(/(?:solution|platform|product|app|service|tool|system|build|create).{0,300}/i);
    if (match) extracted.solution = match[0].substring(0, 300);
  }
  if (!extracted.motivation) {
    const match = allText.match(/(?:because|i've seen|i noticed|i experienced|passionate|believe|excited).{0,200}/i);
    if (match) extracted.motivation = match[0].substring(0, 200);
  }
  if (!extracted.constraints) {
    const match = allText.match(/(?:limited|constraint|budget|time|small team|bootstrapping).{0,200}/i);
    if (match) extracted.constraints = match[0].substring(0, 200);
  }
  if (!extracted.risks) {
    const match = allText.match(/(?:risk|worry|concern|afraid|might fail|could go wrong).{0,200}/i);
    if (match) extracted.risks = match[0].substring(0, 200);
  }
  if (!extracted.success_criteria) {
    const match = allText.match(/(?:success|metric|measure|milestone|goal|target).{0,200}/i);
    if (match) extracted.success_criteria = match[0].substring(0, 200);
  }

  return extracted;
}

function calculateConfidence(extracted: Record<string, string>): number {
  const fields = ["vision", "problem", "customer", "solution", "motivation", "constraints", "risks", "success_criteria"];
  const filled = fields.filter((f) => extracted[f] && extracted[f].length > 10);
  return Math.min(Math.round((filled.length / fields.length) * 100) + (filled.length >= 3 ? 10 : 0), 100);
}

function generateAIResponse(lastMsg: string, allText: string, extracted: Record<string, string>, phase: string, confidence: number): string {
  if (phase === "opening") {
    return "That's interesting. Tell me more — what problem are you trying to solve?";
  }
  if (phase === "understanding") {
    return "I'm building a clear picture. Is there anything else I should know before I summarize everything?";
  }
  if (phase === "outputs") {
    return "Excellent. I have a comprehensive understanding of your idea. Here's what I've synthesized.";
  }
  if (!extracted.problem) return "I hear you. What specific problem are you trying to solve?";
  if (!extracted.customer) return "Good point. Who exactly is this for?";
  if (!extracted.solution) return "Understood. What would the solution look like?";
  if (!extracted.motivation) return "That resonates. Why you? What makes you uniquely positioned?";
  if (!extracted.constraints) return "Clear direction. What constraints are you working with?";
  if (!extracted.risks) return "Makes sense. What worries you most about this?";
  if (!extracted.success_criteria) return "Great insight. How will you know this is working?";
  return "I'm getting a strong understanding. Anything else you'd like to share?";
}

function generateOutputs(extracted: Record<string, string>): IdeaOutputs {
  const v = extracted.vision?.substring(0, 150) || "Not yet defined";
  const p = extracted.problem?.substring(0, 150) || "Not yet defined";
  const c = extracted.customer?.substring(0, 100) || "Not yet defined";
  const s = extracted.solution?.substring(0, 150) || "Not yet defined";

  return {
    opportunity_summary: `Addresses ${p} for ${c}. Vision: ${v}. Solution: ${s}.`,
    executive_brief: `VISION: ${v}\n\nPROBLEM: ${p}\n\nTARGET: ${c}\n\nSOLUTION: ${s}${extracted.motivation ? "\n\nWHY NOW: " + extracted.motivation.substring(0, 150) : ""}${extracted.constraints ? "\n\nCONSTRAINTS: " + extracted.constraints.substring(0, 150) : ""}${extracted.risks ? "\n\nKEY RISK: " + extracted.risks.substring(0, 150) : ""}`,
    validation_plan: `1. Interview 5 ${c} about ${p}\n2. Create landing page and measure interest\n3. Research market size and competitors\n4. Test willingness to pay\n5. Build proof-of-concept`,
    research_plan: `Market size and growth trends\nCompetitive landscape analysis\nCustomer segmentation\nPricing and business model research\nTechnology requirements\nRegulatory considerations`,
    key_assumptions: [
      `The problem (${p.substring(0, 60)}...) is significant enough that people will pay`,
      `The target customer (${c.substring(0, 50)}...) exists at sufficient scale`,
      `The solution can be built with available resources`,
      `The Founder has the necessary skills and resources to execute`,
    ],
    open_questions: [
      ...(!extracted.problem ? ["What is the exact problem?"] : []),
      ...(!extracted.customer ? ["Who is the specific target customer?"] : []),
      "What is the total addressable market?",
      "Who are the top 3 competitors?",
      "What is the minimum viable version?",
    ],
    success_metrics: [
      "Customer interviews completed",
      "Landing page conversion rate",
      "Customer acquisition cost",
      "Monthly recurring revenue",
      "Customer satisfaction score",
    ],
    recommended_next_actions: [
      `Interview 5 ${c.substring(0, 40)} about their pain points`,
      "Create a one-page opportunity summary",
      "Build a simple landing page or prototype",
      "Research top 3 competitors",
      "Set up the opportunity in Mohammed OS",
    ],
  };
}

function generateResponse(req: ConversationRequest) {
  const founderMessages = req.messages.filter((m) => m.role === "founder");
  const lastFounder = founderMessages[founderMessages.length - 1]?.content || "";
  const allText = founderMessages.map((m) => m.content).join(" ");

  const extracted = extractInformation(lastFounder, allText, req.extracted || {});
  const confidence = calculateConfidence(extracted);

  let phase = req.phase;
  if (confidence >= 80 && phase !== "outputs") phase = "outputs";
  else if (confidence >= 60 && phase === "exploring") phase = "understanding";
  else if (phase === "opening" && founderMessages.length >= 1) phase = "exploring";

  const aiResponse = generateAIResponse(lastFounder, allText, extracted, phase, confidence);

  return {
    ai_response: aiResponse,
    follow_up_questions: [],
    extracted,
    confidence,
    phase,
    outputs: phase === "outputs" ? generateOutputs(extracted) : undefined,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json() as ConversationRequest;
    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const response = generateResponse(body);
    return new Response(JSON.stringify(response), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
