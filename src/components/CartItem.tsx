'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types/cart'; //Renamed a variable

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

/*
 CartItem Component
 Shows product image, details, quantity selector, and remove option
 */
const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const totalPrice = item.price * item.quantity;

  /*
   Dropdown selection for quantity change 
   */
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    onUpdateQuantity(item.id, newQuantity);
  };

  /**
   * Handles item removal from cart
   */
  const handleRemove = () => {
    onRemoveItem(item.id);
  };

  return (
    <div className="cart-item">
      
      <div className="item-image">
        <Image
          src={item.productImageUrl}
          alt={item.productName}
          width={180}
          height={180}
          style={{
            objectFit: 'cover',
            borderRadius: '8px'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-product.jpg';
          }}
        />
      </div>

      
      <div className="item-details">
        <h3 className="product-name">{item.productName}</h3>
        <p className="store-name">by {item.storeName}</p>
        <p className="availability">In Stock</p>
        
        
        <div className="item-actions">
          <div className="quantity-section">
            <label htmlFor={`qty-${item.id}`} className="quantity-label">
              Qty:
            </label>
            <select
              id={`qty-${item.id}`}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="quantity-select"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="remove-btn"
            onClick={handleRemove}
            title="Remove from cart"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      
      <div className="item-pricing">
        <div className="unit-price">
          <span className="price">${item.price.toFixed(2)}</span>
        </div>
        {item.quantity > 1 && (
          <div className="total-price">
            <span className="total-label">Total: </span>
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default CartItem;