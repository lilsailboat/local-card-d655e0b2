
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Building, DollarSign, BarChart3, MapPin } from 'lucide-react';

const InvestorDashboard = () => {
  const [metrics] = useState({
    totalUsers: 12847,
    mau: 8234,
    totalBusinesses: 156,
    grossTransactionVolume: 1247582,
    mrr: 47582,
    cac: 28.50,
    ltv: 186.75,
    churnRate: 3.2
  });

  const [cohortData] = useState([
    { month: 'Jan 2024', signups: 1247, cardLinked: 892, firstTransaction: 634, retention30: 87 },
    { month: 'Dec 2023', signups: 1098, cardLinked: 798, firstTransaction: 567, retention30: 82 },
    { month: 'Nov 2023', signups: 967, cardLinked: 723, firstTransaction: 512, retention30: 79 }
  ]);

  const [geoData] = useState([
    { state: 'CA', users: 3247, businesses: 45, volume: 456789 },
    { state: 'TX', users: 2156, businesses: 32, volume: 298456 },
    { state: 'NY', users: 1889, businesses: 28, volume: 267891 },
    { state: 'FL', users: 1456, businesses: 21, volume: 189234 }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-semibold">Investor Dashboard</h1>
          <p className="text-muted-foreground">Local Card Platform Analytics - Read Only</p>
          <Badge variant="outline">Last Updated: 2 hours ago</Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-semibold">{metrics.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12% MoM</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">MAU</p>
                  <p className="text-2xl font-semibold">{metrics.mau.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+8% MoM</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Active Businesses</p>
                  <p className="text-2xl font-semibold">{metrics.totalBusinesses}</p>
                  <p className="text-xs text-green-600">+15% MoM</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-semibold">${metrics.mrr.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+18% MoM</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Customer Acquisition Cost</span>
                    <span className="font-semibold">${metrics.cac}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lifetime Value</span>
                    <span className="font-semibold">${metrics.ltv}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">LTV:CAC Ratio</span>
                    <span className="font-semibold text-green-600">{(metrics.ltv / metrics.cac).toFixed(1)}:1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly Churn Rate</span>
                    <span className="font-semibold">{metrics.churnRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Transaction Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 space-y-4">
                    <p className="text-3xl font-semibold text-green-600">
                      ${metrics.grossTransactionVolume.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">Gross Transaction Volume (MTD)</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Transaction</span>
                        <span>$37.82</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Points Issued</span>
                        <span>1.2M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Points Redeemed</span>
                        <span>890K</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">User Acquisition Funnel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Website Visitors</span>
                  </div>
                  <span className="font-semibold">45,230</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Signups</span>
                  </div>
                  <span className="font-semibold">2,847 (6.3%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Card Linked</span>
                  </div>
                  <span className="font-semibold">2,134 (75.0%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span>First Transaction</span>
                  </div>
                  <span className="font-semibold">1,678 (78.6%)</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cohorts" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Cohort Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cohortData.map((cohort, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">{cohort.month}</h3>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Signups</p>
                        <p className="font-semibold">{cohort.signups}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Card Linked</p>
                        <p className="font-semibold">{cohort.cardLinked} ({Math.round(cohort.cardLinked/cohort.signups*100)}%)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">First Transaction</p>
                        <p className="font-semibold">{cohort.firstTransaction} ({Math.round(cohort.firstTransaction/cohort.cardLinked*100)}%)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">30-Day Retention</p>
                        <p className="font-semibold">{cohort.retention30}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {geoData.map((state, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{state.state}</h3>
                      <p className="text-sm text-muted-foreground">{state.users.toLocaleString()} users</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${state.volume.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{state.businesses} businesses</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Revenue Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Transaction Fees (3%)</span>
                        <span className="font-semibold">$37,427</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Business Fees</span>
                        <span className="font-semibold">$7,644</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Premium Features</span>
                        <span className="font-semibold">$2,511</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-semibold">
                        <span>Total MRR</span>
                        <span>${metrics.mrr.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Unit Economics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>ARPU (Monthly)</span>
                        <span className="font-semibold">$5.78</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payback Period</span>
                        <span className="font-semibold">4.9 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross Margin</span>
                        <span className="font-semibold">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Burn</span>
                        <span className="font-semibold text-red-600">$89,234</span>
                      </div>
                    </div>
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

export default InvestorDashboard;
