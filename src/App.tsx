/**
 * App — PROJECT-002
 * Route definitions for Mohammed OS Founder Decision Engine.
 */

import { Routes, Route, Navigate } from "react-router";
import { Layout } from "@/components/Layout";
import { useAuthContext } from "@/hooks/useAuth";

// Pages
import LoginPage from "@/pages/LoginPage";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import WorkspacePage from "@/pages/WorkspacePage";
import SettingsPage from "@/pages/SettingsPage";

// Founder Decision Engine
import FounderDashboardPage from "@/pages/FounderDashboardPage";
import OpportunitiesPage from "@/pages/OpportunitiesPage";
import OpportunityDetailPage from "@/pages/OpportunityDetailPage";
import OpportunityCreatePage from "@/pages/OpportunityCreatePage";
import ComparePage from "@/pages/ComparePage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-sm text-neutral-400">Loading Mohammed OS...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Mohammed OS — Executive Dashboard */}
      <Route path="/os" element={<ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>} />

      {/* Workspace Pages */}
      <Route path="/workspace/:slug" element={<ProtectedRoute><WorkspacePage /></ProtectedRoute>} />

      {/* Settings */}
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* Founder Decision Engine */}
      <Route path="/fde" element={<ProtectedRoute><FounderDashboardPage /></ProtectedRoute>} />
      <Route path="/opportunities" element={<ProtectedRoute><OpportunitiesPage /></ProtectedRoute>} />
      <Route path="/opportunities/new" element={<ProtectedRoute><OpportunityCreatePage /></ProtectedRoute>} />
      <Route path="/opportunities/:id" element={<ProtectedRoute><OpportunityDetailPage /></ProtectedRoute>} />
      <Route path="/compare" element={<ProtectedRoute><ComparePage /></ProtectedRoute>} />

      {/* Legacy routes */}
      <Route path="/" element={<Navigate to="/fde" replace />} />
      <Route path="/dashboard" element={<Navigate to="/fde" replace />} />
      <Route path="/decisions" element={<Navigate to="/fde" replace />} />
      <Route path="/timeline" element={<Navigate to="/fde" replace />} />
      <Route path="/research" element={<Navigate to="/fde" replace />} />
      <Route path="/documents" element={<Navigate to="/fde" replace />} />
      <Route path="/secretary" element={<Navigate to="/fde" replace />} />
      <Route path="/team" element={<Navigate to="/fde" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/fde" replace />} />
    </Routes>
  );
}
