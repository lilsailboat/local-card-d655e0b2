
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, XCircle, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

interface SecurityStatsProps {
  dashboardData: {
    totalEvents: number;
    blockedEvents: number;
    trustedDevices: number;
    riskScore: number;
    activeThreats: number;
  } | null;
}

const SecurityStats = ({ dashboardData }: SecurityStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold">{dashboardData?.totalEvents || 0}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blocked Events</p>
              <p className="text-2xl font-bold text-red-600">{dashboardData?.blockedEvents || 0}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trusted Devices</p>
              <p className="text-2xl font-bold text-green-600">{dashboardData?.trustedDevices || 0}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Risk Score</p>
              <p className="text-2xl font-bold text-orange-600">{dashboardData?.riskScore || 0}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Threats</p>
              <p className="text-2xl font-bold text-red-600">{dashboardData?.activeThreats || 0}</p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityStats;
