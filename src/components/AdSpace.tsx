
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AdSpace = () => {
  return (
    <Card className="bg-muted/30 border border-border border-dashed">
      <CardContent className="p-6 text-center">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground font-medium">Advertisement</div>
          <div className="h-24 bg-muted rounded-lg flex items-center justify-center border border-border">
            <span className="text-muted-foreground text-sm">Ad content would appear here</span>
          </div>
          <div className="text-xs text-muted-foreground">Sponsored content • 320x100</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdSpace;
