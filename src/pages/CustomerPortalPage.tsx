
import React from 'react';
import CustomerPortal from '@/components/CustomerPortal';

const CustomerPortalPage = () => {
  // In a real implementation, you'd get the user ID from authentication
  const userId = "demo-user";
  
  const customerData = {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    joinDate: "2023-06-15",
    tier: "gold" as const,
    wardNumber: 1,
    avatar: "/placeholder.svg"
  };

  return <CustomerPortal userId={userId} customerData={customerData} />;
};

export default CustomerPortalPage;
