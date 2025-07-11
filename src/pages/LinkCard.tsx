
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
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Card Linked Successfully</h1>
              <p className="text-muted-foreground">
                Your debit card ending in 4532 has been securely linked. You'll now earn points automatically when shopping at Local Card businesses.
              </p>
            </div>
            <Button onClick={handleComplete} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">Link Your Card</CardTitle>
            <p className="text-muted-foreground">
              Securely connect your debit or credit card to start earning points automatically
            </p>
          </div>
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
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full"
              >
                Continue
              </Button>

              <div className="text-center">
                <Button variant="link" onClick={handlePlaidLink} className="text-sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Use Plaid Secure Link Instead
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Verify Your Identity</h3>
                <p className="text-muted-foreground">
                  We'll send a small verification charge (refunded immediately) to confirm your card
                </p>
              </div>

              <Button 
                onClick={handlePlaidLink}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Verifying...' : 'Verify Card'}
              </Button>
            </>
          )}

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>🔒 Protected by 256-bit SSL encryption</p>
            <p>We never store your full card number</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkCard;
