import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, MapPin, Users, TrendingUp, Shield, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">Local Card</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <a href="/auth">Sign In</a>
              </Button>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <a href="/auth">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reward Local Shopping with <span className="text-emerald-600">Local Card</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect customers with local businesses through a smart rewards platform that strengthens communities and drives economic growth.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700">
              <a href="/auth">Start Using Local Card</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/business/auth">Business Login</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Local Card?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CreditCard className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Smart Rewards</CardTitle>
              <CardContent>
                <p className="text-gray-600">Earn points at local businesses and redeem for exclusive rewards and discounts.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Local Discovery</CardTitle>
              <CardContent>
                <p className="text-gray-600">Find amazing local businesses in your ward and discover hidden gems in your community.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Secure & Private</CardTitle>
              <CardContent>
                <p className="text-gray-600">Enterprise-grade security with comprehensive audit logging and compliance monitoring.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Community Building</CardTitle>
              <CardContent>
                <p className="text-gray-600">Connect with neighbors and support local economic development through ward-based challenges.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Business Growth</CardTitle>
              <CardContent>
                <p className="text-gray-600">Advanced analytics and campaign tools help local businesses attract and retain customers.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <CardTitle className="mb-2">Real-time Insights</CardTitle>
              <CardContent>
                <p className="text-gray-600">Live security monitoring and compliance dashboards for administrators and business owners.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Support Your Local Community?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of customers and businesses building stronger local economies.</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <a href="/auth">Get Started Today</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600" asChild>
              <a href="/security">View Security Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-6 w-6" />
                <span className="text-xl font-bold">Local Card</span>
              </div>
              <p className="text-gray-400">Strengthening communities through local commerce and smart rewards.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <div className="space-y-2">
                <a href="/auth" className="block text-gray-400 hover:text-white">Sign Up</a>
                <a href="/dashboard" className="block text-gray-400 hover:text-white">Dashboard</a>
                <a href="/customer-portal" className="block text-gray-400 hover:text-white">Rewards Portal</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Businesses</h4>
              <div className="space-y-2">
                <a href="/business/auth" className="block text-gray-400 hover:text-white">Business Login</a>
                <a href="/business/signup" className="block text-gray-400 hover:text-white">Join as Business</a>
                <a href="/business" className="block text-gray-400 hover:text-white">Business Dashboard</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Security & Legal</h4>
              <div className="space-y-2">
                <a href="/security" className="block text-gray-400 hover:text-white">Security Dashboard</a>
                <a href="/terms" className="block text-gray-400 hover:text-white">Terms of Service</a>
                <a href="/privacy" className="block text-gray-400 hover:text-white">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Local Card. All rights reserved. Secure, compliant, and community-focused.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
