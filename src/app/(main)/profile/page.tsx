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
      // Cargar datos del usuario
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
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [session]);

  const handleAddImage = async (productId: number, imageUrl: string) => {
    try {
      const res = await fetch('/api/product/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, imageUrl }),
      });
      const data = await res.json();

      if (data.success) {
        setUserData((u: any) => ({
          ...u,
          stores: u.stores.map((store: any) => ({
            ...store,
            products: (store.products || []).map((p: any) =>
              p.id === productId
                ? {
                    ...p,
                    productImages: [...(p.productImages || []), data.image],
                  }
                : p
            ),
          })),
        }));
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Error in handleAddImage:', error);
      alert('Error uploading image');
    }
  };

  const handleAddProduct = async (
    storeId: number,
    name: string,
    description?: string,
    price?: number,
    categoryId?: number,
    imageUrl?: string
  ): Promise<void> => {
    if (price === undefined) {
      alert('Price is required');
      return;
    }
    if (categoryId === undefined) {
      alert('Category is required');
      return;
    }
    if (!imageUrl) {
      alert('Image URL is required');
      return;
    }

    try {
      const res = await fetch('/api/product/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId, name, description, price, categoryId, imageUrl }),
      });
      const data = await res.json();

      if (data.success) {
        setUserData((u: any) => ({
          ...u,
          stores: u.stores.map((store: any) =>
            store.id === storeId
              ? {
                  ...store,
                  products: [...(store.products || []), { ...data.product, productImages: [data.image] }],
                }
              : store
          ),
        }));
      } else {
        alert('Error creando producto');
      }
    } catch (error) {
      console.error('Error en handleAddProduct:', error);
      alert('Error creando producto');
    }
  };

  if (status === 'loading') {
    return <p className="text-center mt-10">Loading Profile...</p>;
  }

  if (!session?.user) {
    return <p className="text-center mt-10 text-red-600">You must log in to view your profile.</p>;
  }

  if (!userData) {
    return <p className="text-center mt-10">Loading user data...</p>;
  }

  // Extraer productos con sus imágenes para pasarlos a SellerProfile
  const userProducts = userData.stores
    ? userData.stores.flatMap((store: any) =>
        (store.products || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          images: (p.productImages || []).map(
            (img: any) => img.imageUrl || img.url || img // Ajusta según cómo es el campo URL en tus imágenes
          ),
        }))
      )
    : [];

  return (
    <div className="profile-card">
      <SellerProfile
        name={`${userData.firstName} ${userData.lastName}`}
        role="Seller"
        email={userData.email}
        phone={userData.phone || '+1 555 123 4567'}
        bio={userData.bio || 'Type your Store History'}
        avatarUrl={userData.image || 'https://via.placeholder.com/150'}
        stores={userData.stores}
        userProducts={userProducts}
        onAddProduct={handleAddProduct}
        // Ya no pasamos categories aquí
      />
    </div>
  );
}
