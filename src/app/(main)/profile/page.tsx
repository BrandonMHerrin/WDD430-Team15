'use client';

import '../../../components/SellerProfile/seller-profile.css';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SellerProfile from '@/components/SellerProfile/SellerProfile';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/profile/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserData(data.user);
          }
        });
    }
  }, [session]);

  if (status === 'loading') {
    return <p className="text-center mt-10">Loading Profile...</p>;
  }

  if (!session?.user) {
    return <p className="text-center mt-10 text-red-600">You must log in to view your profile.</p>;
  }

  if (!userData) {
    return <p className="text-center mt-10">Loading user data...</p>;
  }

  return (
    <div className="profile-card">
      <SellerProfile
        name={`${userData.firstName} ${userData.lastName}`}
        role="Seller"
        email={userData.email}
        phone={userData.phone || '+1 555 123 4567'}
        bio={userData.bio || 'Type your Store History'}
        avatarUrl={userData.image || 'https://via.placeholder.com/150'}
      />
    </div>
  );
}
