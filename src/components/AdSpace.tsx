
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AdSpace = () => {
  return (
    <Card className="bg-gray-50 border border-gray-200 border-dashed">
      <CardContent className="p-6 text-center">
        <div className="space-y-2">
          <div className="text-sm text-gray-500 font-medium">Advertisement</div>
          <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Ad content would appear here</span>
          </div>
          <div className="text-xs text-gray-400">Sponsored content • 320x100</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdSpace;
