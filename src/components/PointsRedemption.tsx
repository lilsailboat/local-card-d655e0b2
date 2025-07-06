
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Gift, Coffee, ShoppingBag, Utensils, Zap, CheckCircle } from 'lucide-react';
import { pointsEngine } from '@/services/pointsEngine';

interface RewardItem {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'food' | 'retail' | 'services' | 'experiences';
  merchantId: string;
  merchantName: string;
  wardNumber: number;
  available: boolean;
  icon: React.ReactNode;
}

interface PointsRedemptionProps {
  userId: string;
  onRedemption?: (rewardId: string, pointsCost: number) => void;
}

const PointsRedemption = ({ userId, onRedemption }: PointsRedemptionProps) => {
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Mock rewards data
  const [rewards] = useState<RewardItem[]>([
    {
      id: 'coffee_free',
      name: 'Free Coffee',
      description: 'Any size coffee at participating cafes',
      pointsCost: 500,
      category: 'food',
      merchantId: 'maya_coffee',
      merchantName: "Maya's Coffee House",
      wardNumber: 1,
      available: true,
      icon: <Coffee className="h-6 w-6" />
    },
    {
      id: 'pastry_free',
      name: 'Free Pastry',
      description: 'Any pastry or baked good',
      pointsCost: 350,
      category: 'food',
      merchantId: 'maya_coffee',
      merchantName: "Maya's Coffee House", 
      wardNumber: 1,
      available: true,
      icon: <Utensils className="h-6 w-6" />
    },
    {
      id: 'retail_discount',
      name: '20% Off Purchase',
      description: '$50+ purchase at local retailers',
      pointsCost: 750,
      category: 'retail',
      merchantId: 'local_boutique',
      merchantName: 'Dupont Boutique',
      wardNumber: 2,
      available: true,
      icon: <ShoppingBag className="h-6 w-6" />
    },
    {
      id: 'experience_tour',
      name: 'Neighborhood Walking Tour',
      description: 'Guided tour of local historic sites',
      pointsCost: 1200,
      category: 'experiences',
      merchantId: 'dc_tours',
      merchantName: 'D.C. Walking Tours',
      wardNumber: 6,
      available: true,
      icon: <Gift className="h-6 w-6" />
    }
  ]);

  useEffect(() => {
    loadUserPoints();
  }, [userId]);

  const loadUserPoints = () => {
    const points = pointsEngine.getUserPoints(userId);
    setUserPoints(points?.balance || 0);
  };

  const handleRedeem = async (reward: RewardItem) => {
    if (userPoints < reward.pointsCost) {
      setMessage({ type: 'error', text: 'Insufficient points for this reward' });
      return;
    }

    setLoading(true);
    try {
      // Attempt to redeem points
      await pointsEngine.redeemPoints(userId, reward.pointsCost, reward.merchantId, reward.id);
      
      // Update local state
      setUserPoints(prev => prev - reward.pointsCost);
      
      // Show success message
      setMessage({ type: 'success', text: `Successfully redeemed ${reward.name}! Check your email for details.` });
      
      // Call parent callback
      onRedemption?.(reward.id, reward.pointsCost);
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Redemption failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return <Coffee className="h-4 w-4" />;
      case 'retail': return <ShoppingBag className="h-4 w-4" />;
      case 'services': return <Zap className="h-4 w-4" />;
      case 'experiences': return <Gift className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'retail': return 'bg-purple-100 text-purple-800';
      case 'services': return 'bg-blue-100 text-blue-800';
      case 'experiences': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Points Balance */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Your Points Balance</h3>
              <div className="text-3xl font-bold">{userPoints.toLocaleString()}</div>
            </div>
            <Gift className="h-12 w-12 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      {message && (
        <Alert className={`${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <AlertDescription className={`${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {message.type === 'success' && <CheckCircle className="h-4 w-4 inline mr-2" />}
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Available Rewards */}
      <div>
        <h3 className="text-xl font-bold mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className={`${!reward.available ? 'opacity-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {reward.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{reward.name}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${getCategoryColor(reward.category)} text-xs`}>
                    {getCategoryIcon(reward.category)}
                    <span className="ml-1 capitalize">{reward.category}</span>
                  </Badge>
                  <div className="text-right">
                    <div className="font-bold text-lg">{reward.pointsCost} pts</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  <div>{reward.merchantName}</div>
                  <div>Ward {reward.wardNumber}</div>
                </div>

                <Button
                  onClick={() => handleRedeem(reward)}
                  disabled={loading || !reward.available || userPoints < reward.pointsCost}
                  className={`w-full ${
                    userPoints >= reward.pointsCost && reward.available
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400'
                  }`}
                >
                  {loading ? 'Redeeming...' : 
                   userPoints < reward.pointsCost ? 'Insufficient Points' :
                   !reward.available ? 'Currently Unavailable' :
                   'Redeem'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Redemption History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Free Coffee</div>
                <div className="text-sm text-gray-600">Maya's Coffee House - 2 days ago</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-red-600">-500 pts</div>
                <Badge variant="outline" className="text-xs">Redeemed</Badge>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Free Pastry</div>
                <div className="text-sm text-gray-600">Maya's Coffee House - 1 week ago</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-red-600">-350 pts</div>
                <Badge variant="outline" className="text-xs">Redeemed</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsRedemption;
