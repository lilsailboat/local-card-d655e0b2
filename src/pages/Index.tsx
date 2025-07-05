
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Users, MapPin, TrendingUp, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Local Card</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
            Coalition Loyalty Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Support Local.<br />
            <span className="text-emerald-600">Earn Rewards.</span><br />
            <span className="text-blue-600">Automatically.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Link your card once and earn points automatically at hundreds of local businesses. 
            Help your community thrive while getting rewarded for every purchase.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                <Smartphone className="h-5 w-5 mr-2" />
                Get Local Card
              </Button>
            </Link>
            <Link to="/business">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                <Users className="h-5 w-5 mr-2" />
                Join as Business
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              HIPAA-Compliant
            </div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              PCI DSS Secure
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              12,000+ Members
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Local Card Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start supporting local businesses and earning rewards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>1. Link Your Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Securely connect your debit or credit card through our encrypted platform. 
                  We never store your card details.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>2. Shop Local</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visit any participating local business and pay with your linked card. 
                  Discover new favorites near you.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>3. Earn Automatically</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Points are added to your account automatically. Redeem at any Local Card business 
                  or use for exclusive offers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Local Shoppers</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Automatic Rewards</h3>
                    <p className="text-gray-600">Earn 1-3% back on every purchase without changing how you shop</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Impact</h3>
                    <p className="text-gray-600">Support local businesses and help your community thrive</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Discover New Places</h3>
                    <p className="text-gray-600">Find hidden gems and local favorites in your area</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">For Local Businesses</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Increased Customer Loyalty</h3>
                    <p className="text-gray-600">Keep customers coming back with automatic rewards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">New Customer Acquisition</h3>
                    <p className="text-gray-600">Attract customers from other Local Card businesses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Marketing Analytics</h3>
                    <p className="text-gray-600">Get insights into customer behavior and campaign performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people already earning rewards while supporting local businesses in their community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/business">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3">
                List Your Business
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold text-white">Local Card</span>
              </div>
              <p className="text-gray-400">
                Supporting local businesses through community-powered rewards.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">For Users</h3>
              <div className="space-y-2">
                <Link to="/signup" className="block text-gray-400 hover:text-white">Sign Up</Link>
                <Link to="/dashboard" className="block text-gray-400 hover:text-white">Dashboard</Link>
                <Link to="/link-card" className="block text-gray-400 hover:text-white">Link Card</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">For Businesses</h3>
              <div className="space-y-2">
                <Link to="/business" className="block text-gray-400 hover:text-white">Business Portal</Link>
                <a href="#" className="block text-gray-400 hover:text-white">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white">Support</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link to="/terms" className="block text-gray-400 hover:text-white">Terms of Service</Link>
                <a href="#" className="block text-gray-400 hover:text-white">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Local Card. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
