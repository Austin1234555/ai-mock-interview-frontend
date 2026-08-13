import React from 'react';
import { Outlet } from 'react-router-dom';
import { BackgroundGlow } from './BackgroundGlow';

export const ImmersiveLayout: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-100 relative font-sans selection:bg-blue-500/30 selection:text-blue-200 flex flex-col">
      <BackgroundGlow />
      <main className="relative z-10 overflow-hidden min-h-screen flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
