
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Download } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 8, 2024</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              HIPAA-Compliant Data Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium">
                Important: Local Card does NOT collect, store, or process any Protected Health Information (PHI) 
                as defined by HIPAA. We do not collect medical records, health conditions, prescription data, 
                or any health-related information.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>First name and verified email address</li>
                  <li>Encrypted password (using Argon2id hashing)</li>
                  <li>ZIP code for business discovery</li>
                  <li>Optional demographic preferences (age bracket, interests)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Financial Information (Tokenized Only)</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Card token reference from Plaid (never raw card numbers)</li>
                  <li>Last 4 digits of linked cards for identification</li>
                  <li>Bank name and card type metadata</li>
                  <li>Transaction amounts and merchant categories (anonymized)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>App usage patterns and feature interactions</li>
                  <li>Device information and browser type</li>
                  <li>Location data (ZIP code level only)</li>
                  <li>Session duration and frequency</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                2. How We Protect Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Encryption & Security</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>AES-256 encryption for all data at rest</li>
                  <li>TLS 1.3 encryption for all data in transit</li>
                  <li>Zero-trust security architecture with role-based access</li>
                  <li>Regular security audits and penetration testing</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Access Controls</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Least privilege access principles</li>
                  <li>Multi-factor authentication for all staff accounts</li>
                  <li>Complete audit logging of all data access</li>
                  <li>Regular access reviews and permission updates</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Third-Party Service Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Card Linking (Plaid)</h3>
                  <p className="text-gray-700">
                    We partner with Plaid for secure bank account and card linking. Plaid maintains SOC 2 Type II 
                    certification and handles all sensitive financial data. We receive only tokenized references 
                    and metadata, never raw account numbers or credentials.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Analytics & Performance</h3>
                  <p className="text-gray-700">
                    We use privacy-focused analytics tools to understand app performance and user experience. 
                    All data is aggregated and anonymized, with no personally identifiable information shared 
                    with analytics providers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Your Rights and Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Data Access & Portability</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Request a copy of all your data in machine-readable format</li>
                  <li>Review what information we have about you</li>
                  <li>Correct any inaccurate information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Account Deletion</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Request permanent deletion of your account and all associated data</li>
                  <li>Secure data purging within 30 days of request</li>
                  <li>Confirmation of deletion provided via email</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Communication Preferences</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Opt out of marketing communications at any time</li>
                  <li>Control notification preferences and frequency</li>
                  <li>Manage consent for different types of communications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Active Accounts</h3>
                  <p className="text-gray-700">
                    Data for active accounts is retained for as long as your account is active and for up to 
                    7 years after account closure for business and legal compliance purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Inactive Accounts</h3>
                  <p className="text-gray-700">
                    Accounts inactive for more than 3 years will be automatically scheduled for deletion, 
                    with 90 days notice provided via email before permanent deletion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Compliance & Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">HIPAA Alignment</h3>
                  <p className="text-gray-700">
                    While Local Card is not a covered entity under HIPAA, our data practices align with 
                    HIPAA principles to ensure the highest standards of privacy protection for potential 
                    future partnerships with healthcare and wellness providers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">State Privacy Laws</h3>
                  <p className="text-gray-700">
                    We comply with applicable state privacy laws including CCPA (California), GDPR (for EU users), 
                    and other regional privacy regulations. Users have the right to know, delete, and opt-out 
                    under these laws.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                7. Contact & Data Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  For privacy questions, data requests, or to exercise your rights under this policy, 
                  contact our Data Protection Team:
                </p>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p><strong>Email:</strong> privacy@localcard.co</p>
                  <p><strong>Response Time:</strong> Within 5 business days</p>
                  <p><strong>Data Requests:</strong> Processed within 30 days</p>
                </div>

                <p className="text-sm text-gray-600">
                  This Privacy Policy may be updated periodically. We will notify users of material changes 
                  via email and app notification at least 30 days before changes take effect.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
