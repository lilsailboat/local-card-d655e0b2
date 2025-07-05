
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, MapPin, Gift, Users, TrendingUp, Star } from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({
    name: 'Sarah Johnson',
    pointsBalance: 2847,
    cardLinked: true,
    referralCode: 'SARAH2024'
  });

  const [transactions] = useState([
    { id: 1, business: 'Maya\'s Coffee House', amount: 24.50, points: 25, date: '2024-01-08', location: 'Downtown' },
    { id: 2, business: 'Green Valley Grocery', amount: 67.89, points: 68, date: '2024-01-07', location: 'Midtown' },
    { id: 3, business: 'Artisan Bakery', amount: 18.25, points: 18, date: '2024-01-06', location: 'Old Town' },
    { id: 4, business: 'Local Fitness Studio', amount: 45.00, points: 90, date: '2024-01-05', location: 'Westside', multiplier: '2X Points' }
  ]);

  const [nearbyBusinesses] = useState([
    { id: 1, name: 'Blue Moon Books', category: 'Books & Media', distance: '0.3 mi', points: '1-3% back', rating: 4.8 },
    { id: 2, name: 'Harvest Kitchen', category: 'Restaurant', distance: '0.5 mi', points: '2% back', rating: 4.6 },
    { id: 3, name: 'Corner Hardware', category: 'Home & Garden', distance: '0.7 mi', points: '1% back', rating: 4.9 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Here's your Local Card activity</p>
          </div>
          <Button variant="outline" className="bg-white">
            <Gift className="h-4 w-4 mr-2" />
            Redeem Points
          </Button>
        </div>

        {/* Points Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-emerald-100 mb-2">Current Balance</p>
                <p className="text-4xl font-bold">{user.pointsBalance.toLocaleString()} points</p>
                <p className="text-emerald-100 mt-2">≈ ${(user.pointsBalance * 0.01).toFixed(2)} value</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-100 mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {user.cardLinked ? 'Card Linked' : 'Link Card'}
                </div>
                <Button variant="secondary" size="sm">
                  Manage Cards
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{transaction.business}</h3>
                        <p className="text-sm text-gray-600">{transaction.date} • {transaction.location}</p>
                        {transaction.multiplier && (
                          <Badge variant="secondary" className="mt-1">{transaction.multiplier}</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-600">+{transaction.points} points</p>
                        <p className="text-sm text-gray-600">${transaction.amount}</p>
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
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Nearby Local Businesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyBusinesses.map((business) => (
                    <div key={business.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-semibold">{business.name}</h3>
                        <p className="text-sm text-gray-600">{business.category} • {business.distance}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm">{business.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                          {business.points}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
                    <p className="text-2xl font-bold">{user.referralCode}</p>
                  </div>
                  <p className="text-gray-600 mb-4">Share your code and earn 500 points for each friend who joins!</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Share Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Manage Linked Cards
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
