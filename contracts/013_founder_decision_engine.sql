-- Migration 013: Founder Decision Engine (FDE)
-- Core tables for the Founder Decision Engine — the heart of Mohammed OS
-- Author: Atlas
-- Date: 2026-07-17

-- ============================================================
-- 1. PIPELINE STAGES (reference table)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    order_index INTEGER NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.pipeline_stages (name, display_name, order_index, description) VALUES
    ('idea', 'Idea', 1, 'Initial concept or opportunity signal'),
    ('problem_validation', 'Problem Validation', 2, 'Validate the problem is real and painful'),
    ('customer_validation', 'Customer Validation', 3, 'Confirm target customers exist and care'),
    ('market_research', 'Market Research', 4, 'Understand market size, growth, and dynamics'),
    ('competitive_intelligence', 'Competitive Intelligence', 5, 'Analyze competitors and differentiation'),
    ('business_model', 'Business Model', 6, 'Define revenue model and unit economics'),
    ('technical_feasibility', 'Technical Feasibility', 7, 'Assess technical approach and feasibility'),
    ('financial_analysis', 'Financial Analysis', 8, 'Build financial projections and analysis'),
    ('risk_assessment', 'Risk Assessment', 9, 'Identify and assess key risks'),
    ('ai_executive_review', 'AI Executive Review', 10, 'AI Executive Board independent reviews'),
    ('founder_decision', 'Founder Decision', 11, 'Founder makes final decision'),
    ('execution', 'Execution', 12, 'Approved opportunity moves to execution')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 2. OPPORTUNITIES (core entity)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'startup',
    status TEXT NOT NULL DEFAULT 'active',
    current_stage_id INTEGER REFERENCES public.pipeline_stages(id) DEFAULT 1,
    overall_confidence INTEGER CHECK (overall_confidence >= 0 AND overall_confidence <= 100),
    executive_summary JSONB DEFAULT '{}',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS valid_opportunity_type;
ALTER TABLE public.opportunities ADD CONSTRAINT valid_opportunity_type
    CHECK (type IN ('startup', 'product', 'partnership', 'acquisition', 'market', 'investment', 'other'));

ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS valid_opportunity_status;
ALTER TABLE public.opportunities ADD CONSTRAINT valid_opportunity_status
    CHECK (status IN ('active', 'hold', 'approved', 'rejected', 'pivot', 'archived'));

-- ============================================================
-- 3. OPPORTUNITY SECTIONS (7 structured content areas)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.opportunity_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}',
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(opportunity_id, section_type)
);

ALTER TABLE public.opportunity_sections DROP CONSTRAINT IF EXISTS valid_section_type;
ALTER TABLE public.opportunity_sections ADD CONSTRAINT valid_section_type
    CHECK (section_type IN ('executive_summary', 'validation', 'research', 'business', 'product', 'ai_reviews', 'founder_decisions'));

-- ============================================================
-- 4. OPPORTUNITY PIPELINE PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.opportunity_pipeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    stage_id INTEGER NOT NULL REFERENCES public.pipeline_stages(id),
    stage_status TEXT NOT NULL DEFAULT 'not_started',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(opportunity_id, stage_id)
);

ALTER TABLE public.opportunity_pipeline DROP CONSTRAINT IF EXISTS valid_stage_status;
ALTER TABLE public.opportunity_pipeline ADD CONSTRAINT valid_stage_status
    CHECK (stage_status IN ('not_started', 'in_progress', 'completed', 'blocked', 'skipped'));

-- ============================================================
-- 5. AI EXECUTIVE REVIEWS (7 officers)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ai_officer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    officer_type TEXT NOT NULL,
    analysis TEXT,
    risks JSONB DEFAULT '[]',
    opportunities JSONB DEFAULT '[]',
    recommendation TEXT,
    confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
    raw_response JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(opportunity_id, officer_type)
);

