
import React from 'react';
import AppHeader from '@/components/AppHeader';
import UserProfileHeader from '@/components/UserProfileHeader';
import ProfileStats from '@/components/ProfileStats';
import RecentActivity from '@/components/RecentActivity';
import ProfileSettings from '@/components/ProfileSettings';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AppHeader />
      
      <main className="w-full px-4 py-6 space-y-6 max-w-md mx-auto md:max-w-7xl md:px-6">
        <UserProfileHeader />
        
        <div className="space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          <div className="md:col-span-2 space-y-6">
            <ProfileStats />
            <RecentActivity />
          </div>
          
          <div>
            <ProfileSettings />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
