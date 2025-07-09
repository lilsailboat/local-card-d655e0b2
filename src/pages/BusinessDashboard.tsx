
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone } from 'lucide-react';
import POSIntegration from '@/components/POSIntegration';
import BillingManagement from '@/components/BillingManagement';
import CampaignCreator, { Campaign } from '@/components/CampaignCreator';
import AdvancedCRM from '@/components/AdvancedCRM';
import Phase3Dashboard from '@/components/Phase3Dashboard';
import BusinessStats from '@/components/BusinessStats';
import BusinessOverview from '@/components/BusinessOverview';
import CampaignsList from '@/components/CampaignsList';
import BusinessSettings from '@/components/BusinessSettings';

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
        <BusinessStats business={business} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            <TabsTrigger value="pos-integration">POS</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <BusinessOverview />
          </TabsContent>

          <TabsContent value="crm" className="space-y-4">
            <AdvancedCRM />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <CampaignsList 
              campaigns={campaigns} 
              onCreateCampaign={() => setShowCampaignCreator(true)} 
            />
          </TabsContent>

          <TabsContent value="enterprise" className="space-y-4">
            <Phase3Dashboard />
          </TabsContent>

          <TabsContent value="pos-integration" className="space-y-4">
            <POSIntegration />
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <BillingManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <BusinessSettings />
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
