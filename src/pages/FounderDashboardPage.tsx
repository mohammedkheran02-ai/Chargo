/**
 * Founder Dashboard — Founder Decision Engine
 * At-a-glance: confidence, risks, missing evidence, next actions, recommended decisions.
 */

import { Link } from "react-router";
import { useOpportunities, useFounderDashboard } from "@/hooks/useOpportunities";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, AlertTriangle,
  Lightbulb, ArrowRight, BarChart3, Zap, Target,
  ClipboardList, AlertOctagon, Sparkles
} from "lucide-react";

export default function FounderDashboardPage() {
  const { opportunities, loading: opsLoading } = useOpportunities();
  const { dashboard, loading: dashLoading } = useFounderDashboard();

  if (opsLoading || dashLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  const activeOps = opportunities.filter((o) => o.status === "active");
  const atDecisionStage = activeOps.filter(
    (o) => o.current_stage?.display_name === "Founder Decision"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
          <Zap size={24} className="text-emerald-500" />
          Founder Dashboard
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Real-time view of all opportunities, risks, and recommended actions.
        </p>
      </div>

      {/* Key Metrics */}
      {dashboard && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-4 bg-emerald-50 border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <Target size={14} className="text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">Avg Confidence</span>
            </div>
            <p className="text-2xl font-bold text-emerald-700">{dashboard.avg_confidence}</p>
            <Progress value={dashboard.avg_confidence} className="h-1.5 mt-1" />
          </Card>

          <Card className="p-4 bg-amber-50 border-amber-100">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-amber-600" />
              <span className="text-xs text-amber-600 font-medium">Critical Risks</span>
            </div>
            <p className="text-2xl font-bold text-amber-700">{dashboard.critical_risks}</p>
            <p className="text-[10px] text-amber-500 mt-0.5">Untested critical assumptions</p>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList size={14} className="text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Missing Evidence</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{dashboard.missing_evidence_count}</p>
            <p className="text-[10px] text-blue-500 mt-0.5">Untested assumptions need evidence</p>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-100">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Active</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{dashboard.active_count}</p>
            <p className="text-[10px] text-purple-500 mt-0.5">
              {dashboard.approved_count} approved · {dashboard.hold_count} on hold
            </p>
          </Card>
        </div>
      )}

      {/* Next Actions — Highest Priority */}
      {dashboard?.next_actions && dashboard.next_actions.length > 0 && (
        <Card className="p-5 border-amber-200 bg-amber-50/50">
          <h2 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <AlertOctagon size={14} />
            Next Highest-Value Actions
          </h2>
          <div className="space-y-2">
            {dashboard.next_actions.map((action, i) => (
              <Link
                key={i}
                to={`/opportunities/${action.opportunity_id}`}
                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-600">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800 group-hover:text-amber-700 transition-colors">
                    {action.action}
                  </p>
                </div>
                <ArrowRight size={14} className="text-neutral-300 group-hover:text-amber-500" />
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Opportunities Awaiting Founder Decision */}
      {atDecisionStage.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
            <GavelIcon />
            Awaiting Your Decision
          </h2>
          <div className="space-y-3">
            {atDecisionStage.map((opp) => (
              <Link key={opp.id} to={`/opportunities/${opp.id}`}>
                <Card className="p-4 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                          {opp.name}
                        </h3>
                        <Badge variant="outline" className="text-[10px] capitalize">{opp.type}</Badge>
                        <Badge className="text-[10px] bg-amber-100 text-amber-700 border-0">
                          Decision Pending
                        </Badge>
                      </div>
                      {opp.executive_summary?.executive_recommendation && (
                        <p className="text-sm text-neutral-500">
                          {opp.executive_summary.executive_recommendation}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {opp.overall_confidence !== null && (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-neutral-50">
                          <BarChart3 size={12} className="text-emerald-500" />
                          <span className="text-xs font-semibold text-emerald-600">
                            {opp.overall_confidence}
                          </span>
                        </div>
                      )}
                      <ArrowRight size={16} className="text-neutral-300 group-hover:text-emerald-500" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Active Opportunities */}
      <div>
        <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
          <TrendingUp size={14} />
          All Active Opportunities
        </h2>
        <div className="grid gap-3">
          {activeOps.map((opp) => {
            const pipelineProgress = opp.pipeline_progress || [];
            const completedStages = pipelineProgress.filter((p) => p.stage_status === "completed").length;
            const totalStages = pipelineProgress.length || 12;
            const pct = Math.round((completedStages / totalStages) * 100);

            return (
              <Link key={opp.id} to={`/opportunities/${opp.id}`}>
                <Card className="p-4 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm text-neutral-800 group-hover:text-emerald-600 transition-colors">
                          {opp.name}
                        </h3>
                        <Badge variant="outline" className="text-[9px] capitalize">{opp.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[200px]">
                          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] text-neutral-400">{pct}%</span>
                        <span className="text-[10px] text-neutral-400">
                          · {opp.current_stage?.display_name}
                        </span>
                      </div>
                    </div>
                    {opp.overall_confidence !== null && (
                      <span className={`text-xs font-semibold ${
                        opp.overall_confidence >= 80 ? "text-emerald-600" :
                        opp.overall_confidence >= 60 ? "text-amber-600" : "text-red-600"
                      }`}>
                        {opp.overall_confidence}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
          {activeOps.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <Lightbulb size={24} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-sm text-neutral-400">No active opportunities.</p>
              <Link to="/opportunities/new" className="text-sm text-emerald-600 hover:underline mt-1 inline-block">
                Create your first opportunity
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function GavelIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14.5 9.5-5 5" /><path d="m4 20 5-5" /><path d="m9.5 14.5 5-5" />
      <path d="m5 15 4 4" /><path d="m19 4-8 8" /><path d="M21 8a2.1 2.1 0 0 0-1.8-1.8L16 10l4 4 3.8-3.2A2.1 2.1 0 0 0 21 8" />
      <path d="m13.8 10.2-2.2-2.2" />
    </svg>
  );
}
