
import React from 'react';
import AppHeader from '@/components/AppHeader';
import MusicRecognition from '@/components/MusicRecognition';

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AppHeader />
      
      <main className="w-full px-4 py-6 max-w-md mx-auto md:max-w-4xl md:px-6">
        <MusicRecognition />
      </main>
    </div>
  );
};

export default Index;
