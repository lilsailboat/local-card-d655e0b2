
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Store, DollarSign, TrendingUp, Users } from 'lucide-react';
import { wardService } from '@/services/wardService';
import { useNavigate } from 'react-router-dom';

const BusinessSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    category: '',
    description: '',
    website: '',
    estimatedMonthlyRevenue: ''
  });

  const selectedWard = wardService.getWardByZipCode(businessData.zipCode);

  const handleInputChange = (field: string, value: string) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Mock business registration
      console.log('Registering business:', businessData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to business dashboard
      navigate('/business');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePotentialEarnings = () => {
    const revenue = parseFloat(businessData.estimatedMonthlyRevenue) || 0;
    const localCardPercentage = 0.25; // Assume 25% of sales through Local Card
    const avgPointsRedemption = 0.15; // 15% points redemption rate
    const potentialEarnings = revenue * localCardPercentage * (1 - avgPointsRedemption);
    return potentialEarnings;
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-bold">Join Local Card for Business</h1>
            <p className="text-xl text-muted-foreground">Connect with customers and grow your local business</p>
          </div>

          {/* Pricing Card */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl font-semibold">Business Plan</span>
                </div>
                <div className="text-3xl font-bold text-primary">$40/month</div>
                <div className="text-sm text-muted-foreground">+ 3% commission on Local Card transactions</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center text-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• POS system integration</li>
                    <li>• Ward-based customer targeting</li>
                    <li>• Campaign creation tools</li>
                    <li>• Real-time analytics dashboard</li>
                    <li>• Customer loyalty programs</li>
                    <li>• Transaction processing</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center text-lg">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    Benefits
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Attract local customers</li>
                    <li>• Increase customer retention</li>
                    <li>• Ward-based marketing campaigns</li>
                    <li>• Detailed customer insights</li>
                    <li>• Automated loyalty rewards</li>
                    <li>• Community engagement tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold">25%</div>
                <div className="text-muted-foreground">Average Revenue Increase</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">40%</div>
                <div className="text-muted-foreground">Customer Retention Boost</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-2xl font-bold">15%</div>
                <div className="text-muted-foreground">New Customer Acquisition</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setStep(2)} 
              className="px-8 py-3 text-lg"
            >
              Get Started - Apply Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold">Business Application</CardTitle>
            <p className="text-muted-foreground">Tell us about your business to get started</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={businessData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Maya's Coffee House"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  value={businessData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="Maya Johnson"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={businessData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="maya@coffeehouse.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={businessData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(202) 555-0123"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address *</Label>
              <Input
                id="address"
                value={businessData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="1234 Main St NW, Washington, DC"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={businessData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="20009"
                />
                {selectedWard && (
                  <div className="text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                    Ward {selectedWard.number}: {selectedWard.name}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Business Category *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="cafe">Cafe/Coffee Shop</SelectItem>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="fitness">Fitness/Gym</SelectItem>
                    <SelectItem value="beauty">Beauty/Wellness</SelectItem>
                    <SelectItem value="services">Professional Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={businessData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Tell us about your business, what makes it special..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  value={businessData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://coffeehouse.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue">Est. Monthly Revenue</Label>
                <Input
                  id="revenue"
                  value={businessData.estimatedMonthlyRevenue}
                  onChange={(e) => handleInputChange('estimatedMonthlyRevenue', e.target.value)}
                  placeholder="15000"
                />
              </div>
            </div>

            {businessData.estimatedMonthlyRevenue && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-green-800">Potential Monthly Earnings</h3>
                  <div className="text-2xl font-bold text-green-600">
                    ${calculatePotentialEarnings().toFixed(0)}
                  </div>
                  <p className="text-sm text-green-700">
                    Based on 25% Local Card adoption and typical redemption rates
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-4 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={loading || !businessData.businessName || !businessData.email}
                className="flex-1"
              >
                {loading ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessSignup;
