
import React from 'react';
import AppHeader from '@/components/AppHeader';
import UserStats from '@/components/UserStats';
import MusicRecognition from '@/components/MusicRecognition';
import RecentDiscoveries from '@/components/RecentDiscoveries';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <AppHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* User Stats */}
        <UserStats />
        
        {/* Main Recognition Interface */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
