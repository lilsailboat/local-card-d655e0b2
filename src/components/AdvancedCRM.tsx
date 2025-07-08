
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, MapPin, Calendar, Filter, Download, Mail, Phone } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  lifetimeSpend: number;
  lastVisit: string;
  wardNumber: number;
  visits: number;
  averageSpend: number;
  riskScore: number;
}

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: any;
  customerCount: number;
  avgSpend: number;
  color: string;
}

const AdvancedCRM = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [filterWard, setFilterWard] = useState<string>('all');

  useEffect(() => {
    loadCRMData();
  }, []);

  const loadCRMData = () => {
    // Mock CRM data - in real implementation, this would come from your backend
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '(555) 123-4567',
        tier: 'gold',
        points: 3420,
        lifetimeSpend: 1250.00,
        lastVisit: '2024-01-15',
        wardNumber: 1,
        visits: 28,
        averageSpend: 44.64,
        riskScore: 15
      },
      {
        id: '2',
        name: 'Mike Rodriguez',
        email: 'mike.r@email.com',
        phone: '(555) 234-5678',
        tier: 'silver',
        points: 1850,
        lifetimeSpend: 780.00,
        lastVisit: '2024-01-14',
        wardNumber: 2,
        visits: 19,
        averageSpend: 41.05,
        riskScore: 25
      },
      {
        id: '3',
        name: 'Emma Liu',
        email: 'emma.l@email.com',
        phone: '(555) 345-6789',
        tier: 'platinum',
        points: 8750,
        lifetimeSpend: 2890.00,
        lastVisit: '2024-01-16',
        wardNumber: 6,
        visits: 45,
        averageSpend: 64.22,
        riskScore: 5
      }
    ];

    const mockSegments: Segment[] = [
      {
        id: 'high_value',
        name: 'High Value Customers',
        description: 'Customers with $500+ lifetime spend',
        criteria: { lifetimeSpend: { gte: 500 } },
        customerCount: 156,
        avgSpend: 75.50,
        color: 'bg-green-100 text-green-800'
      },
      {
        id: 'at_risk',
        name: 'At Risk',
        description: 'Customers who haven\'t visited in 30+ days',
        criteria: { lastVisit: { lt: 30 } },
        customerCount: 89,
        avgSpend: 32.10,
        color: 'bg-red-100 text-red-800'
      },
      {
        id: 'frequent',
        name: 'Frequent Visitors',
        description: 'Customers with 20+ visits',
        criteria: { visits: { gte: 20 } },
        customerCount: 203,
        avgSpend: 51.75,
        color: 'bg-blue-100 text-blue-800'
      },
      {
        id: 'ward_1',
        name: 'Ward 1 Locals',
        description: 'Customers primarily from Ward 1',
        criteria: { wardNumber: 1 },
        customerCount: 78,
        avgSpend: 45.20,
        color: 'bg-purple-100 text-purple-800'
      }
    ];

    setCustomers(mockCustomers);
    setSegments(mockSegments);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWard = filterWard === 'all' || customer.wardNumber.toString() === filterWard;
    return matchesSearch && matchesWard;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'points': return b.points - a.points;
      case 'spend': return b.lifetimeSpend - a.lifetimeSpend;
      case 'visits': return b.visits - a.visits;
      case 'lastVisit': return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
      default: return 0;
    }
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'bg-red-100 text-red-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const exportData = () => {
    const csvData = sortedCustomers.map(customer => ({
      Name: customer.name,
      Email: customer.email,
      Phone: customer.phone,
      Tier: customer.tier,
      Points: customer.points,
      'Lifetime Spend': customer.lifetimeSpend,
      'Last Visit': customer.lastVisit,
      Ward: customer.wardNumber,
      Visits: customer.visits,
      'Average Spend': customer.averageSpend
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer-data.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced CRM</h2>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Sort by Points</SelectItem>
                    <SelectItem value="spend">Sort by Spend</SelectItem>
                    <SelectItem value="visits">Sort by Visits</SelectItem>
                    <SelectItem value="lastVisit">Sort by Last Visit</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterWard} onValueChange={setFilterWard}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Wards</SelectItem>
                    <SelectItem value="1">Ward 1</SelectItem>
                    <SelectItem value="2">Ward 2</SelectItem>
                    <SelectItem value="6">Ward 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customer List */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Database ({sortedCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedCustomers.map((customer) => (
                  <div key={customer.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Mail className="h-3 w-3" />
                          <span>{customer.email}</span>
                          <Phone className="h-3 w-3 ml-4" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getTierColor(customer.tier)}>
                            {customer.tier.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            Ward {customer.wardNumber}
                          </Badge>
                          <Badge className={getRiskColor(customer.riskScore)}>
                            Risk: {customer.riskScore}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{customer.points.toLocaleString()} pts</div>
                        <div className="text-sm text-gray-600">${customer.lifetimeSpend.toFixed(2)} spent</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Visits:</span>
                        <span className="ml-2 font-medium">{customer.visits}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Spend:</span>
                        <span className="ml-2 font-medium">${customer.averageSpend.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Visit:</span>
                        <span className="ml-2 font-medium">{new Date(customer.lastVisit).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map((segment) => (
              <Card key={segment.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{segment.name}</span>
                    <Badge className={segment.color}>{segment.customerCount}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{segment.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">Avg Spend:</span>
                      <span className="ml-2 font-medium">${segment.avgSpend.toFixed(2)}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold">{customers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Lifetime Value</p>
                    <p className="text-2xl font-bold">
                      ${(customers.reduce((sum, c) => sum + c.lifetimeSpend, 0) / customers.length).toFixed(2)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">At Risk Customers</p>
                    <p className="text-2xl font-bold">
                      {customers.filter(c => c.riskScore >= 70).length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ward Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 6].map(ward => {
                  const wardCustomers = customers.filter(c => c.wardNumber === ward);
                  const percentage = (wardCustomers.length / customers.length) * 100;
                  return (
                    <div key={ward} className="flex items-center justify-between">
                      <span>Ward {ward}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {wardCustomers.length} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedCRM;
