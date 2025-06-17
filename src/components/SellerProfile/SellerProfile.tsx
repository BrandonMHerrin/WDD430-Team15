'use client';
import '@/components/SellerProfile/seller-profile.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductType {
  id: number;
  name: string;
  images: { imageUrl: string }[];
  description?: string;
  price?: number;
  categoryId?: number;
}

interface SellerProfileProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
  stores: Array<{ id: number; name: string }>;
  userProducts: ProductType[];
  onAddProduct: (
    storeId: number,
    name: string,
    description?: string,
    price?: number,
    categoryId?: number,
    imageUrl?: string
  ) => Promise<void>;
}

const SellerProfile: React.FC<SellerProfileProps> = ({
  name,
  role,
  email,
  phone,
  bio,
  avatarUrl,
  stores,
  userProducts,
  onAddProduct,
}) => {
  const router = useRouter();

  const [image, setImage] = useState<string>(avatarUrl);
  const [editablePhone, setEditablePhone] = useState<string>(phone);
  const [editableBio, setEditableBio] = useState<string>(bio);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [imageUrlInput, setImageUrlInput] = useState<string>(avatarUrl);

  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(
    stores.length > 0 ? stores[0].id : null
  );

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/category/list')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) setSelectedCategoryId(data[0].id);
        } else if (data.success && data.categories) {
          setCategories(data.categories);
          if (data.categories.length > 0) setSelectedCategoryId(data.categories[0].id);
        }
      })
      .catch((error) => {
        console.error('Error loading categories:', error);
      });
  }, []);

  const handleAddProduct = () => {
    if (!selectedStoreId || !newProductName.trim() || newProductPrice.trim() === '') {
      alert('Please fill all required fields');
      return;
    }
    if (!selectedCategoryId) {
      alert('Please select a category');
      return;
    }

    const parsedPrice = parseFloat(newProductPrice);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert('Please enter a valid positive number for price');
      return;
    }

    onAddProduct(
      selectedStoreId,
      newProductName.trim(),
      newProductDescription.trim(),
      parsedPrice,
      selectedCategoryId,
      newProductImageUrl.trim()
    );

    setNewProductName('');
    setNewProductDescription('');
    setNewProductPrice('');
    setNewProductImageUrl('');
  };

  const handleSave = async () => {
    const updatedData = {
      email,
      avatarUrl: imageUrlInput,
      phone: editablePhone,
      bio: editableBio,
    };

    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handleGoToCart = () => router.push('/cart');
  const handleGoHome = () => router.push('/');

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
            onChange={(e) => setImageUrlInput(e.target.value)}
            className="profile-image-url-input"
          />
        )}

        <div className="profile-details">
          <div className="profile-name" title={name}>
            {name}
          </div>
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
            placeholder="Phone"
          />
        ) : (
          <div>
            <strong>Phone: </strong> {editablePhone}
          </div>
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
        <div>
          <strong>History: </strong> {editableBio}
        </div>
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

      {/* --- Agregar Producto --- */}
      <div className="add-product-section">
        <h3>Add New Product</h3>
        <select
          value={selectedStoreId ?? ''}
          onChange={(e) => setSelectedStoreId(Number(e.target.value))}
        >
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Product's Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />

        <select
          value={selectedCategoryId ?? ''}
          onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          style={{ marginLeft: '0.5rem' }}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={newProductImageUrl}
          onChange={(e) => setNewProductImageUrl(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <button onClick={handleAddProduct} style={{ marginLeft: '0.5rem' }}>
          Add Product
        </button>
      </div>

      {/* --- Lista de Productos --- */}
      <div className="products-section">
        <h2>Your Products</h2>
        {userProducts.length === 0 && <p>No products added yet.</p>}
        {userProducts.map((prod) => (
          <div key={prod.id} className="product-card">
            <strong>{prod.name}</strong>

            {prod.images.length > 0 && (
              <img
                src={
                  typeof prod.images[0] === 'string'
                    ? prod.images[0]
                    : prod.images[0]?.imageUrl || ''
                }
                alt={prod.name}
                style={{ maxWidth: '300px', marginTop: '0.5rem' }}
              />
            )}

            {prod.description && (
              <p>
                <strong>Description:</strong> {prod.description}
              </p>
            )}

            {typeof prod.price === 'number' && (
              <p>
                <strong>Price:</strong> ${prod.price}
              </p>
            )}

            {prod.categoryId && (
              <p>
                <strong>Category ID:</strong> {prod.categoryId}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SellerProfile;
