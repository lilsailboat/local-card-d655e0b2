
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Store, Users, TrendingUp, DollarSign, Calendar, Settings, Megaphone, Wifi, CreditCard } from 'lucide-react';
import POSIntegration from '@/components/POSIntegration';
import BillingManagement from '@/components/BillingManagement';
import CampaignCreator, { Campaign } from '@/components/CampaignCreator';

const BusinessDashboard = () => {
  const [business] = useState({
    name: 'Maya\'s Coffee House',
    pointsIssued: 15420,
    customersServed: 312,
    revenue: 4567.89,
    avgTransactionPoints: 28
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { 
      id: '1', 
      name: 'Weekend Double Points', 
      description: 'Earn double points on weekend purchases',
      type: 'points_multiplier',
      multiplier: 2,
      targetWards: [1, 2],
      startDate: '2024-01-01', 
      endDate: '2024-01-31',
      maxRedemptions: 500,
      currentRedemptions: 127,
      isActive: true,
      budget: 1000
    },
    { 
      id: '2', 
      name: 'New Customer Bonus', 
      description: 'Earn 100 bonus points on first purchase',
      type: 'bonus_points',
      bonusAmount: 100,
      targetWards: [1],
      startDate: '2024-02-01', 
      endDate: '2024-02-15',
      maxRedemptions: 200,
      currentRedemptions: 43,
      isActive: false,
      budget: 500
    }
  ]);

  const [showCampaignCreator, setShowCampaignCreator] = useState(false);

  const handleSaveCampaign = (newCampaign: Campaign) => {
    setCampaigns(prev => [...prev, newCampaign]);
    setShowCampaignCreator(false);
  };

  const getCampaignStatusColor = (campaign: Campaign) => {
    if (!campaign.isActive) return 'secondary';
    if (campaign.maxRedemptions && campaign.currentRedemptions >= campaign.maxRedemptions) return 'destructive';
    return 'default';
  };

  const getCampaignTypeLabel = (campaign: Campaign) => {
    switch (campaign.type) {
      case 'points_multiplier': return `${campaign.multiplier}X Points`;
      case 'bonus_points': return `+${campaign.bonusAmount} Points`;
      case 'discount': return `${campaign.discountPercent}% Off`;
      case 'free_item': return campaign.freeItem;
      default: return 'Campaign';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
            <p className="text-gray-600">Business Dashboard</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowCampaignCreator(true)}
          >
            <Megaphone className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Points Issued</p>
                  <p className="text-2xl font-bold">{business.pointsIssued.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Customers Served</p>
                  <p className="text-2xl font-bold">{business.customersServed}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${business.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Points/Transaction</p>
                  <p className="text-2xl font-bold">{business.avgTransactionPoints}</p>
                </div>
                <Store className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="pos-integration">POS Integration</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Sarah J.</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                      <Badge variant="outline">+24 points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Mike R.</p>
                        <p className="text-sm text-gray-600">4 hours ago</p>
                      </div>
                      <Badge variant="outline">+31 points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Emma L.</p>
                        <p className="text-sm text-gray-600">6 hours ago</p>
                      </div>
                      <Badge variant="outline">+18 points</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Local Card Sales</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      $3,567 of $4,568 total sales through Local Card
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Megaphone className="h-5 w-5 mr-2" />
                  Active Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                        <p className="text-sm text-gray-600">
                          {campaign.startDate} - {campaign.endDate}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">
                            Wards: {campaign.targetWards.join(', ')}
                          </Badge>
                          {campaign.maxRedemptions && (
                            <Badge variant="outline">
                              {campaign.currentRedemptions}/{campaign.maxRedemptions} used
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant={getCampaignStatusColor(campaign)}>
                          {campaign.isActive ? 'Active' : 'Draft'}
                        </Badge>
                        <Badge variant="outline">{getCampaignTypeLabel(campaign)}</Badge>
                      </div>
                    </div>
                  ))}
                  
                  {campaigns.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No campaigns created yet</p>
                      <Button 
                        onClick={() => setShowCampaignCreator(true)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                      >
                        Create Your First Campaign
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pos-integration" className="space-y-4">
            <POSIntegration />
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <BillingManagement />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Maya's Coffee House" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    defaultValue="Artisanal coffee and pastries in the heart of downtown"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" defaultValue="Coffee & Cafe" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" className="mt-1" />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Business Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Billing & Payments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  API Integration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Support Tickets
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Campaign Creator Modal */}
        {showCampaignCreator && (
          <CampaignCreator
            onClose={() => setShowCampaignCreator(false)}
            onSave={handleSaveCampaign}
          />
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
