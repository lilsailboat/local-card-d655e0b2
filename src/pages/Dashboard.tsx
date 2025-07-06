
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, MapPin, Users, TrendingUp, Gift, Zap, Coffee, ShoppingBag } from 'lucide-react';
import { wardService } from '@/services/wardService';
import { pointsEngine } from '@/services/pointsEngine';
import { analyticsService } from '@/services/analyticsService';
import PointsRedemption from '@/components/PointsRedemption';

const Dashboard = () => {
  const [user] = useState({
    id: 'user_123',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    zipCode: '20009'
  });

  const [userWard, setUserWard] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // Load ward information
    const ward = wardService.getWardByZipCode(user.zipCode);
    setUserWard(ward);

    // Initialize and load points
    const points = pointsEngine.getUserPoints(user.id);
    if (!points) {
      pointsEngine.initializeUser(user.id);
      setUserPoints(0);
    } else {
      setUserPoints(points.balance);
    }

    // Load analytics
    const analytics = await analyticsService.getUserAnalytics(user.id);
    setUserAnalytics(analytics);
  };

  const handlePointsRedemption = (rewardId: string, pointsCost: number) => {
    setUserPoints(prev => prev - pointsCost);
    console.log(`Redeemed reward ${rewardId} for ${pointsCost} points`);
  };

  const mockTransactions = [
    { id: '1', merchantName: "Maya's Coffee House", amount: 12.50, points: 25, date: '2024-01-15', wardNumber: 1 },
    { id: '2', merchantName: 'Dupont Market', amount: 34.75, points: 69, date: '2024-01-14', wardNumber: 2 },
    { id: '3', merchantName: 'Shaw Bistro', amount: 45.00, points: 90, date: '2024-01-13', wardNumber: 7 }
  ];

  const mockChallenges = wardService.getWardChallenges(userWard?.number);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">
              {userWard ? `Ward ${userWard.number}: ${userWard.name}` : 'Loading ward information...'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{userPoints.toLocaleString()} points</div>
            <p className="text-sm text-gray-600">Available to redeem</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
                </div>
                <Gift className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">184</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Local Businesses</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ward Rank</p>
                  <p className="text-2xl font-bold">#3</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="redeem">Redeem Points</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Your Ward Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userWard && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800">Ward {userWard.number}</h3>
                        <p className="text-blue-600">{userWard.name}</p>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>ZIP Codes: {userWard.zipCodes.join(', ')}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">12</div>
                          <div className="text-sm text-gray-600">Businesses Visited</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">184</div>
                          <div className="text-sm text-gray-600">Points This Month</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{transaction.merchantName}</p>
                          <p className="text-sm text-gray-600">${transaction.amount}</p>
                        </div>
                        <Badge variant="outline">+{transaction.points} pts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Challenges */}
            {mockChallenges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Active Ward Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockChallenges.map((challenge) => (
                      <div key={challenge.id} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                            <p className="text-sm text-gray-500 mt-2">{challenge.requirement}</p>
                          </div>
                          <Badge className="bg-purple-600 text-white">
                            {challenge.reward} pts
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="redeem" className="space-y-4">
            <PointsRedemption 
              userId={user.id} 
              onRedemption={handlePointsRedemption}
            />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{transaction.merchantName}</h3>
                        <p className="text-sm text-gray-600">Ward {transaction.wardNumber} • {transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${transaction.amount}</div>
                        <Badge variant="outline">+{transaction.points} pts</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Ward Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{challenge.title}</h3>
                          <p className="text-gray-600 mt-2">{challenge.description}</p>
                        </div>
                        <Badge className="bg-purple-600 text-white text-lg px-3 py-1">
                          {challenge.reward} pts
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p><strong>Requirement:</strong> {challenge.requirement}</p>
                        <p><strong>Ends:</strong> {new Date(challenge.endDate).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: '33%'}}></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">1 of 3 transactions completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discover" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discover Local Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Coffee className="h-8 w-8 text-brown-600" />
                      <div>
                        <h3 className="font-semibold">Maya's Coffee House</h3>
                        <p className="text-sm text-gray-600">Ward 1 • Coffee & Pastries</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      2X Points Weekend
                    </Badge>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <ShoppingBag className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="font-semibold">Dupont Boutique</h3>
                        <p className="text-sm text-gray-600">Ward 2 • Fashion & Accessories</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      New Customer Bonus
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
