
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BusinessOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Sarah J.</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <Badge variant="outline">+24 points</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Mike R.</p>
                <p className="text-sm text-gray-600">4 hours ago</p>
              </div>
              <Badge variant="outline">+31 points</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Emma L.</p>
                <p className="text-sm text-gray-600">6 hours ago</p>
              </div>
              <Badge variant="outline">+18 points</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Local Card Sales</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
            <p className="text-sm text-gray-600">
              $3,567 of $4,568 total sales through Local Card
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessOverview;
