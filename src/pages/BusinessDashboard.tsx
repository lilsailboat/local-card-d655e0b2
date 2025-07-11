
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <p className="text-muted-foreground">Business Dashboard</p>
          </div>
          <Button 
            onClick={() => setShowCampaignCreator(true)}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Create Campaign</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <BusinessStats business={business} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            <TabsTrigger value="pos-integration">POS</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <BusinessOverview />
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
