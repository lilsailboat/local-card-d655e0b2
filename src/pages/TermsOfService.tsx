
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, CreditCard, Users } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 8, 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                By accessing or using Local Card ("Service"), you agree to be bound by these Terms of Service 
                ("Terms"). If you disagree with any part of these terms, you may not access the Service. 
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Local Card is a coalition loyalty program that allows users to link their debit or credit cards 
                and automatically earn points when shopping at participating local businesses. The Service includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Secure card linking and transaction monitoring</li>
                <li>Automatic points earning and redemption system</li>
                <li>Business discovery and mapping features</li>
                <li>Referral program and rewards tracking</li>
                <li>User dashboard and account management tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                3. User Accounts and Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Must be 18 years or older to create an account</li>
                  <li>Must provide accurate and complete registration information</li>
                  <li>Must maintain the security of your account credentials</li>
                  <li>Must have a valid US bank account or debit/credit card</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Account Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>You are responsible for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized account access</li>
                  <li>Keep your contact information current and accurate</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                4. Points System and Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Points Earning</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Points are earned automatically when shopping at participating businesses</li>
                  <li>Standard rate is 1-3% of purchase amount, varying by business</li>
                  <li>Special promotions may offer bonus point multipliers</li>
                  <li>Points are typically credited within 1-3 business days of transaction</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Points Redemption</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Points can be redeemed at any participating Local Card business</li>
                  <li>Minimum redemption amounts may apply</li>
                  <li>Redeemed points are deducted immediately from your account</li>
                  <li>Points have no cash value and cannot be transferred between accounts</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Points Expiration</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Points expire 24 months from the date earned</li>
                  <li>Account activity resets the expiration timer for all points</li>
                  <li>Email notifications sent 60 and 30 days before expiration</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Business Partnership Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Business Fees</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Monthly service fee of $49 per business location</li>
                  <li>Transaction fee of 3% on Local Card member purchases</li>
                  <li>Fees are billed monthly and due within 30 days</li>
                  <li>Late payment may result in service suspension</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Business Obligations</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Honor all points earned by Local Card members</li>
                  <li>Maintain accurate business information and hours</li>
                  <li>Comply with promotional campaign terms</li>
                  <li>Provide reasonable customer service for Local Card issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Referral Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Referral Rewards</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Earn 500 points for each successful referral</li>
                  <li>Referred user must link a card and make their first purchase</li>
                  <li>Referred user receives welcome bonus points</li>
                  <li>No limit on number of referrals per user</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Referral Rules</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Cannot refer yourself or create duplicate accounts</li>
                  <li>Fraudulent referrals result in account suspension</li>
                  <li>Referral codes are non-transferable</li>
                  <li>Local Card reserves right to modify referral terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">You may not use the Service:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>For any unlawful purpose or to solicit unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other malicious computer code</li>
                  <li>To collect or track personal information of others</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                your information when you use our Service. By using our Service, you agree to the collection 
                and use of information in accordance with our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Service Modifications and Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Changes</h3>
                <p className="text-gray-700">
                  We reserve the right to modify or discontinue the Service at any time with reasonable notice. 
                  We will not be liable if the Service becomes unavailable due to maintenance, updates, or 
                  other technical issues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Account Termination</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>You may terminate your account at any time through account settings</li>
                  <li>We may terminate accounts for violation of these Terms</li>
                  <li>Upon termination, your right to use the Service ceases immediately</li>
                  <li>Unused points will be forfeited upon account termination</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2" />
                10. Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  In no case shall Local Card, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, punitive, consequential, or special 
                  damages arising out of or in connection with your use of the Service.
                </p>
                
                <p className="text-gray-700">
                  Our total liability for any claims arising from these Terms or the Service shall not exceed 
                  the amount paid by you to Local Card in the 12 months preceding the claim.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Binding Arbitration</h3>
                  <p className="text-gray-700">
                    Any dispute arising from these Terms shall be resolved through binding arbitration 
                    rather than in court, except you may assert claims in small claims court if they qualify.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Governing Law</h3>
                  <p className="text-gray-700">
                    These Terms shall be interpreted and governed by the laws of Delaware, without regard 
                    to its conflict of law provisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Questions about the Terms of Service should be sent to us at:
                </p>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p><strong>Email:</strong> legal@localcard.co</p>
                  <p><strong>Mail:</strong> Local Card Legal Department<br />
                  [Company Address]<br />
                  [City, State ZIP]</p>
                </div>

                <p className="text-sm text-gray-600">
                  These Terms of Service are effective as of the last updated date above. We reserve the right 
                  to update or change our Terms of Service at any time with 30 days notice to users.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
