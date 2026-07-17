/**
 * FounderBrief — BUILD-002
 * The Founder's morning briefing. Aggregates intelligence across all workspaces.
 * Real data from Supabase, no placeholders.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/hooks/useWorkspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, AlertTriangle, CheckCircle, Clock,
  FileText, Zap, TrendingUp, Shield
} from "lucide-react";

interface BriefData {
  totalWorkspaces: number;
  pendingDecisions: number;
  approvedDecisions: number;
  totalMotherboardEntries: number;
  activeRules: number;
  timelineEvents: number;
  workspaceSummaries: Array<{
    id: string;
    name: string;
    type: string;
    decisions: number;
    timeline: number;
    motherboard: number;
  }>;
}

export function FounderBrief() {
  const { workspaces } = useWorkspace();
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBrief() {
      if (workspaces.length === 0) return;

      setLoading(true);
      try {
        const { data: decisions } = await supabase
          .from("decisions")
          .select("status, org_id")
          .order("created_at", { ascending: false });

        const { data: mbEntries } = await supabase
          .from("motherboard_entries")
          .select("entry_type, status, org_id")
          .eq("status", "active");

        const { data: timeline } = await supabase
          .from("timeline_events")
          .select("org_id");

        const pendingDecisions = decisions?.filter((d: any) => d.status === "proposed").length || 0;
        const approvedDecisions = decisions?.filter((d: any) => d.status === "approved").length || 0;
        const totalMB = mbEntries?.length || 0;
        const activeRules = mbEntries?.filter((e: any) => e.entry_type === "rule").length || 0;

        const summaries = workspaces.map((ws) => ({
          id: ws.id,
          name: ws.name,
          type: ws.workspace_type,
          decisions: decisions?.filter((d: any) => d.org_id === ws.id).length || 0,
          timeline: timeline?.filter((t: any) => t.org_id === ws.id).length || 0,
          motherboard: mbEntries?.filter((m: any) => m.org_id === ws.id).length || 0,
        }));

        setBrief({
          totalWorkspaces: workspaces.length,
          pendingDecisions,
          approvedDecisions,
          totalMotherboardEntries: totalMB,
          activeRules,
          timelineEvents: timeline?.length || 0,
          workspaceSummaries: summaries,
        });
      } catch (err) {
        console.error("Founder Brief load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBrief();
  }, [workspaces]);

  if (loading) {
    return (
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading Founder Brief...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!brief) return null;

  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-600" />
          Founder Brief
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-md bg-amber-50">
              <Shield className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-lg font-semibold">{brief.totalWorkspaces}</p>
                <p className="text-xs text-muted-foreground">Workspaces</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-lg font-semibold">{brief.pendingDecisions}</p>
                <p className="text-xs text-muted-foreground">Pending Decisions</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-lg font-semibold">{brief.approvedDecisions}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50">
              <FileText className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-lg font-semibold">{brief.totalMotherboardEntries}</p>
                <p className="text-xs text-muted-foreground">Motherboard</p>
              </div>
            </div>
          </div>

          {brief.activeRules > 0 && (
            <div className="flex items-center gap-2 py-2 border-b">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm">{brief.activeRules} Founder Rules active</span>
              <Badge variant="outline" className="ml-auto">Live</Badge>
            </div>
          )}

          {brief.timelineEvents > 0 && (
            <div className="flex items-center gap-2 py-2 border-b">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{brief.timelineEvents} timeline events</span>
              <Badge variant="outline" className="ml-auto">Tracked</Badge>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Workspace Summaries
            </h4>
            <div className="space-y-1.5">
              {brief.workspaceSummaries.map((ws) => (
                <div
                  key={ws.id}
                  className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50"
                >
                  <span className="text-sm font-medium">{ws.name}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {ws.decisions > 0 && (
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />{ws.decisions}
                      </span>
                    )}
                    {ws.motherboard > 0 && (
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />{ws.motherboard}
                      </span>
                    )}
                    {ws.timeline > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{ws.timeline}
                      </span>
                    )}
                    <Badge variant="secondary" className="text-[10px]">{ws.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
