'use client'; 

import React, { useState, ChangeEvent } from 'react';
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedData = {
      avatarUrl: image,
      phone: editablePhone,
      bio: editableBio,
    };
    console.log('Changes Saved:', updatedData);
    alert('Changes Saved Correctly.');
    setIsEditing(false);
  };

  const handleGoToCart = () => {
    router.push('/cart'); // ✅ Redirige a la página del carrito
  };

  
  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <div className="profile-header">
        <label
          htmlFor="profile-image-input"
          className="profile-image-label"
          title="Change Profile Photo"
          style={{ cursor: isEditing ? 'pointer' : 'default' }}
        >
          <img src={image} className="profile-image"/>
          {isEditing && (
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="profile-image-input"
            />
          )}
        </label>

        <div className="profile-details">
          <div className="profile-name" title={name}>{name}</div>
          <div className="profile-role">{role}</div>
        </div>
      </div>

      <div className="profile-contact-info">
        <div>
          <strong>Email: </strong> {email}
        </div>
        {isEditing ? (
          <input
            type="tel"
            value={editablePhone}
            onChange={(e) => setEditablePhone(e.target.value)}
            className="profile-phone-input"
            placeholder="Teléfono"
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
          placeholder="Biografía"
          rows={4}
        />
      ) : (
        <div className="profile-bio">{editableBio}</div>
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