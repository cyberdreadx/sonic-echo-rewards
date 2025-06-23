
import React from 'react';
import AppHeader from '@/components/AppHeader';
import UserStats from '@/components/UserStats';
import MusicRecognition from '@/components/MusicRecognition';
import RecentDiscoveries from '@/components/RecentDiscoveries';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-md md:max-w-none">
        {/* User Stats */}
        <UserStats />
        
        {/* Main Recognition Interface */}
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
          <div className="md:col-span-2">
            <MusicRecognition />
          </div>
          
          <div className="space-y-6">
            <RecentDiscoveries />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
