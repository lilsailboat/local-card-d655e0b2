
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LinkCard = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaidLink = async () => {
    setLoading(true);
    // Simulate Plaid linking process
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Card Linked Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Your debit card ending in 4532 has been securely linked. You'll now earn points automatically when shopping at Local Card businesses.
            </p>
            <Button onClick={handleComplete} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CreditCard className="h-12 w-12 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Link Your Card</CardTitle>
          <p className="text-gray-600">
            Securely connect your debit or credit card to start earning points automatically
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your card information is encrypted and never stored on our servers. We use bank-level security.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Continue
              </Button>

              <div className="text-center">
                <Button variant="link" onClick={handlePlaidLink}>
                  <Lock className="h-4 w-4 mr-2" />
                  Use Plaid Secure Link Instead
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Verify Your Identity</h3>
                <p className="text-gray-600 mb-6">
                  We'll send a small verification charge (refunded immediately) to confirm your card
                </p>
              </div>

              <Button 
                onClick={handlePlaidLink}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? 'Verifying...' : 'Verify Card'}
              </Button>
            </>
          )}

          <div className="text-xs text-gray-500 text-center">
            <p>🔒 Protected by 256-bit SSL encryption</p>
            <p>We never store your full card number</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkCard;
