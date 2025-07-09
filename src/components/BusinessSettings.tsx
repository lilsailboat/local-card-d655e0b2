
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const BusinessSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Business Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start">
          Billing & Payments
        </Button>
        <Button variant="outline" className="w-full justify-start">
          API Integration
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Export Data
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Support Tickets
        </Button>
      </CardContent>
    </Card>
  );
};

export default BusinessSettings;