ALTER TABLE public.ai_officer_reviews DROP CONSTRAINT IF EXISTS valid_officer_type;
ALTER TABLE public.ai_officer_reviews ADD CONSTRAINT valid_officer_type
    CHECK (officer_type IN ('cso', 'cfo', 'cto', 'coo', 'cmo', 'cro', 'research'));

-- ============================================================
-- 6. FOUNDER DECISIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.founder_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    decision TEXT NOT NULL,
    rationale TEXT,
    decided_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.founder_decisions DROP CONSTRAINT IF EXISTS valid_decision_type;
ALTER TABLE public.founder_decisions ADD CONSTRAINT valid_decision_type
    CHECK (decision IN ('approve', 'hold', 'pivot', 'reject'));

-- ============================================================
-- 7. ASSUMPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.assumptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    assumption TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'untested',
    evidence TEXT,
    priority TEXT DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.assumptions DROP CONSTRAINT IF EXISTS valid_assumption_status;
ALTER TABLE public.assumptions ADD CONSTRAINT valid_assumption_status
    CHECK (status IN ('untested', 'validated', 'invalidated', 'partially_valid'));

ALTER TABLE public.assumptions DROP CONSTRAINT IF EXISTS valid_assumption_priority;
ALTER TABLE public.assumptions ADD CONSTRAINT valid_assumption_priority
    CHECK (priority IN ('low', 'medium', 'high', 'critical'));

-- ============================================================
-- 8. EVIDENCE ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.evidence_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    source TEXT,
    source_url TEXT,
    evidence_type TEXT DEFAULT 'other',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.evidence_items DROP CONSTRAINT IF EXISTS valid_evidence_type;
ALTER TABLE public.evidence_items ADD CONSTRAINT valid_evidence_type
    CHECK (evidence_type IN ('market_research', 'competitor_analysis', 'customer_interview', 'financial_data', 'technical_analysis', 'expert_opinion', 'survey', 'other'));

-- ============================================================
-- 9. INTERVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
    interviewee_name TEXT NOT NULL,
    interviewee_role TEXT,
    company TEXT,
    key_insights TEXT,
    transcript TEXT,
    interview_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. RLS POLICIES
-- ============================================================
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_officer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assumptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "opportunities_select_all" ON public.opportunities FOR SELECT TO authenticated USING (true);
CREATE POLICY "opportunities_insert" ON public.opportunities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "opportunities_update" ON public.opportunities FOR UPDATE TO authenticated USING (true);
CREATE POLICY "opportunities_delete" ON public.opportunities FOR DELETE TO authenticated USING (true);

CREATE POLICY "sections_select_all" ON public.opportunity_sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "sections_insert" ON public.opportunity_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "sections_update" ON public.opportunity_sections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "sections_delete" ON public.opportunity_sections FOR DELETE TO authenticated USING (true);

CREATE POLICY "pipeline_stages_select" ON public.pipeline_stages FOR SELECT TO authenticated USING (true);

CREATE POLICY "pipeline_select_all" ON public.opportunity_pipeline FOR SELECT TO authenticated USING (true);
CREATE POLICY "pipeline_insert" ON public.opportunity_pipeline FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "pipeline_update" ON public.opportunity_pipeline FOR UPDATE TO authenticated USING (true);
CREATE POLICY "pipeline_delete" ON public.opportunity_pipeline FOR DELETE TO authenticated USING (true);

CREATE POLICY "ai_reviews_select_all" ON public.ai_officer_reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "ai_reviews_insert" ON public.ai_officer_reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "ai_reviews_update" ON public.ai_officer_reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "ai_reviews_delete" ON public.ai_officer_reviews FOR DELETE TO authenticated USING (true);

CREATE POLICY "founder_decisions_select_all" ON public.founder_decisions FOR SELECT TO authenticated USING (true);
CREATE POLICY "founder_decisions_insert" ON public.founder_decisions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "founder_decisions_update" ON public.founder_decisions FOR UPDATE TO authenticated USING (true);

