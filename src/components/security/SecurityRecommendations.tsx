
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface SecurityRecommendationsProps {
  recommendations: string[];
}

const SecurityRecommendations = ({ recommendations }: SecurityRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <span>{recommendation}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityRecommendations;
