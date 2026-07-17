/**
 * useIdeaCapture — State management for the Idea Capture Experience
 * Manages the AI conversation, understanding extraction, and opportunity creation.
 */

import { useState, useCallback, useRef } from 'react';
import { createOpportunity, upsertOpportunitySection } from './useOpportunities';
import type { SectionContent } from '@/types/opportunity';

const EDGE_FUNCTION_URL = 'https://qjrbxwwpcflvsjcwlbdg.supabase.co/functions/v1/idea-conversation';

export interface ConversationMessage {
  id: string;
  role: 'founder' | 'ai';
  content: string;
  timestamp: Date;
}

export interface IdeaOutputs {
  opportunity_summary: string;
  executive_brief: string;
  validation_plan: string;
  research_plan: string;
  key_assumptions: string[];
  open_questions: string[];
  success_metrics: string[];
  recommended_next_actions: string[];
}

export type CapturePhase = 'opening' | 'exploring' | 'understanding' | 'outputs' | 'creating' | 'complete';

export function useIdeaCapture() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [phase, setPhase] = useState<CapturePhase>('opening');
  const [confidence, setConfidence] = useState(0);
  const [extracted, setExtracted] = useState<Record<string, string>>({});
  const [outputs, setOutputs] = useState<IdeaOutputs | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOpportunityId, setCreatedOpportunityId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 10);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isThinking) return;
    setError(null);

    const founderMsg: ConversationMessage = {
      id: generateId(),
      role: 'founder',
      content: content.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, founderMsg];
    setMessages(updatedMessages);
    setIsThinking(true);

    try {
      abortRef.current = new AbortController();

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          extracted,
          phase: phase === 'opening' ? 'opening' : phase === 'exploring' ? 'exploring' : phase === 'understanding' ? 'understanding' : 'outputs',
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ConversationMessage = {
        id: generateId(),
        role: 'ai',
        content: data.ai_response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setExtracted(data.extracted);
      setConfidence(data.confidence);

      const newPhase = data.phase as CapturePhase;
      if (data.outputs) {
        setOutputs(data.outputs);
        setPhase('outputs');
      } else {
        setPhase(newPhase);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsThinking(false);
      abortRef.current = null;
    }
  }, [messages, extracted, phase, isThinking]);

  const createOpportunityFromIdea = useCallback(async (name: string, type: 'startup' | 'product' | 'partnership' | 'other' = 'startup') => {
    if (!outputs) return;
    setPhase('creating');
    setError(null);

    try {
      const opp = await createOpportunity({
        name,
        type,
        executive_summary: {
          vision: extracted.vision || '',
          problem: extracted.problem || '',
          solution: extracted.solution || '',
          executive_recommendation: outputs.opportunity_summary,
          confidence_score: confidence,
        },
      });

      const sectionPromises: Promise<unknown>[] = [];

      sectionPromises.push(
        upsertOpportunitySection(opp.id, 'executive_summary', {
          vision: extracted.vision,
          problem: extracted.problem,
          solution: extracted.solution,
          executive_recommendation: outputs.opportunity_summary,
        } as SectionContent)
      );

      sectionPromises.push(
        upsertOpportunitySection(opp.id, 'validation', {
          evidence_summary: outputs.validation_plan,
          interviews_summary: `Target: ${extracted.customer || 'TBD'}`,
        } as SectionContent)
      );

      sectionPromises.push(
        upsertOpportunitySection(opp.id, 'research', {
          market_research: outputs.research_plan,
        } as SectionContent)
      );

      sectionPromises.push(
        upsertOpportunitySection(opp.id, 'business', {
          business_model: 'To be validated through customer interviews',
          risks: outputs.key_assumptions,
        } as SectionContent)
      );

      await Promise.all(sectionPromises);

      setCreatedOpportunityId(opp.id);
      setPhase('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create opportunity');
      setPhase('outputs');
    }
  }, [outputs, extracted, confidence]);

  const reset = useCallback(() => {
    setMessages([]);
    setPhase('opening');
    setConfidence(0);
    setExtracted({});
    setOutputs(null);
    setError(null);
    setCreatedOpportunityId(null);
    setIsThinking(false);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  return {
    messages,
    phase,
    confidence,
    extracted,
    outputs,
    isThinking,
    error,
    createdOpportunityId,
    sendMessage,
    createOpportunityFromIdea,
    reset,
  };
}
