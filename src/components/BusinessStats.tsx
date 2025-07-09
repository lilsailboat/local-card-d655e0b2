
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Store } from 'lucide-react';

interface BusinessStatsProps {
  business: {
    pointsIssued: number;
    customersServed: number;
    revenue: number;
    avgTransactionPoints: number;
  };
}

const BusinessStats = ({ business }: BusinessStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Points Issued</p>
              <p className="text-2xl font-bold">{business.pointsIssued.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customers Served</p>
              <p className="text-2xl font-bold">{business.customersServed}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold">${business.revenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Points/Transaction</p>
              <p className="text-2xl font-bold">{business.avgTransactionPoints}</p>
            </div>
            <Store className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessStats;
