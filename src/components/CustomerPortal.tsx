
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Trophy, Gift, History, MapPin, Share2, Calendar } from 'lucide-react';
import { pointsEngine } from '@/services/pointsEngine';
import { wardService } from '@/services/wardService';
import PointsRedemption from './PointsRedemption';

interface CustomerPortalProps {
  userId: string;
  customerData?: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    joinDate: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    wardNumber: number;
  };
}

const CustomerPortal = ({ userId, customerData }: CustomerPortalProps) => {
  const [userPoints, setUserPoints] = useState(0);
  const [lifetimePoints, setLifetimePoints] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [nextTierProgress, setNextTierProgress] = useState(0);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = () => {
    const points = pointsEngine.getUserPoints(userId);
    const history = pointsEngine.getUserPointsHistory(userId);
    const wardChallenges = wardService.getWardChallenges(customerData?.wardNumber);

    setUserPoints(points?.balance || 0);
    setLifetimePoints(points?.lifetime || 0);
    setTransactions(history.slice(0, 10));
    setChallenges(wardChallenges);
    
    // Calculate next tier progress
    const tierThresholds = { bronze: 0, silver: 1000, gold: 5000, platinum: 15000 };
    const currentTier = customerData?.tier || 'bronze';
    const nextTier = currentTier === 'bronze' ? 'silver' : 
                    currentTier === 'silver' ? 'gold' : 
                    currentTier === 'gold' ? 'platinum' : 'platinum';
    
    if (nextTier !== 'platinum') {
      const currentThreshold = tierThresholds[currentTier];
      const nextThreshold = tierThresholds[nextTier];
      const progress = Math.min(((lifetimePoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100, 100);
      setNextTierProgress(progress);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return '🥉';
      case 'silver': return '🥈';
      case 'gold': return '🥇';
      case 'platinum': return '💎';
      default: return '🏆';
    }
  };

  const sharePoints = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Loyalty Points',
        text: `I've earned ${userPoints} points on Local Card DC!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`I've earned ${userPoints} points on Local Card DC! ${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customerData?.avatar} />
              <AvatarFallback>
                {customerData?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{customerData?.name || 'Welcome'}</h1>
              <div className="flex items-center space-x-2">
                <Badge className={getTierColor(customerData?.tier || 'bronze')}>
                  {getTierIcon(customerData?.tier || 'bronze')} {customerData?.tier?.toUpperCase() || 'BRONZE'}
                </Badge>
                {customerData?.wardNumber && (
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    Ward {customerData.wardNumber}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button onClick={sharePoints} variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Points Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Current Points</p>
                      <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
                    </div>
                    <Gift className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Lifetime Points</p>
                      <p className="text-2xl font-bold">{lifetimePoints.toLocaleString()}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-lg font-semibold">
                        {customerData?.joinDate ? new Date(customerData.joinDate).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tier Progress */}
            {customerData?.tier !== 'platinum' && (
              <Card>
                <CardHeader>
                  <CardTitle>Tier Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to next tier</span>
                      <span>{Math.round(nextTierProgress)}%</span>
                    </div>
                    <Progress value={nextTierProgress} className="h-2" />
                    <p className="text-xs text-gray-600">
                      Earn more points to unlock better rewards and exclusive perks!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.source}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={transaction.amount > 0 ? 'default' : 'destructive'}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <PointsRedemption userId={userId} onRedemption={loadUserData} />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge variant="outline">+{challenge.reward} pts</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Ends: {new Date(challenge.endDate).toLocaleDateString()}</span>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Points History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.source}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </p>
                        {transaction.metadata?.merchantId && (
                          <p className="text-xs text-gray-500">
                            Merchant: {transaction.metadata.merchantId}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={transaction.amount > 0 ? 'default' : 'destructive'}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPortal;
