
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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

  const wards = wardService.getAllWards();
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Local Card for Business</h1>
            <p className="text-xl text-gray-600">Connect with D.C. residents and grow your local customer base</p>
          </div>

          {/* Pricing Card */}
          <Card className="mb-8 border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Store className="h-8 w-8 text-blue-600 mr-2" />
                  <span className="text-2xl">Business Plan</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">$40/month</div>
                <div className="text-sm text-gray-600">+ 3% commission on Local Card transactions</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• POS system integration</li>
                    <li>• Ward-based customer targeting</li>
                    <li>• Campaign creation tools</li>
                    <li>• Real-time analytics dashboard</li>
                    <li>• Customer loyalty programs</li>
                    <li>• Transaction processing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                    Benefits
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Attract local D.C. customers</li>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">25%</div>
                <div className="text-gray-600">Average Revenue Increase</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">40%</div>
                <div className="text-gray-600">Customer Retention Boost</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">15%</div>
                <div className="text-gray-600">New Customer Acquisition</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setStep(2)} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Get Started - Apply Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Business Application</CardTitle>
            <p className="text-gray-600">Tell us about your business to get started</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={businessData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Maya's Coffee House"
                />
              </div>
              <div>
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
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={businessData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="maya@coffeehouse.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={businessData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(202) 555-0123"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Business Address *</Label>
              <Input
                id="address"
                value={businessData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="1234 Main St NW, Washington, DC"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={businessData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="20009"
                />
                {selectedWard && (
                  <Badge variant="outline" className="mt-2">
                    Ward {selectedWard.number}: {selectedWard.name}
                  </Badge>
                )}
              </div>
              <div>
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

            <div>
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
              <div>
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  value={businessData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://coffeehouse.com"
                />
              </div>
              <div>
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
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Potential Monthly Earnings</h3>
                  <div className="text-2xl font-bold text-green-600">
                    ${calculatePotentialEarnings().toFixed(0)}
                  </div>
                  <p className="text-sm text-green-700 mt-1">
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
                className="bg-blue-600 hover:bg-blue-700 flex-1"
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
