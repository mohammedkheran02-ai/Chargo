/**
 * Layout — BUILD-002
 * Mohammed OS as the primary platform.
 * Navigation: Mohammed OS → Workspaces → Platform Services → AI Team → Settings
 */

import { Link, useLocation } from "react-router";
import { useAuthContext } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  LayoutDashboard,
  Building2, User, Sparkles, FolderOpen, Share2,
  Settings, LogOut, Menu, X, ChevronRight,
  Zap, Globe, Bot, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WORKSPACE_ICONS: Record<string, React.ReactNode> = {
  personal: <User className="w-4 h-4" />,
  company: <Building2 className="w-4 h-4" />,
  opportunity: <Sparkles className="w-4 h-4" />,
  shared: <Share2 className="w-4 h-4" />,
  other: <FolderOpen className="w-4 h-4" />,
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthContext();
  const { workspaces, currentWorkspace } = useWorkspace();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function isActive(path: string) {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-neutral-200
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          lg:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="px-5 py-4 border-b border-neutral-200">
          <Link to="/os" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
              <Zap size={18} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-neutral-900">Mohammed OS</h1>
              <p className="text-[10px] text-neutral-400 tracking-wider">EXECUTIVE OPERATING SYSTEM</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
              <Globe size={14} className="text-neutral-400" />
              <span className="text-[10px] font-semibold tracking-wider text-neutral-400">
                MOHAMMED OS
              </span>
            </div>
            <Link
              to="/os"
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors
                ${isActive("/os") ? "bg-neutral-900 text-white font-medium" : "text-neutral-600 hover:bg-neutral-100"}
              `}
            >
              <LayoutDashboard size={18} />
              <span>Executive Dashboard</span>
              {isActive("/os") && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
              <Briefcase size={14} className="text-neutral-400" />
              <span className="text-[10px] font-semibold tracking-wider text-neutral-400">
                WORKSPACES
              </span>
            </div>
            {workspaces.map((workspace) => (
              <Link
                key={workspace.id}
                to={`/workspace/${workspace.slug}`}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors
                  ${isActive(`/workspace/${workspace.slug}`)
                    ? "bg-neutral-900 text-white font-medium"
                    : "text-neutral-600 hover:bg-neutral-100"
                  }
                `}
              >
                {WORKSPACE_ICONS[workspace.workspace_type] || <FolderOpen size={18} />}
                <span>{workspace.name}</span>
                {workspace.is_default && (
                  <span className="text-[9px] opacity-60 ml-auto">(default)</span>
                )}
              </Link>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
              <Settings size={14} className="text-neutral-400" />
              <span className="text-[10px] font-semibold tracking-wider text-neutral-400">
                PLATFORM SERVICES
              </span>
            </div>
            {[
              { label: "Search", path: "/search" },
              { label: "Notifications", path: "/notifications" },
              { label: "Knowledge Engine", path: "/knowledge" },
              { label: "File System", path: "/files" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-neutral-400 hover:bg-neutral-100 transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[9px] ml-auto">CP3</span>
              </Link>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
              <Bot size={14} className="text-neutral-400" />
              <span className="text-[10px] font-semibold tracking-wider text-neutral-400">
                AI TEAM
              </span>
            </div>
            <Link
              to="/ai-team"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <Bot size={18} />
              <span>AI Officers</span>
            </Link>
          </div>

          <div>
            <Link
              to="/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-neutral-200 p-3">
          {currentWorkspace && (
            <div className="px-2 py-1 mb-2 text-xs text-muted-foreground">
              <span className="font-medium">{currentWorkspace.name}</span>
              <span className="mx-1">·</span>
              <span className="capitalize">{currentWorkspace.user_role}</span>
            </div>
          )}
          <div className="flex items-center gap-3 px-2 py-2 rounded-md">
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-600">
              {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {user?.full_name || user?.email || "Loading..."}
              </p>
              <p className="text-xs text-neutral-400 capitalize">{user?.role || "Member"}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-1 text-neutral-500 hover:text-red-600"
            onClick={logout}
          >
            <LogOut size={14} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
