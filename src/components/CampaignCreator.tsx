
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Target, Gift, Zap, X } from 'lucide-react';
import { wardService } from '@/services/wardService';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'points_multiplier' | 'bonus_points' | 'discount' | 'free_item';
  multiplier?: number;
  bonusAmount?: number;
  discountPercent?: number;
  freeItem?: string;
  minPurchase?: number;
  targetWards: number[];
  startDate: string;
  endDate: string;
  maxRedemptions?: number;
  currentRedemptions: number;
  isActive: boolean;
  budget: number;
}

interface CampaignCreatorProps {
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
}

const CampaignCreator = ({ onClose, onSave }: CampaignCreatorProps) => {
  const [campaign, setCampaign] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    type: 'points_multiplier',
    multiplier: 2,
    targetWards: [],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    maxRedemptions: 100,
    currentRedemptions: 0,
    isActive: false,
    budget: 500
  });

  const [errors, setErrors] = useState<string[]>([]);
  const wards = wardService.getAllWards();

  const handleInputChange = (field: keyof Campaign, value: any) => {
    setCampaign(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const toggleWard = (wardNumber: number) => {
    const currentWards = campaign.targetWards || [];
    if (currentWards.includes(wardNumber)) {
      handleInputChange('targetWards', currentWards.filter(w => w !== wardNumber));
    } else {
      handleInputChange('targetWards', [...currentWards, wardNumber]);
    }
  };

  const validateCampaign = (): string[] => {
    const errors: string[] = [];
    
    if (!campaign.name?.trim()) errors.push('Campaign name is required');
    if (!campaign.description?.trim()) errors.push('Campaign description is required');
    if (!campaign.targetWards?.length) errors.push('Select at least one target ward');
    if (campaign.startDate && campaign.endDate && campaign.startDate >= campaign.endDate) {
      errors.push('End date must be after start date');
    }
    if (!campaign.budget || campaign.budget <= 0) errors.push('Budget must be greater than 0');
    
    if (campaign.type === 'points_multiplier' && (!campaign.multiplier || campaign.multiplier <= 1)) {
      errors.push('Points multiplier must be greater than 1');
    }
    if (campaign.type === 'bonus_points' && (!campaign.bonusAmount || campaign.bonusAmount <= 0)) {
      errors.push('Bonus points amount must be greater than 0');
    }
    if (campaign.type === 'discount' && (!campaign.discountPercent || campaign.discountPercent <= 0 || campaign.discountPercent >= 100)) {
      errors.push('Discount percent must be between 1-99');
    }
    if (campaign.type === 'free_item' && !campaign.freeItem?.trim()) {
      errors.push('Free item description is required');
    }
    
    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateCampaign();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newCampaign: Campaign = {
      id: `campaign_${Date.now()}`,
      name: campaign.name!,
      description: campaign.description!,
      type: campaign.type!,
      multiplier: campaign.multiplier,
      bonusAmount: campaign.bonusAmount,
      discountPercent: campaign.discountPercent,
      freeItem: campaign.freeItem,
      minPurchase: campaign.minPurchase,
      targetWards: campaign.targetWards!,
      startDate: campaign.startDate!,
      endDate: campaign.endDate!,
      maxRedemptions: campaign.maxRedemptions,
      currentRedemptions: 0,
      isActive: true,
      budget: campaign.budget!
    };

    onSave(newCampaign);
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'points_multiplier': return <Zap className="h-4 w-4" />;
      case 'bonus_points': return <Gift className="h-4 w-4" />;
      case 'discount': return <Target className="h-4 w-4" />;
      case 'free_item': return <Gift className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Create New Campaign
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {errors.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-700">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                value={campaign.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Weekend Double Points"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={campaign.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Earn double points on all purchases during weekends"
                rows={3}
              />
            </div>
          </div>

          {/* Campaign Type */}
          <div>
            <Label>Campaign Type *</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { value: 'points_multiplier', label: 'Points Multiplier', desc: 'e.g., 2X points' },
                { value: 'bonus_points', label: 'Bonus Points', desc: 'e.g., +50 points' },
                { value: 'discount', label: 'Discount', desc: 'e.g., 20% off' },
                { value: 'free_item', label: 'Free Item', desc: 'e.g., Free coffee' }
              ].map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer border-2 ${campaign.type === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handleInputChange('type', type.value)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      {getCampaignTypeIcon(type.value)}
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.desc}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Campaign Value */}
          <div className="grid grid-cols-2 gap-4">
            {campaign.type === 'points_multiplier' && (
              <div>
                <Label htmlFor="multiplier">Points Multiplier *</Label>
                <Input
                  id="multiplier"
                  type="number"
                  min="2"
                  max="10"
                  value={campaign.multiplier || ''}
                  onChange={(e) => handleInputChange('multiplier', parseFloat(e.target.value))}
                />
              </div>
            )}
            
            {campaign.type === 'bonus_points' && (
              <div>
                <Label htmlFor="bonusAmount">Bonus Points *</Label>
                <Input
                  id="bonusAmount"
                  type="number"
                  min="1"
                  value={campaign.bonusAmount || ''}
                  onChange={(e) => handleInputChange('bonusAmount', parseInt(e.target.value))}
                />
              </div>
            )}
            
            {campaign.type === 'discount' && (
              <div>
                <Label htmlFor="discountPercent">Discount Percent *</Label>
                <Input
                  id="discountPercent"
                  type="number"
                  min="1"
                  max="99"
                  value={campaign.discountPercent || ''}
                  onChange={(e) => handleInputChange('discountPercent', parseInt(e.target.value))}
                />
              </div>
            )}
            
            {campaign.type === 'free_item' && (
              <div>
                <Label htmlFor="freeItem">Free Item *</Label>
                <Input
                  id="freeItem"
                  value={campaign.freeItem || ''}
                  onChange={(e) => handleInputChange('freeItem', e.target.value)}
                  placeholder="Free small coffee"
                />
              </div>
            )}

            <div>
              <Label htmlFor="minPurchase">Minimum Purchase ($)</Label>
              <Input
                id="minPurchase"
                type="number"
                min="0"
                step="0.01"
                value={campaign.minPurchase || ''}
                onChange={(e) => handleInputChange('minPurchase', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Target Wards */}
          <div>
            <Label>Target Wards *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {wards.map((ward) => (
                <div
                  key={ward.number}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    campaign.targetWards?.includes(ward.number) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => toggleWard(ward.number)}
                >
                  <div className="font-medium">Ward {ward.number}</div>
                  <div className="text-sm text-gray-600">{ward.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={campaign.startDate || ''}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={campaign.endDate || ''}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
          </div>

          {/* Limits and Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxRedemptions">Max Redemptions</Label>
              <Input
                id="maxRedemptions"
                type="number"
                min="1"
                value={campaign.maxRedemptions || ''}
                onChange={(e) => handleInputChange('maxRedemptions', parseInt(e.target.value))}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="budget">Campaign Budget ($) *</Label>
              <Input
                id="budget"
                type="number"
                min="1"
                value={campaign.budget || ''}
                onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                placeholder="500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCreator;
