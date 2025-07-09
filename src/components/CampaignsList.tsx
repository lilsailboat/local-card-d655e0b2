
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Megaphone } from 'lucide-react';
import { Campaign } from '@/components/CampaignCreator';

interface CampaignsListProps {
  campaigns: Campaign[];
  onCreateCampaign: () => void;
}

const CampaignsList = ({ campaigns, onCreateCampaign }: CampaignsListProps) => {
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
                onClick={onCreateCampaign}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Create Your First Campaign
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignsList;
