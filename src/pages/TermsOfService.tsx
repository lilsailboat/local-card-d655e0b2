
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Local Card Platform Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using the Local Card platform ("Service"), you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do 
                  not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                <p className="mb-4">
                  Local Card provides a loyalty platform that connects local businesses in Washington D.C. with 
                  customers through a points-based rewards system. Our services include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Merchant dashboard and analytics</li>
                  <li>Customer loyalty tracking</li>
                  <li>POS system integration</li>
                  <li>Automated billing and payment processing</li>
                  <li>Ward-based targeting and campaigns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. User Accounts and Security</h2>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You agree to notify us immediately of any unauthorized 
                  use of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Merchant Terms</h2>
                <p className="mb-4">
                  Merchants using our platform agree to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide accurate business information</li>
                  <li>Honor loyalty points and rewards as configured</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Pay applicable fees as outlined in the billing terms</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Customer Terms</h2>
                <p className="mb-4">
                  Customers using our platform agree to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide accurate personal information</li>
                  <li>Use loyalty points in accordance with merchant terms</li>
                  <li>Not engage in fraudulent activity</li>
                  <li>Respect the privacy of other users</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Billing and Payment Terms</h2>
                <p className="mb-4">
                  Our billing structure includes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Monthly subscription fee of $40 for merchants</li>
                  <li>Transaction processing fee of 3% per transaction</li>
                  <li>All fees are processed automatically via Stripe</li>
                  <li>Refunds are handled on a case-by-case basis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Data Protection and Privacy</h2>
                <p className="mb-4">
                  We are committed to protecting your privacy and complying with applicable data protection laws, 
                  including GDPR and CCPA. Please review our Privacy Policy for detailed information about how we 
                  collect, use, and protect your data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">
                  Local Card shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
                  losses, resulting from your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
                <p className="mb-4">
                  Either party may terminate this agreement at any time. Upon termination, your access to the service 
                  will be discontinued, and any outstanding fees will remain due.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Local Card Platform</strong></p>
                  <p>Email: legal@localcard.com</p>
                  <p>Address: Washington, D.C.</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
