
import React from 'react';
import UserProfileHeader from '@/components/UserProfileHeader';
import ProfileStats from '@/components/ProfileStats';
import RecentActivity from '@/components/RecentActivity';
import ProfileSettings from '@/components/ProfileSettings';

const Profile = () => {
  return (
    <>
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
    </>
  );
};

export default Profile;
