
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SecurityStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Database Encryption</span>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>API Rate Limiting</span>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Audit Logging</span>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>TLS Encryption</span>
            <Badge className="bg-green-100 text-green-800">TLS 1.3</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityStatus;
