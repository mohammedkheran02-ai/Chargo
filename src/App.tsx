/**
 * App — BUILD-002
 * Route definitions for Mohammed OS Executive Operating System.
 */

import { Routes, Route, Navigate } from "react-router";
import { Layout } from "@/components/Layout";
import { useAuthContext } from "@/hooks/useAuth";

import LoginPage from "@/pages/LoginPage";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import WorkspacePage from "@/pages/WorkspacePage";
import SettingsPage from "@/pages/SettingsPage";

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/os" element={<ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>} />
      <Route path="/workspace/:slug" element={<ProtectedRoute><WorkspacePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/os" replace />} />
      <Route path="/dashboard" element={<Navigate to="/os" replace />} />
      <Route path="/decisions" element={<Navigate to="/os" replace />} />
      <Route path="/timeline" element={<Navigate to="/os" replace />} />
      <Route path="/research" element={<Navigate to="/os" replace />} />
      <Route path="/documents" element={<Navigate to="/os" replace />} />
      <Route path="/secretary" element={<Navigate to="/os" replace />} />
      <Route path="/team" element={<Navigate to="/os" replace />} />
      <Route path="*" element={<Navigate to="/os" replace />} />
    </Routes>
  );
}
