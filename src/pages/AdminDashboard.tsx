
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Building, AlertTriangle, TrendingUp, Shield, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 12847,
    totalBusinesses: 156,
    flaggedAccounts: 3,
    monthlyRevenue: 47582
  });

  const [users] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', points: 2847, status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Mike Rodriguez', email: 'mike@email.com', points: 1203, status: 'Active', joined: '2024-01-10' },
    { id: 3, name: 'Emma Wilson', email: 'emma@email.com', points: 567, status: 'Flagged', joined: '2024-01-08' }
  ]);

  const [businesses] = useState([
    { id: 1, name: 'Maya\'s Coffee House', owner: 'Maya Patel', status: 'Active', monthlyFee: 49, transactions: 234 },
    { id: 2, name: 'Green Valley Grocery', owner: 'Tom Green', status: 'Pending', monthlyFee: 49, transactions: 567 },
    { id: 3, name: 'Artisan Bakery', owner: 'Lisa Chen', status: 'Active', monthlyFee: 49, transactions: 189 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">System management and oversight</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
            <Button className="bg-slate-600 hover:bg-slate-700">
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Businesses</p>
                  <p className="text-2xl font-bold">{stats.totalBusinesses}</p>
                </div>
                <Building className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Flagged Accounts</p>
                  <p className="text-2xl font-bold text-red-600">{stats.flaggedAccounts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="businesses">Business Management</TabsTrigger>
            <TabsTrigger value="activity">Activity Feed</TabsTrigger>
            <TabsTrigger value="support">Support Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex space-x-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.points.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="businesses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Monthly Fee</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell>{business.owner}</TableCell>
                        <TableCell>
                          <Badge variant={business.status === 'Active' ? 'default' : 'secondary'}>
                            {business.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${business.monthlyFee}</TableCell>
                        <TableCell>{business.transactions}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-green-500 bg-green-50">
                    <div className="text-green-600">✓</div>
                    <div>
                      <p className="font-medium">New business approved: Sunset Yoga Studio</p>
                      <p className="text-sm text-gray-600">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                    <div className="text-blue-600">👤</div>
                    <div>
                      <p className="font-medium">147 new user signups today</p>
                      <p className="text-sm text-gray-600">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <div className="text-yellow-600">⚠️</div>
                    <div>
                      <p className="font-medium">Account flagged for unusual activity</p>
                      <p className="text-sm text-gray-600">12 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Support Ticket Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">#1234 - Card linking issue</h3>
                      <Badge variant="destructive">High Priority</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">User unable to link Chase debit card</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Sarah Johnson • sarah@email.com</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">#1235 - Points not showing</h3>
                      <Badge variant="secondary">Medium Priority</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Transaction points not appearing in account</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mike Rodriguez • mike@email.com</span>
                      <span>4 hours ago</span>
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

export default AdminDashboard;
