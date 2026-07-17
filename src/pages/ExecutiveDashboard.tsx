/**
 * ExecutiveDashboard — BUILD-002
 * Mohammed OS — the Founder's executive command center.
 * Real Founder Brief, real workspaces, real platform services.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/hooks/useWorkspace";
import { FounderBrief } from "@/components/FounderBrief";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { AITeamPanel } from "@/components/AITeamPanel";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Building2, Settings, Zap, Shield, Globe
} from "lucide-react";

interface WorkspaceStats {
  [key: string]: {
    decisions: number;
    timeline: number;
    motherboard: number;
  };
}

export default function ExecutiveDashboard() {
  const { workspaces, isLoading } = useWorkspace();
  const navigate = useNavigate();
  const [stats, setStats] = useState<WorkspaceStats>({});

  useEffect(() => {
    async function loadStats() {
      if (workspaces.length === 0) return;

      const [{ data: decisions }, { data: timeline }, { data: mb }] = await Promise.all([
        supabase.from("decisions").select("org_id"),
        supabase.from("timeline_events").select("org_id"),
        supabase.from("motherboard_entries").select("org_id").eq("status", "active"),
      ]);

      const newStats: WorkspaceStats = {};
      for (const ws of workspaces) {
        newStats[ws.id] = {
          decisions: decisions?.filter((d: any) => d.org_id === ws.id).length || 0,
          timeline: timeline?.filter((t: any) => t.org_id === ws.id).length || 0,
          motherboard: mb?.filter((m: any) => m.org_id === ws.id).length || 0,
        };
      }
      setStats(newStats);
    }

    loadStats();
  }, [workspaces]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading Mohammed OS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mohammed OS</h1>
          <p className="text-muted-foreground mt-1">
            Executive Operating System — {workspaces.length} workspace{workspaces.length !== 1 ? "s" : ""} active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            v0.2
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            BUILD-002
          </Badge>
        </div>
      </div>

      <Separator />

      <FounderBrief />

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Workspaces
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              isActive={false}
              decisionCount={stats[workspace.id]?.decisions || 0}
              timelineCount={stats[workspace.id]?.timeline || 0}
              mbCount={stats[workspace.id]?.motherboard || 0}
              onClick={() => navigate(`/workspace/${workspace.slug}`)}
            />
          ))}
        </div>
      </div>

      <AITeamPanel />

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Platform Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Shield className="w-4 h-4" />, label: "Authentication", status: "Active", color: "text-green-600" },
            { icon: <Zap className="w-4 h-4" />, label: "AI Gateway", status: "Active", color: "text-green-600" },
            { icon: <Building2 className="w-4 h-4" />, label: "Knowledge Engine", status: "v0.2", color: "text-amber-600" },
            { icon: <Globe className="w-4 h-4" />, label: "Search", status: "CP3", color: "text-blue-600" },
          ].map((service) => (
            <div
              key={service.label}
              className="flex items-center gap-2 p-3 rounded-lg border bg-card"
            >
              {service.icon}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{service.label}</p>
                <p className={`text-xs ${service.color}`}>{service.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
