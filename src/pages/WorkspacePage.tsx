/**
 * WorkspacePage — BUILD-002
 * A living workspace environment showing real data.
 * Displays overview, decisions, timeline, and documents for the selected workspace.
 */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/hooks/useWorkspace";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2, User, Sparkles, FolderOpen, Share2,
  Clock, Shield, CheckSquare, TrendingUp,
  Briefcase, ArrowLeft
} from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  personal: <User className="w-5 h-5" />,
  company: <Building2 className="w-5 h-5" />,
  opportunity: <Sparkles className="w-5 h-5" />,
  shared: <Share2 className="w-5 h-5" />,
  other: <FolderOpen className="w-5 h-5" />,
};

const typeColors: Record<string, string> = {
  personal: "bg-blue-100 text-blue-800",
  company: "bg-emerald-100 text-emerald-800",
  opportunity: "bg-amber-100 text-amber-800",
  shared: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

export default function WorkspacePage() {
  const { slug } = useParams<{ slug: string }>();
  const { workspaces } = useWorkspace();
  const navigate = useNavigate();
  const workspace = workspaces.find((w) => w.slug === slug);

  const [decisions, setDecisions] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [motherboard, setMotherboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspace) return;

    async function loadData() {
      setLoading(true);
      try {
        const [{ data: d }, { data: t }, { data: m }] = await Promise.all([
          supabase.from("decisions").select("*").eq("org_id", workspace!.id).order("created_at", { ascending: false }),
          supabase.from("timeline_events").select("*").eq("org_id", workspace!.id).order("event_date", { ascending: false }),
          supabase.from("motherboard_entries").select("*").eq("org_id", workspace!.id).eq("status", "active").order("title"),
        ]);
        setDecisions(d || []);
        setTimeline(t || []);
        setMotherboard(m || []);
      } catch (err) {
        console.error("Workspace data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [workspace]);

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/os")}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {typeIcons[workspace.workspace_type] || <Briefcase className="w-5 h-5" />}
          <h1 className="text-2xl font-bold">{workspace.name}</h1>
        </div>
        <Badge className={`${typeColors[workspace.workspace_type] || ""}`}>
          {workspace.workspace_type}
        </Badge>
        <Badge variant="outline" className="capitalize">{workspace.user_role}</Badge>
      </div>

      <Separator />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="flex items-center gap-3 pt-4">
            <CheckSquare className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-lg font-semibold">{decisions.length}</p>
              <p className="text-xs text-muted-foreground">Decisions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-4">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-lg font-semibold">{timeline.length}</p>
              <p className="text-xs text-muted-foreground">Timeline Events</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-4">
            <Shield className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-lg font-semibold">{motherboard.length}</p>
              <p className="text-xs text-muted-foreground">Motherboard</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-lg font-semibold">{workspace.is_default ? "Yes" : "No"}</p>
              <p className="text-xs text-muted-foreground">Default</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {decisions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Decisions
          </h2>
          <div className="space-y-2">
            {decisions.map((d: any) => (
              <Card key={d.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{d.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{d.context}</p>
                    </div>
                    <Badge variant={d.status === "approved" ? "default" : "secondary"} className="text-[10px]">
                      {d.status}
                    </Badge>
                  </div>
                  {d.recommendation && (
                    <p className="text-xs text-muted-foreground mt-2">
                      <span className="font-medium">Recommendation:</span> {d.recommendation}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {timeline.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Timeline
          </h2>
          <div className="space-y-2">
            {timeline.map((t: any) => (
              <Card key={t.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{t.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-[10px]">{t.event_type}</Badge>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(t.event_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {motherboard.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Motherboard
          </h2>
          <div className="space-y-2">
            {motherboard.map((m: any) => (
              <Card key={m.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{m.title}</p>
                        <Badge variant="outline" className="text-[10px]">{m.entry_type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {decisions.length === 0 && timeline.length === 0 && motherboard.length === 0 && !loading && (
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">No data in this workspace yet.</p>
        </div>
      )}
    </div>
  );
}
