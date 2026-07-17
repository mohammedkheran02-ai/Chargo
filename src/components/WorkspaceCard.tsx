/**
 * WorkspaceCard — BUILD-002
 * Displays a workspace with live data overview.
 */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2, User, Sparkles, FolderOpen, Share2,
  Briefcase, ChevronRight, Shield, FileText, Clock
} from "lucide-react";
import type { Workspace } from "@/hooks/useWorkspace";

const typeIcons: Record<string, React.ReactNode> = {
  personal: <User className="w-4 h-4" />,
  company: <Building2 className="w-4 h-4" />,
  opportunity: <Sparkles className="w-4 h-4" />,
  shared: <Share2 className="w-4 h-4" />,
  other: <FolderOpen className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  personal: "bg-blue-100 text-blue-800",
  company: "bg-emerald-100 text-emerald-800",
  opportunity: "bg-amber-100 text-amber-800",
  shared: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

interface WorkspaceCardProps {
  workspace: Workspace;
  isActive?: boolean;
  decisionCount?: number;
  timelineCount?: number;
  mbCount?: number;
  onClick?: () => void;
}

export function WorkspaceCard({
  workspace,
  isActive,
  decisionCount = 0,
  timelineCount = 0,
  mbCount = 0,
  onClick,
}: WorkspaceCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isActive ? "ring-2 ring-primary" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {typeIcons[workspace.workspace_type] || <Briefcase className="w-4 h-4" />}
            <span className="font-semibold text-sm">{workspace.name}</span>
          </div>
          <Badge className={`text-[10px] ${typeColors[workspace.workspace_type] || ""}`}>
            {workspace.workspace_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          {mbCount > 0 && (
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />{mbCount}
            </span>
          )}
          {decisionCount > 0 && (
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />{decisionCount}
            </span>
          )}
          {timelineCount > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />{timelineCount}
            </span>
          )}
          <span className="ml-auto capitalize">{workspace.user_role}</span>
        </div>
        <div className="flex items-center justify-between">
          {workspace.is_default && (
            <span className="text-xs text-primary font-medium">Default workspace</span>
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
