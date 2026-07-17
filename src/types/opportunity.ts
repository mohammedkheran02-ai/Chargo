/**
 * Founder Decision Engine (FDE) — Type Definitions
 * All types for Opportunities, Pipeline, AI Reviews, Founder Decisions
 */

// ─── Core Opportunity ───

export type OpportunityType = 'startup' | 'product' | 'partnership' | 'acquisition' | 'market' | 'investment' | 'other';
export type OpportunityStatus = 'active' | 'hold' | 'approved' | 'rejected' | 'pivot' | 'archived';

export interface Opportunity {
  id: string;
  name: string;
  type: OpportunityType;
  status: OpportunityStatus;
  current_stage_id: number;
  overall_confidence: number | null;
  executive_summary: ExecutiveSummary;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  current_stage?: PipelineStage;
  pipeline_progress?: PipelineEntry[];
  sections?: OpportunitySection[];
  ai_reviews?: AIOfficerReview[];
  founder_decisions?: FounderDecision[];
  assumptions?: Assumption[];
  evidence_items?: EvidenceItem[];
  interviews?: Interview[];
}

export interface ExecutiveSummary {
  vision?: string;
  problem?: string;
  solution?: string;
  current_stage?: string;
  status?: string;
  confidence_score?: number;
  executive_recommendation?: string;
}

// ─── Pipeline ───

export type StageStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'skipped';

export interface PipelineStage {
  id: number;
  name: string;
  display_name: string;
  order_index: number;
  description: string | null;
}

export interface PipelineEntry {
  id: string;
  opportunity_id: string;
  stage_id: number;
  stage_status: StageStatus;
  started_at: string | null;
  completed_at: string | null;
  notes: string | null;
  stage?: PipelineStage;
}

// ─── Opportunity Sections (7 content areas) ───

export type SectionType = 'executive_summary' | 'validation' | 'research' | 'business' | 'product' | 'ai_reviews' | 'founder_decisions';

export interface OpportunitySection {
  id: string;
  opportunity_id: string;
  section_type: SectionType;
  content: SectionContent;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface SectionContent {
  // executive_summary
  vision?: string;
  problem?: string;
  solution?: string;
  current_stage?: string;
  status?: string;
  confidence_score?: number;
  executive_recommendation?: string;
  // validation
  problem_validation?: string;
  customer_validation?: string;
  assumptions_list?: string[];
  evidence_summary?: string;
  interviews_summary?: string;
  // research
  market_research?: string;
  competitor_research?: string;
  industry_trends?: string;
  tam?: string;
  sam?: string;
  som?: string;
  // business
  business_model?: string;
  revenue_model?: string;
  unit_economics?: string;
  risks?: string[];
  // product
  features?: string[];
  roadmap?: string;
  technical_notes?: string;
  // ai_reviews
  reviews_summary?: string;
  // founder_decisions
  decision_history?: string;
  [key: string]: unknown;
}

// ─── AI Executive Board ───

export type OfficerType = 'cso' | 'cfo' | 'cto' | 'coo' | 'cmo' | 'cro' | 'research';

export const OFFICER_CONFIG: Record<OfficerType, { title: string; description: string; color: string }> = {
  cso: { title: 'Chief Strategy Officer', description: 'Strategic alignment, market positioning, competitive advantage', color: '#0ea5e9' },
  cfo: { title: 'Chief Financial Officer', description: 'Financial viability, unit economics, capital efficiency', color: '#10b981' },
  cto: { title: 'Chief Technology Officer', description: 'Technical feasibility, architecture, build vs buy', color: '#8b5cf6' },
  coo: { title: 'Chief Operating Officer', description: 'Operational complexity, execution risk, resource requirements', color: '#f59e0b' },
  cmo: { title: 'Chief Marketing Officer', description: 'Market fit, customer acquisition, brand positioning', color: '#ec4899' },
  cro: { title: 'Chief Risk Officer', description: 'Risk identification, mitigation strategies, downside scenarios', color: '#ef4444' },
  research: { title: 'Research Officer', description: 'Evidence validation, source verification, confidence assessment', color: '#6366f1' },
};

export interface AIOfficerReview {
  id: string;
  opportunity_id: string;
  officer_type: OfficerType;
  analysis: string | null;
  risks: string[] | null;
  opportunities: string[] | null;
  recommendation: string | null;
  confidence_score: number | null;
  raw_response: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// ─── Founder Decisions ───

export type DecisionType = 'approve' | 'hold' | 'pivot' | 'reject';

export const DECISION_CONFIG: Record<DecisionType, { label: string; color: string; bgColor: string; description: string }> = {
  approve: { label: 'APPROVE', color: '#10b981', bgColor: '#d1fae5', description: 'Proceed with execution' },
  hold: { label: 'HOLD', color: '#f59e0b', bgColor: '#fef3c7', description: 'Pause pending more evidence' },
  pivot: { label: 'PIVOT', color: '#8b5cf6', bgColor: '#ede9fe', description: 'Change direction based on findings' },
  reject: { label: 'REJECT', color: '#ef4444', bgColor: '#fee2e2', description: 'Do not proceed' },
};

export interface FounderDecision {
  id: string;
  opportunity_id: string;
  decision: DecisionType;
  rationale: string | null;
  decided_at: string | null;
  created_at: string;
}

// ─── Assumptions ───

export type AssumptionStatus = 'untested' | 'validated' | 'invalidated' | 'partially_valid';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Assumption {
  id: string;
  opportunity_id: string;
  assumption: string;
  status: AssumptionStatus;
  evidence: string | null;
  priority: Priority;
  created_at: string;
  updated_at: string;
}

// ─── Evidence ───

export type EvidenceType = 'market_research' | 'competitor_analysis' | 'customer_interview' | 'financial_data' | 'technical_analysis' | 'expert_opinion' | 'survey' | 'other';

export interface EvidenceItem {
  id: string;
  opportunity_id: string;
  title: string;
  description: string | null;
  source: string | null;
  source_url: string | null;
  evidence_type: EvidenceType;
  created_at: string;
}

// ─── Interviews ───

export interface Interview {
  id: string;
  opportunity_id: string;
  interviewee_name: string;
  interviewee_role: string | null;
  company: string | null;
  key_insights: string | null;
  transcript: string | null;
  interview_date: string | null;
  created_at: string;
}

// ─── Founder Dashboard ───

export interface FounderDashboardData {
  total_opportunities: number;
  active_count: number;
  hold_count: number;
  approved_count: number;
  avg_confidence: number;
  critical_risks: number;
  missing_evidence_count: number;
  next_actions: NextAction[];
}

export interface NextAction {
  opportunity_id: string;
  opportunity_name: string;
  action: string;
  priority: Priority;
}
