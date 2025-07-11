
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type SecurityAuditLog = Database['public']['Tables']['security_audit_logs']['Row'];

interface AuditLogsProps {
  auditLogs: SecurityAuditLog[];
}

const AuditLogs = ({ auditLogs }: AuditLogsProps) => {
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
        <CardTitle>Security Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditLogs.map((log) => (
            <div key={log.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{log.action}</h3>
                  <p className="text-sm text-gray-600">Resource: {log.resource}</p>
                  {log.user_id && (
                    <p className="text-sm text-gray-600">User: {log.user_id.substring(0, 8)}...</p>
                  )}
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
              <div className="text-sm text-gray-500">
                <p>Time: {new Date(log.created_at).toLocaleString()}</p>
                {log.ip_address && <p>IP: {String(log.ip_address)}</p>}
                {log.details && (
                  <p>Details: {JSON.stringify(log.details)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditLogs;
