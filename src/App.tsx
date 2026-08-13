
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ImmersiveLayout } from './components/layout/ImmersiveLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { BackgroundGlow } from './components/layout/BackgroundGlow';

import { LandingView } from './components/views/LandingView';
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { LoadingOrbView } from './components/views/LoadingOrbView';
import { InterviewSessionView } from './components/views/InterviewSessionView';
import { FeedbackReportView } from './components/views/FeedbackReportView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { HistoryView } from './components/views/HistoryView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';
import type { InterviewRole, AppScreen } from './types';

// Wrapper for Auth views
const LoginWrapper = ({ isSignUp }: { isSignUp?: boolean }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200 flex flex-col">
      <BackgroundGlow />
      <div className="flex-1">
        <LoginView
          onLoginSuccess={(user) => {
            login(user);
            navigate('/dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initialIsSignUp={isSignUp}
          onNavigateBack={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};

// Wrapper for Landing page
const LandingWrapper = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200 flex flex-col">
      <BackgroundGlow />
      <div className="flex-1">
        <LandingView onNavigateAuth={(isSignUp) => {
          navigate(isSignUp ? '/signup' : '/login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      </div>
    </div>
  );
};

// Wrapper for Dashboard
const DashboardWrapper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <DashboardView
      onNavigate={(screen) => {
        const pathMap: Record<string, string> = {
          'analytics': '/analytics',
          'profile': '/profile',
        };
        if (pathMap[screen]) navigate(pathMap[screen]);
      }}
      onOpenSetup={() => { /* Handled in MainLayout now */ }}
      onOpenLogout={() => { /* Handled in MainLayout now */ }}
      user={user!}
    />
  );
};

// Wrapper for Immersive Flow
const LoadingOrbWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  return (
    <LoadingOrbView
      role={state.role || 'Java Backend'}
      config={state.config}
      onLoadingComplete={() => {
        navigate('/interview/session', { state });
      }}
    />
  );
};

const SessionWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  return (
    <InterviewSessionView
      role={state.role || 'Java Backend'}
      onCompleteSession={(role: InterviewRole) => {
        navigate('/interview/report', { state: { role } });
      }}
      onCancelSession={() => navigate('/dashboard')}
    />
  );
};

const ReportWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  return (
    <FeedbackReportView
      role={state.role || 'Java Backend'}
      onNavigate={(screen: AppScreen) => {
        if (screen === 'dashboard') navigate('/dashboard');
        if (screen === 'analytics') navigate('/analytics');
      }}
    />
  );
};

const AnalyticsWrapper = () => {
  const navigate = useNavigate();
  return (
    <AnalyticsView
      onNavigate={(screen: AppScreen) => {
        if (screen === 'dashboard') navigate('/dashboard');
      }}
    />
  );
};

const HistoryWrapper = () => {
  const navigate = useNavigate();
  return (
    <HistoryView
      onNavigate={(screen: AppScreen, role?: InterviewRole) => {
        if (screen === 'dashboard') navigate('/dashboard');
        if (screen === 'report') navigate('/interview/report', { state: { role } });
        if (screen === 'session') navigate('/interview/loading', { state: { role, config: { role, level: 'Junior', difficulty: 'Medium', questionsCount: 5 } } });
      }}
    />
  );
};

const ProfileWrapper = () => {
  const { user, updateUser } = useAuth();
  return (
    <ProfileSettingsView
      user={user!}
      onUpdateUser={updateUser}
    />
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingWrapper />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginWrapper />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <LoginWrapper isSignUp={true} />} />

      {/* Main App Layout (Authenticated with Navigation) */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/analytics" element={<AnalyticsWrapper />} />
        <Route path="/history" element={<HistoryWrapper />} />
        <Route path="/profile" element={<ProfileWrapper />} />
        <Route path="/interview/report" element={<ReportWrapper />} />
      </Route>

      {/* Immersive Layout (Authenticated without Navigation) */}
      <Route element={<ProtectedRoute><ImmersiveLayout /></ProtectedRoute>}>
        <Route path="/interview/loading" element={<LoadingOrbWrapper />} />
        <Route path="/interview/session" element={<SessionWrapper />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
// ... keep all your existing imports



