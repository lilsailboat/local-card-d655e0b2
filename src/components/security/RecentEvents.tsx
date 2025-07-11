
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, XCircle } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type SecurityAuditLog = Database['public']['Tables']['security_audit_logs']['Row'];

interface RecentEventsProps {
  auditLogs: SecurityAuditLog[];
}

const RecentEvents = ({ auditLogs }: RecentEventsProps) => {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Recent Security Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-gray-600">{log.resource}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getRiskLevelColor(log.risk_level)}>
                  {log.risk_level}
                </Badge>
                {log.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEvents;
