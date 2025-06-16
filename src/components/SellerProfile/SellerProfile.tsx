'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SellerProfileProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
}

const SellerProfile: React.FC<SellerProfileProps> = ({ name, role, email, phone, bio, avatarUrl }) => {
  const router = useRouter();

  const [image, setImage] = useState<string>(avatarUrl);
  const [editablePhone, setEditablePhone] = useState<string>(phone);
  const [editableBio, setEditableBio] = useState<string>(bio);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [imageUrlInput, setImageUrlInput] = useState<string>(avatarUrl);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
  };

  const handleSave = async () => {
    const updatedData = {
      email, // se usa para identificar al usuario en backend
      avatarUrl: imageUrlInput,
      phone: editablePhone,
      bio: editableBio,
    };

    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.success) {
        alert('Changes saved correctly!');
        setImage(imageUrlInput);
        setIsEditing(false);
      } else {
        alert('There was a problem saving the data.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving data');
    }
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <div className="profile-header">
        <label
          htmlFor="profile-image-url"
          className="profile-image-label"
          title="Change Profile Photo"
          style={{ cursor: isEditing ? 'text' : 'default' }}
        >
          <img src={image} alt="Profile" className="profile-image" />
        </label>

        {isEditing && (
          <input
            id="profile-image-url"
            type="text"
            placeholder="Enter image URL"
            value={imageUrlInput}
            onChange={handleImageUrlChange}
            className="profile-image-url-input"
          />
        )}

        <div className="profile-details">
          <div className="profile-name" title={name}>{name}</div>
          <div className="profile-role">{role}</div>
        </div>
      </div>

      <div className="profile-contact-info">
        <div><strong>Email: </strong> {email}</div>
        {isEditing ? (
          <input
            type="tel"
            value={editablePhone}
            onChange={(e) => setEditablePhone(e.target.value)}
            className="profile-phone-input"
            placeholder="Phone"
          />
        ) : (
          <div><strong>Phone: </strong> {editablePhone}</div>
        )}
      </div>

      {isEditing ? (
        <textarea
          className="profile-textarea profile-bio"
          value={editableBio}
          onChange={(e) => setEditableBio(e.target.value)}
          placeholder="Store History"
          rows={4}
        />
      ) : (
        <div><strong>History: </strong> {editableBio}</div>
      )}

      <div className="profile-buttons">
        {!isEditing ? (
          <button className="profile-button" onClick={() => setIsEditing(true)}>
            Change Information
          </button>
        ) : (
          <button className="profile-button" onClick={handleSave}>
            Save
          </button>
        )}
        <button className="profile-contact-button" onClick={handleGoHome}>
          Go to Dashboard
        </button>
        <button className="profile-contact-button" onClick={handleGoToCart}>
          Go to the Cart
        </button>
      </div>
    </>
  );
};

export default SellerProfile;
