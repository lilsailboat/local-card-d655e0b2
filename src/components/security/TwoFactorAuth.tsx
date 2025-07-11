
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key } from 'lucide-react';

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

interface TwoFactorAuthProps {
  twoFactorSetup: TwoFactorSetup | null;
  onEnable2FA: () => void;
}

const TwoFactorAuth = ({ twoFactorSetup, onEnable2FA }: TwoFactorAuthProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="h-5 w-5 mr-2" />
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!twoFactorSetup ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">Enable two-factor authentication for enhanced security</p>
            <Button onClick={onEnable2FA} className="bg-blue-600 hover:bg-blue-700">
              Setup 2FA
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication has been initiated. Scan the QR code with your authenticator app.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <img src={twoFactorSetup.qrCode} alt="2FA QR Code" className="mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Secret: <code className="bg-gray-100 px-2 py-1 rounded">{twoFactorSetup.secret}</code>
              </p>
              <div>
                <h4 className="font-semibold mb-2">Backup Codes:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {twoFactorSetup.backupCodes.map((code: string, index: number) => (
                    <code key={index} className="bg-gray-100 px-2 py-1 rounded">
                      {code}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
