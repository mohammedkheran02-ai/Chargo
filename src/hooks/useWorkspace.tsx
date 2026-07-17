/**
 * useWorkspace — BUILD-002 Mohammed OS Workspace Context
 * Fetches workspace memberships directly from Supabase on auth change.
 * No localStorage caching — real data, real time.
 */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthContext } from "@/hooks/useAuth";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  workspace_type: "personal" | "company" | "opportunity" | "shared" | "other";
  user_role: "admin" | "member" | "viewer";
  is_default: boolean;
}

interface WorkspaceContextValue {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (w: Workspace) => void;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextValue>({
  workspaces: [],
  currentWorkspace: null,
  setCurrentWorkspace: () => {},
  isLoading: true,
  refresh: async () => {},
});

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspaceState] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setWorkspaces([]);
      setCurrentWorkspaceState(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("organizations")
        .select(`
          id, name, slug, workspace_type,
          user_organizations!inner(role, is_default)
        `)
        .order("name");

      if (error) {
        console.error("Failed to load workspaces:", error);
        setWorkspaces([]);
        setCurrentWorkspaceState(null);
        return;
      }

      const parsed: Workspace[] = (data || []).map((org: any) => ({
        id: org.id,
        name: org.name,
        slug: org.slug,
        workspace_type: org.workspace_type,
        user_role: org.user_organizations?.[0]?.role || "member",
        is_default: org.user_organizations?.[0]?.is_default || false,
      }));

      setWorkspaces(parsed);

      if (parsed.length > 0) {
        const defaultWs = parsed.find((w) => w.is_default) || parsed[0];
        setCurrentWorkspaceState(defaultWs);
      }
    } catch (err) {
      console.error("Workspace load error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setCurrentWorkspace = useCallback((workspace: Workspace) => {
    setCurrentWorkspaceState(workspace);
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, currentWorkspace, setCurrentWorkspace, isLoading, refresh }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
