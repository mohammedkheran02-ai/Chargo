/**
 * AITeamPanel — BUILD-002
 * Displays AI Officers assigned to the current workspace.
 * UI-ready for Atlas, Naya, Chief of Staff, Executive Chief of Staff.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, UserCog, Sparkles } from "lucide-react";

interface AIOfficer {
  id: string;
  name: string;
  role: string;
  provider: string;
  status: "active" | "standby" | "offline";
  workspace: string;
  icon: React.ReactNode;
}

const AI_OFFICERS: AIOfficer[] = [
  {
    id: "atlas",
    name: "Atlas",
    role: "Chief Builder",
    provider: "Implementation Detail",
    status: "active",
    workspace: "CHARGO",
    icon: <Bot className="w-4 h-4" />,
  },
  {
    id: "naya",
    name: "Naya",
    role: "Chief Architect",
    provider: "Implementation Detail",
    status: "active",
    workspace: "CHARGO",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: "cos",
    name: "Chief of Staff",
    role: "Executive Operations",
    provider: "Implementation Detail",
    status: "standby",
    workspace: "All Workspaces",
    icon: <UserCog className="w-4 h-4" />,
  },
  {
    id: "ecos",
    name: "Executive Chief of Staff",
    role: "Founder Liaison",
    provider: "Implementation Detail",
    status: "standby",
    workspace: "Mohammed OS",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500",
  standby: "bg-amber-500",
  offline: "bg-gray-400",
};

export function AITeamPanel() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AI Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {AI_OFFICERS.map((officer) => (
            <div
              key={officer.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {officer.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{officer.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusColors[officer.status]}`} />
                </div>
                <p className="text-xs text-muted-foreground">{officer.role}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-[10px]">{officer.status}</Badge>
                <p className="text-[10px] text-muted-foreground mt-0.5">{officer.workspace}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
