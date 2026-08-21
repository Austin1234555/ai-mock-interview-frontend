
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ImmersiveLayout } from './components/layout/ImmersiveLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { BackgroundGlow } from './components/layout/BackgroundGlow';

import { LandingView } from './components/views/LandingView';
import { LoginView } from './components/views/LoginView';
import { SignupView } from './components/views/SignupView';
import { SetupView } from './components/views/SetupView';
import { BehavioralSetupView } from './components/views/BehavioralSetupView';
import { CodingSetupView } from './components/views/CodingSetupView';
import { LoopSetupView } from './components/views/LoopSetupView';
import { DashboardView } from './components/views/DashboardView';
import { LoadingOrbView } from './components/views/LoadingOrbView';
import { InterviewSessionView } from './components/views/InterviewSessionView';
import { LoopTransitionView } from './components/views/LoopTransitionView';
import { LoopReportView } from './components/views/LoopReportView';
import { FeedbackReportView } from './components/views/FeedbackReportView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { HistoryView } from './components/views/HistoryView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';
import type { InterviewRole, AppScreen, LoopState } from './types';

// Wrapper for Auth views
const LoginWrapper = () => {
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
          onNavigateToSignup={() => {
            navigate('/signup');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateBack={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};

const SignupWrapper = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200 flex flex-col">
      <BackgroundGlow />
      <div className="flex-1">
        <SignupView
          onSignupSuccess={(user) => {
            login(user);
            navigate('/dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToLogin={() => {
            navigate('/login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <DashboardView
      onNavigate={(screen, role) => {
        if (screen === 'setup') {
          navigate('/setup');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (screen === 'setup-behavioral') {
          navigate('/setup-behavioral');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (screen === 'setup-loop') {
          navigate('/setup-loop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (screen === 'setup-coding') {
          navigate('/setup-coding');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const pathMap: Record<string, string> = {
          'analytics': '/analytics',
          'profile': '/profile',
          'history': '/history',
          'session': '/interview/session',
          'report': '/interview/report',
        };
        const targetRoute = pathMap[screen];
        if (targetRoute) {
          navigate(targetRoute, { state: { role } });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      onOpenSetup={() => {
        navigate('/setup');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onOpenLogout={() => {
        // Just trigger standard logout flow or dispatch event if MainLayout handles modal
        // Easiest is to just call logout directly or navigate home
        logout();
        navigate('/');
      }}
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
      config={state.config}
      onCompleteSession={(role: InterviewRole) => {
        if (state.loopState) {
          const ls: LoopState = { ...state.loopState };
          ls.currentRoundIndex += 1; // Mark current round as completed
          navigate('/interview/loop-transition', { state: { loopState: ls } });
        } else {
          navigate('/interview/report', { state: { role } });
        }
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
      onNavigate={(screen: AppScreen, role?: InterviewRole) => {
        if (screen === 'dashboard') navigate('/dashboard');
        if (screen === 'analytics') navigate('/analytics');
        if (screen === 'setup') navigate('/setup');
        if (screen === 'session') navigate('/interview/session', { state: { role } });
      }}
      onRetake={(config) => {
        navigate('/interview/loading', { state: { config, role: config.role } });
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
        if (screen === 'setup') navigate('/setup');
        if (screen === 'setup-loop') navigate('/setup-loop');
        if (screen === 'setup-behavioral') navigate('/setup-behavioral');
        if (screen === 'setup-coding') navigate('/setup-coding');
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

const SetupWrapper = () => {
  const navigate = useNavigate();
  return (
    <SetupView
      onNavigateBack={() => {
        navigate('/dashboard');
      }}
      onStartInterview={(config) => {
        navigate('/interview/loading', { state: { config, role: config.role } });
      }}
    />
  );
};

const BehavioralSetupWrapper = () => {
  const navigate = useNavigate();
  return (
    <BehavioralSetupView
      onNavigateBack={() => navigate('/dashboard')}
      onStartInterview={(config) => {
        navigate('/interview/loading', { state: { config, role: config.role } });
      }}
    />
  );
};

const CodingSetupWrapper = () => {
  const navigate = useNavigate();
  return (
    <CodingSetupView
      onNavigateBack={() => navigate('/dashboard')}
      onStartInterview={(config) => {
        navigate('/interview/loading', { state: { config, role: config.role } });
      }}
    />
  );
};

const LoopSetupWrapper = () => {
  const navigate = useNavigate();
  return (
    <LoopSetupView
      onNavigateBack={() => navigate('/dashboard')}
      onStartLoop={(loopState) => {
        const firstConfig = loopState.rounds[0].config;
        navigate('/interview/loading', { state: { config: firstConfig, role: firstConfig.role, loopState } });
      }}
    />
  );
};

const LoopTransitionWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  return (
    <LoopTransitionView
      loopState={state.loopState}
      onNextRound={() => {
        const ls: LoopState = state.loopState;
        const nextConfig = ls.rounds[ls.currentRoundIndex].config;
        navigate('/interview/loading', { state: { config: nextConfig, role: nextConfig.role, loopState: ls } });
      }}
      onViewReport={() => {
        navigate('/interview/loop-report', { state: { loopState: state.loopState } });
      }}
    />
  );
};

const LoopReportWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  return (
    <LoopReportView
      loopState={state.loopState}
      onNavigateBack={() => navigate('/dashboard')}
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
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupWrapper />} />

      {/* Main App Layout (Authenticated with Navigation) */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/setup" element={<SetupWrapper />} />
        <Route path="/setup-behavioral" element={<BehavioralSetupWrapper />} />
        <Route path="/setup-coding" element={<CodingSetupWrapper />} />
        <Route path="/setup-loop" element={<LoopSetupWrapper />} />
        <Route path="/analytics" element={<AnalyticsWrapper />} />
        <Route path="/history" element={<HistoryWrapper />} />
        <Route path="/profile" element={<ProfileWrapper />} />
        <Route path="/interview/report" element={<ReportWrapper />} />
        <Route path="/interview/loop-report" element={<LoopReportWrapper />} />
      </Route>

      {/* Immersive Layout (Authenticated without Navigation) */}
      <Route element={<ProtectedRoute><ImmersiveLayout /></ProtectedRoute>}>
        <Route path="/interview/loading" element={<LoadingOrbWrapper />} />
        <Route path="/interview/session" element={<SessionWrapper />} />
        <Route path="/interview/loop-transition" element={<LoopTransitionWrapper />} />
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



