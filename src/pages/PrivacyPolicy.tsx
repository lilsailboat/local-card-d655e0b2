
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Local Card Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support.
                </p>
                
                <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Name, email address, phone number</li>
                  <li>Business information (for merchants)</li>
                  <li>Payment and billing information</li>
                  <li>Location data (ZIP code, ward information)</li>
                </ul>

                <h3 className="text-lg font-medium mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Device information and identifiers</li>
                  <li>Log information (IP address, browser type)</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and manage loyalty programs</li>
                  <li>Send you important updates and communications</li>
                  <li>Analyze usage patterns and optimize our platform</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
                <p className="mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>With your consent</li>
                  <li>With service providers who assist our operations</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>In connection with a business transfer</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 for data in transit</li>
                  <li>Regular security audits and assessments</li>
                  <li>Role-based access controls</li>
                  <li>Comprehensive audit logging</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Your Rights and Choices</h2>
                <p className="mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                
                <h3 className="text-lg font-medium mb-3">GDPR Rights (EU Users)</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification (correction)</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>

                <h3 className="text-lg font-medium mb-3">CCPA Rights (California Users)</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of sale of personal information</li>
                  <li>Right to non-discrimination</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Data Retention</h2>
                <p className="mb-4">
                  We retain your personal information for as long as necessary to provide our services 
                  and comply with legal obligations. Specific retention periods include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Account information: Duration of account plus 7 years</li>
                  <li>Transaction data: 7 years for compliance purposes</li>
                  <li>Marketing data: Until you opt-out or request deletion</li>
                  <li>Security logs: 2 years</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Third-Party Services</h2>
                <p className="mb-4">
                  Our platform integrates with third-party services that have their own privacy policies:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Stripe (payment processing)</li>
                  <li>Square and Clover (POS integration)</li>
                  <li>Analytics providers</li>
                  <li>Communication services</li>
                </ul>
                <p className="mb-4">
                  We encourage you to review the privacy policies of these third-party services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Local Card Platform</strong></p>
                  <p>Email: privacy@localcard.com</p>
                  <p>Address: Washington, D.C.</p>
                  <p>Phone: (202) 555-0123</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
