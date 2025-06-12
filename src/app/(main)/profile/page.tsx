'use client';

import '../../../components/SellerProfile/seller-profile.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import SellerProfile from '@/components/SellerProfile/SellerProfile';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-center mt-10">Loading Profile...</p>;
  }

  if (!session?.user) {
    return <p className="text-center mt-10 text-red-600">You must log in to view your profile.</p>;
  }

  return (
    <div className="profile-card">
      <SellerProfile
        name={session.user.name || 'Usuario sin nombre'}
        role="User"
        email={session.user.email || 'correo@desconocido.com'}
        phone="+1 555 123 4567"
        bio="Thank you for being part of our community. Connect with real sellers."
        avatarUrl={session.user.image || 'https://via.placeholder.com/150'}
      />
    </div>
  );
}