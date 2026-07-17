/**
 * Opportunities Page — Founder Decision Engine
 * Lists all opportunities with pipeline status, confidence scores, and quick actions.
 */

import { Link } from "react-router";
import { useOpportunities } from "@/hooks/useOpportunities";
import { usePipelineStages } from "@/hooks/useOpportunities";
import type { Opportunity, PipelineStage } from "@/types/opportunity";
import { DECISION_CONFIG } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus, TrendingUp, AlertTriangle, CheckCircle2,
  PauseCircle, XCircle, RotateCcw, Lightbulb,
  ArrowRight, BarChart3
} from "lucide-react";

function ConfidenceRing({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs text-neutral-400">—</span>;
  const color = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : score >= 40 ? "text-orange-500" : "text-red-500";
  const bg = score >= 80 ? "bg-emerald-50" : score >= 60 ? "bg-amber-50" : score >= 40 ? "bg-orange-50" : "bg-red-50";
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${bg}`}>
      <BarChart3 size={12} className={color} />
      <span className={`text-xs font-semibold ${color}`}>{score}</span>
    </div>
  );
}

function PipelineProgress({ opportunity, stages }: { opportunity: Opportunity; stages: PipelineStage[] }) {
  const progress = opportunity.pipeline_progress || [];
  const completed = progress.filter(p => p.stage_status === 'completed').length;
  const total = stages.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-neutral-500 mb-1">
        <span>{opportunity.current_stage?.display_name || 'Idea'}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = DECISION_CONFIG[status as keyof typeof DECISION_CONFIG];
  if (!config) {
    return <Badge variant="outline" className="text-[10px]">{status}</Badge>;
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{ backgroundColor: config.bgColor, color: config.color }}
    >
      {status === 'approved' && <CheckCircle2 size={10} />}
      {status === 'hold' && <PauseCircle size={10} />}
      {status === 'rejected' && <XCircle size={10} />}
      {status === 'pivot' && <RotateCcw size={10} />}
      {config.label}
    </span>
  );
}

function TypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'startup': return <Lightbulb size={14} className="text-amber-500" />;
    case 'product': return <TrendingUp size={14} className="text-blue-500" />;
    case 'partnership': return <CheckCircle2 size={14} className="text-purple-500" />;
    case 'acquisition': return <AlertTriangle size={14} className="text-red-500" />;
    default: return <ArrowRight size={14} className="text-neutral-400" />;
  }
}

export default function OpportunitiesPage() {
  const { opportunities, loading, error } = useOpportunities();
  const stages = usePipelineStages();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-3">
        <AlertTriangle size={24} className="text-red-400" />
        <p className="text-sm text-neutral-500">{error}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const activeOps = opportunities.filter(o => o.status === 'active');
  const decidedOps = opportunities.filter(o => ['approved', 'rejected', 'hold', 'pivot'].includes(o.status));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Founder Decision Engine</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {opportunities.length} opportunity{opportunities.length !== 1 ? 'ies' : 'y'} · {activeOps.length} active
          </p>
        </div>
        <Link to="/opportunities/new">
          <Button className="bg-neutral-900 hover:bg-neutral-800">
            <Plus size={16} className="mr-1.5" />
            New Opportunity
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active', value: activeOps.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Approved', value: opportunities.filter(o => o.status === 'approved').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'On Hold', value: opportunities.filter(o => o.status === 'hold').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Rejected', value: opportunities.filter(o => o.status === 'rejected').length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <Card key={stat.label} className={`${stat.bg} border-0 p-4`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Active Opportunities */}
      <div>
        <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
          <TrendingUp size={14} />
          Active Opportunities
        </h2>
        <div className="space-y-3">
          {activeOps.map((opp) => (
            <Link key={opp.id} to={`/opportunities/${opp.id}`}>
              <Card className="p-4 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <TypeIcon type={opp.type} />
                      <h3 className="font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                        {opp.name}
                      </h3>
                      <Badge variant="outline" className="text-[10px] capitalize">{opp.type}</Badge>
                    </div>
                    {opp.executive_summary?.vision && (
                      <p className="text-sm text-neutral-500 truncate">{opp.executive_summary.vision}</p>
                    )}
                    <div className="mt-3 max-w-md">
                      <PipelineProgress opportunity={opp} stages={stages} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <ConfidenceRing score={opp.overall_confidence} />
                    <ArrowRight size={16} className="text-neutral-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {activeOps.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <Lightbulb size={24} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-sm text-neutral-400">No active opportunities yet.</p>
              <Link to="/opportunities/new" className="text-sm text-emerald-600 hover:underline mt-1 inline-block">
                Create your first opportunity
              </Link>
            </Card>
          )}
        </div>
      </div>

      {/* Decided Opportunities */}
      {decidedOps.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
            <CheckCircle2 size={14} />
            Decided
          </h2>
          <div className="space-y-2">
            {decidedOps.map((opp) => (
              <Link key={opp.id} to={`/opportunities/${opp.id}`}>
                <Card className="p-3 hover:shadow-sm transition-all cursor-pointer group opacity-70 hover:opacity-100">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <TypeIcon type={opp.type} />
                      <span className="font-medium text-sm text-neutral-700">{opp.name}</span>
                      <Badge variant="outline" className="text-[10px] capitalize">{opp.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={opp.status} />
                      <ArrowRight size={14} className="text-neutral-300" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
