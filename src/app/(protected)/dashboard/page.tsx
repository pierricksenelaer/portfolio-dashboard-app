'use client';

import { useAuth } from '@/hooks/useAuth';
import PortfolioOverview from '@/components/dashboard/PortfolioOverview';
import HistoricalPortfolioView from '@/components/dashboard/HistoricalPortfolioView';

export default function DashboardPage() {
  const { logout, isAuthenticated, isReady } = useAuth(); 

  if (!isReady) {
    return (
      <div className="flex flex-col min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
          Loading user status...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-red-500 mt-20">
          Access Denied. Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <header className="flex items-center justify-between w-full pb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Portfolio Dashboard
        </h1>
        
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </header>

      <main className="grow">
        <div className="flex flex-col gap-8">
            <PortfolioOverview />
            <HistoricalPortfolioView />
        </div>
      </main>
    </div>
  );
}