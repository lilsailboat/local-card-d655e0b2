
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Store, 
  Users, 
  TrendingUp, 
  Shield, 
  Smartphone,
  MapPin,
  Award,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Store,
      title: "Merchant Dashboard",
      description: "Complete POS integration with Square & Clover, real-time analytics, and campaign management"
    },
    {
      icon: CreditCard,
      title: "Automated Billing",
      description: "Stripe integration with transaction fees and subscription management"
    },
    {
      icon: Users,
      title: "Customer Portal",
      description: "Responsive web portal for points tracking, rewards, and transaction history"
    },
    {
      icon: MapPin,
      title: "Ward-Based Rewards",
      description: "Geo-fenced loyalty programs targeting D.C.'s 8 wards with local business focus"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "AES-256 encryption, RBAC, audit trails, and GDPR/CCPA compliance"
    },
    {
      icon: Smartphone,
      title: "Mobile Wallet Integration",
      description: "Apple Wallet and Google Pay integration for seamless loyalty card access"
    }
  ];

  const stats = [
    { label: "Active Merchants", value: "250+", icon: Store },
    { label: "Customer Transactions", value: "50K+", icon: CreditCard },
    { label: "Points Distributed", value: "2M+", icon: Award },
    { label: "Ward Coverage", value: "All 8", icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Local Card</h1>
                <p className="text-xs text-gray-500">Ward-Based Loyalty Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/business/auth')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                For Businesses
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            🚀 Production-Ready MVP Platform
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Washington D.C.'s First<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ward-Based Loyalty Platform
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect local businesses with their community through automated loyalty programs, 
            real-time analytics, and secure payment processing integrated with Square and Clover.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Start Free Trial
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/business/auth')}
              className="px-8 py-3"
            >
              Business Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Loyalty Platform Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to launch and scale a successful loyalty program, 
              from merchant onboarding to customer engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-600">
              Built with security and compliance at the core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "AES-256 Encryption",
              "GDPR/CCPA Compliant",
              "Audit Trail Logging",
              "Role-Based Access Control"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Launch Your Loyalty Program?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of D.C. businesses already using Local Card to build stronger 
            community connections and increase customer retention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/business/auth')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Start Free 30-Day Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/customer')}
              className="border-white text-white hover:bg-white/10 px-8 py-3"
            >
              View Customer Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white">Local Card</span>
              </div>
              <p className="text-gray-400">
                Connecting D.C. communities through local business loyalty programs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="/business/auth" className="hover:text-white">For Businesses</a></li>
                <li><a href="/customer" className="hover:text-white">Customer Portal</a></li>
                <li><a href="/admin" className="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">API Documentation</a></li>
                <li><a href="#" className="hover:text-white">Developer Portal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Local Card. All rights reserved. Built for Washington D.C. communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
