'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus  } from 'lucide-react';
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
  const handleIncrease = () => {
    if (item.quantity < 20) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };
    const handleDecrease = () => {
    if (item.quantity > 1) { 
      onUpdateQuantity(item.id, item.quantity - 1);
    }
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
            <span className="quantity-label">Qty:</span>
            <div className="quantity-controls">
              <button 
                className="quantity-btn decrease"
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                title="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              
              <span className="quantity-display">{item.quantity}</span>
              
              <button 
                className="quantity-btn increase"
                onClick={handleIncrease}
                disabled={item.quantity >= 10}
                title="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
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