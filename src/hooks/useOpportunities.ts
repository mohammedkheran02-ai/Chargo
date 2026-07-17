/**
 * useOpportunities — Supabase-backed hooks for the Founder Decision Engine
 * All CRUD operations for Opportunities, Pipeline, AI Reviews, Founder Decisions
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  Opportunity,
  OpportunityType,
  OpportunityStatus,
  PipelineStage,
  PipelineEntry,
  OpportunitySection,
  SectionType,
  SectionContent,
  AIOfficerReview,
  OfficerType,
  FounderDecision,
  DecisionType,
  Assumption,
  EvidenceItem,
  Interview,
  AssumptionStatus,
  Priority,
  EvidenceType,
  FounderDashboardData,
  NextAction,
} from '@/types/opportunity';

// ─── Opportunities List ───

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from('opportunities')
        .select(`
          *,
          current_stage:pipeline_stages(id, name, display_name, order_index, description),
          pipeline_progress:opportunity_pipeline(*, stage:pipeline_stages(*))
        `)
        .order('updated_at', { ascending: false });

      if (supaError) throw supaError;
      setOpportunities(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOpportunities(); }, [fetchOpportunities]);

  return { opportunities, loading, error, refetch: fetchOpportunities };
}

// ─── Single Opportunity with all related data ───

export function useOpportunity(id: string | undefined) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunity = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from('opportunities')
        .select(`
          *,
          current_stage:pipeline_stages(id, name, display_name, order_index, description),
          pipeline_progress:opportunity_pipeline(*, stage:pipeline_stages(*)),
          sections:opportunity_sections(*),
          ai_reviews:ai_officer_reviews(*),
          founder_decisions:founder_decisions(*),
          assumptions:assumptions(*),
          evidence_items:evidence_items(*),
          interviews:interviews(*)
        `)
        .eq('id', id)
        .single();

      if (supaError) throw supaError;
      setOpportunity(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opportunity');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchOpportunity(); }, [fetchOpportunity]);

  return { opportunity, loading, error, refetch: fetchOpportunity };
}

// ─── Pipeline Stages (reference data) ───

export function usePipelineStages() {
  const [stages, setStages] = useState<PipelineStage[]>([]);

  useEffect(() => {
    supabase.from('pipeline_stages').select('*').order('order_index').then(({ data }) => {
      if (data) setStages(data);
    });
  }, []);

  return stages;
}

// ─── Create Opportunity ───

export async function createOpportunity(input: {
  name: string;
  type: OpportunityType;
  executive_summary?: Record<string, unknown>;
}) {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  const { data, error } = await supabase
    .from('opportunities' as any)
    .insert({
      name: input.name,
      type: input.type,
      status: 'active',
      current_stage_id: 1,
      executive_summary: input.executive_summary || {},
      created_by: userId,
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Opportunity;
}

// ─── Update Opportunity ───

export async function updateOpportunity(
  id: string,
  updates: Partial<Pick<Opportunity, 'name' | 'type' | 'status' | 'overall_confidence' | 'executive_summary'>>
) {
  const { data, error } = await supabase
    .from('opportunities' as any)
    .update(updates as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Opportunity;
}

// ─── Upsert Opportunity Section ───

export async function upsertOpportunitySection(
  opportunityId: string,
  sectionType: SectionType,
  content: SectionContent
) {
  const { data, error } = await supabase
    .from('opportunity_sections' as any)
    .upsert(
      {
        opportunity_id: opportunityId,
        section_type: sectionType,
        content: content as unknown as Record<string, unknown>,
      } as any,
      { onConflict: 'opportunity_id,section_type' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as unknown as OpportunitySection;
}

// ─── Advance Pipeline Stage ───

export async function advancePipelineStage(opportunityId: string, currentStageId: number) {
  const { error } = await (supabase.rpc as any)('advance_pipeline_stage', {
    p_opportunity_id: opportunityId,
    p_current_stage_id: currentStageId,
  });

  if (error) throw error;
}

// ─── Update Pipeline Entry ───

export async function updatePipelineEntry(
  entryId: string,
  updates: { stage_status?: string; notes?: string }
) {
  const { data, error } = await supabase
    .from('opportunity_pipeline' as any)
    .update(updates as never)
    .eq('id', entryId)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as PipelineEntry;
}

// ─── Create AI Officer Review ───

export async function createAIOfficerReview(input: {
  opportunity_id: string;
  officer_type: OfficerType;
  analysis: string;
  risks: string[];
  opportunities: string[];
  recommendation: string;
  confidence_score: number;
}) {
  const { data, error } = await supabase
    .from('ai_officer_reviews' as any)
    .upsert(
      {
        opportunity_id: input.opportunity_id,
        officer_type: input.officer_type,
        analysis: input.analysis,
        risks: input.risks,
        opportunities: input.opportunities,
        recommendation: input.recommendation,
        confidence_score: input.confidence_score,
      } as any,
      { onConflict: 'opportunity_id,officer_type' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as unknown as AIOfficerReview;
}

// ─── Create Founder Decision ───

export async function createFounderDecision(input: {
  opportunity_id: string;
  decision: DecisionType;
  rationale: string;
}) {
  const { data, error } = await supabase
    .from('founder_decisions' as any)
    .insert({
      opportunity_id: input.opportunity_id,
      decision: input.decision,
      rationale: input.rationale,
    } as any)
    .select()
    .single();

  if (error) throw error;

  // Update opportunity status to match decision
  const statusMap: Record<DecisionType, OpportunityStatus> = {
    approve: 'approved',
    hold: 'hold',
    pivot: 'pivot',
    reject: 'rejected',
  };

  await supabase
    .from('opportunities' as any)
    .update({ status: statusMap[input.decision] } as never)
    .eq('id', input.opportunity_id);

  return data as unknown as FounderDecision;
}

// ─── Create Assumption ───

export async function createAssumption(input: {
  opportunity_id: string;
  assumption: string;
  status?: AssumptionStatus;
  evidence?: string;
  priority?: Priority;
}) {
  const { data, error } = await supabase
    .from('assumptions' as any)
    .insert({
      opportunity_id: input.opportunity_id,
      assumption: input.assumption,
      status: input.status || 'untested',
      evidence: input.evidence,
      priority: input.priority || 'medium',
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Assumption;
}

export async function updateAssumption(id: string, updates: Partial<Assumption>) {
  const { data, error } = await supabase
    .from('assumptions' as any)
    .update(updates as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Assumption;
}

// ─── Create Evidence ───

export async function createEvidenceItem(input: {
  opportunity_id: string;
  title: string;
  description?: string;
  source?: string;
  source_url?: string;
  evidence_type?: EvidenceType;
}) {
  const { data, error } = await supabase
    .from('evidence_items' as any)
    .insert({
      opportunity_id: input.opportunity_id,
      title: input.title,
      description: input.description,
      source: input.source,
      source_url: input.source_url,
      evidence_type: input.evidence_type || 'other',
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as EvidenceItem;
}

// ─── Create Interview ───

export async function createInterview(input: {
  opportunity_id: string;
  interviewee_name: string;
  interviewee_role?: string;
  company?: string;
  key_insights?: string;
  transcript?: string;
  interview_date?: string;
}) {
  const { data, error } = await supabase
    .from('interviews' as any)
    .insert({
      opportunity_id: input.opportunity_id,
      interviewee_name: input.interviewee_name,
      interviewee_role: input.interviewee_role,
      company: input.company,
      key_insights: input.key_insights,
      transcript: input.transcript,
      interview_date: input.interview_date,
    } as any)
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Interview;
}

// ─── Delete Opportunity ───

export async function deleteOpportunity(id: string) {
  const { error } = await supabase.from('opportunities' as any).delete().eq('id', id);
  if (error) throw error;
}

// ─── Founder Dashboard Data ───

export function useFounderDashboard() {
  const [dashboard, setDashboard] = useState<FounderDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const { data: ops, error } = await supabase
        .from('opportunities' as any)
        .select('*, current_stage:pipeline_stages(display_name)');

      if (error) throw error;

      const activeCount = ops?.filter((o: Opportunity) => o.status === 'active').length || 0;
      const holdCount = ops?.filter((o: Opportunity) => o.status === 'hold').length || 0;
      const approvedCount = ops?.filter((o: Opportunity) => o.status === 'approved').length || 0;
      const avgConfidence = ops?.length
        ? Math.round((ops.reduce((sum: number, o: Opportunity) => sum + (o.overall_confidence || 0), 0) / ops.length))
        : 0;

      // Get assumptions for risk counting
      const { data: assumptions } = await supabase.from('assumptions' as any).select('*');
      const criticalRisks = assumptions?.filter((a: Assumption) => a.priority === 'critical' && a.status === 'untested').length || 0;
      const missingEvidence = assumptions?.filter((a: Assumption) => a.status === 'untested').length || 0;

      // Generate next actions
      const nextActions: NextAction[] = [];
      ops?.forEach((o: Opportunity) => {
        if (o.status === 'active' && o.current_stage?.display_name === 'Founder Decision') {
          nextActions.push({
            opportunity_id: o.id,
            opportunity_name: o.name,
            action: `Make Founder Decision on ${o.name}`,
            priority: 'high',
          });
        }
      });

      setDashboard({
        total_opportunities: ops?.length || 0,
        active_count: activeCount,
        hold_count: holdCount,
        approved_count: approvedCount,
        avg_confidence: avgConfidence,
        critical_risks: criticalRisks,
        missing_evidence_count: missingEvidence,
        next_actions: nextActions,
      });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return { dashboard, loading, refetch: fetchDashboard };
}