CREATE POLICY "assumptions_select_all" ON public.assumptions FOR SELECT TO authenticated USING (true);
CREATE POLICY "assumptions_insert" ON public.assumptions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "assumptions_update" ON public.assumptions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "assumptions_delete" ON public.assumptions FOR DELETE TO authenticated USING (true);

CREATE POLICY "evidence_select_all" ON public.evidence_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "evidence_insert" ON public.evidence_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "evidence_update" ON public.evidence_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "evidence_delete" ON public.evidence_items FOR DELETE TO authenticated USING (true);

CREATE POLICY "interviews_select_all" ON public.interviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "interviews_insert" ON public.interviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "interviews_update" ON public.interviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "interviews_delete" ON public.interviews FOR DELETE TO authenticated USING (true);

-- ============================================================
-- 11. FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_opportunity_sections_updated_at ON public.opportunity_sections;
CREATE TRIGGER update_opportunity_sections_updated_at BEFORE UPDATE ON public.opportunity_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_opportunity_pipeline_updated_at ON public.opportunity_pipeline;
CREATE TRIGGER update_opportunity_pipeline_updated_at BEFORE UPDATE ON public.opportunity_pipeline FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_ai_officer_reviews_updated_at ON public.ai_officer_reviews;
CREATE TRIGGER update_ai_officer_reviews_updated_at BEFORE UPDATE ON public.ai_officer_reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_assumptions_updated_at ON public.assumptions;
CREATE TRIGGER update_assumptions_updated_at BEFORE UPDATE ON public.assumptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.create_opportunity_pipeline()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.opportunity_pipeline (opportunity_id, stage_id, stage_status)
    SELECT NEW.id, id, 'not_started'
    FROM public.pipeline_stages
    WHERE id >= NEW.current_stage_id;
    
    UPDATE public.opportunity_pipeline
    SET stage_status = 'in_progress'
    WHERE opportunity_id = NEW.id AND stage_id = NEW.current_stage_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_create_pipeline ON public.opportunities;
CREATE TRIGGER auto_create_pipeline AFTER INSERT ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.create_opportunity_pipeline();

CREATE OR REPLACE FUNCTION public.advance_pipeline_stage(p_opportunity_id UUID, p_current_stage_id INTEGER)
RETURNS VOID AS $$
DECLARE
    v_next_stage_id INTEGER;
BEGIN
    UPDATE public.opportunity_pipeline SET stage_status = 'completed', completed_at = NOW()
    WHERE opportunity_id = p_opportunity_id AND stage_id = p_current_stage_id;
    
    SELECT MIN(id) INTO v_next_stage_id FROM public.pipeline_stages WHERE id > p_current_stage_id;
    
    IF v_next_stage_id IS NOT NULL THEN
        UPDATE public.opportunity_pipeline SET stage_status = 'in_progress', started_at = NOW()
        WHERE opportunity_id = p_opportunity_id AND stage_id = v_next_stage_id;
        
        UPDATE public.opportunities SET current_stage_id = v_next_stage_id, updated_at = NOW()
        WHERE id = p_opportunity_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 12. GRANTS
-- ============================================================
GRANT ALL ON public.opportunities TO authenticated;
GRANT ALL ON public.opportunity_sections TO authenticated;
GRANT ALL ON public.pipeline_stages TO authenticated;
GRANT ALL ON public.opportunity_pipeline TO authenticated;
GRANT ALL ON public.ai_officer_reviews TO authenticated;
GRANT ALL ON public.founder_decisions TO authenticated;
GRANT ALL ON public.assumptions TO authenticated;
GRANT ALL ON public.evidence_items TO authenticated;
GRANT ALL ON public.interviews TO authenticated;

GRANT USAGE ON SEQUENCE public.pipeline_stages_id_seq TO authenticated;
