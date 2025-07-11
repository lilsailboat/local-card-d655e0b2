
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComplianceChecksProps {
  onComplianceCheck: (type: 'gdpr' | 'ccpa' | 'hipaa' | 'pci_dss') => void;
}

const ComplianceChecks = ({ onComplianceCheck }: ComplianceChecksProps) => {
  const complianceTypes = [
    { type: 'gdpr' as const, title: 'GDPR Compliance' },
    { type: 'pci_dss' as const, title: 'PCI DSS Compliance' },
    { type: 'ccpa' as const, title: 'CCPA Compliance' },
    { type: 'hipaa' as const, title: 'HIPAA Compliance' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {complianceTypes.map((compliance) => (
        <Card key={compliance.type}>
          <CardHeader>
            <CardTitle>{compliance.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span>Status</span>
              <Badge className="bg-green-100 text-green-800">Compliant</Badge>
            </div>
            <Button onClick={() => onComplianceCheck(compliance.type)} variant="outline">
              Run {compliance.type.toUpperCase()} Check
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ComplianceChecks;
