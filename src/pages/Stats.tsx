
import React from 'react';
import AppHeader from '@/components/AppHeader';
import UserStats from '@/components/UserStats';
import RecentDiscoveries from '@/components/RecentDiscoveries';

const Stats = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AppHeader />
      
      <main className="w-full px-4 py-6 space-y-6 max-w-md mx-auto md:max-w-7xl md:px-6">
        <UserStats />
        <RecentDiscoveries />
      </main>
    </div>
  );
};

export default Stats;
