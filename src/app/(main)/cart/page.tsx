// src/app/cart/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Toolbar from "@/components/toolbar";
import CartItem from "@/components/CartItem";
import { isAuthenticated } from '@/lib/auth';
import {
  getCurrentCartItems,
  getCurrentCartItemCount,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
} from "@/lib/cart-actions";
import { calculateCartTotal } from "@/data/cartItems";
// import { categoriesData } from "../../../data/categories";
import { CartItem as CartItemType } from "@/types/cart";
import {
  mockUserLocalSto,
  getCurrentUser,
  updateUserData,
} from "@/lib/auth";
import { ShoppingCart, CheckCircle, X } from "lucide-react";



export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // const categories = categoriesData.filter((category) => category.isActive);
  const cartTotal = calculateCartTotal(cartItems);
  const itemCount =  getCurrentCartItemCount();

  /**
   * Initialize component - sets up mock auth and loads cart items
   */
  useEffect(() => {
    // Initialize mock authentication
    mockUserLocalSto();

    // Load cart items from mock data
    //setCartItems(mockCartItems);
    //setIsLoading(false);
    loadCartItems(); //from user data now
  }, []);


   const loadCartItems = () => {
    setIsLoading(true);
    
    if (isAuthenticated()) {
      const userCartItems = getCurrentCartItems();
      setCartItems(userCartItems);
    } else {
      setCartItems([]);
    }
    
    setIsLoading(false);
  };



  /**
   * Handles category selection from toolbar
   */
  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected category:", categoryId);
    // TODO: Navigate to category page
  };

  /**
   * Updates item quantity 
   */
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const result = updateCartItemQuantity(itemId, newQuantity);

      if (result.success) {
        setCartItems(result.cartItems);
      } else {
        console.error('Failed to update car quantity')
      }
  };

  
  /**
   * Removes item
   */
  const handleRemoveItem = (itemId: string) => {
   const result = removeFromCart(itemId);

   if (result.success) {
    setCartItems(result.cartItems);
   } else {
    console.error('Failed to remove cart tiem');
   }
  };


  /**
   * Handles purchase completion
   * Shows success msg and clears cart
   */
  const handlePurchase = async () => {
    if (!isAuthenticated()) {
      router.push ('/login');
      return;
    } 
    
    setIsProcessingCheckout(true);

     try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart 
      const result = clearCart();
      
      if (result.success) {
        setCartItems([]);
        setShowSuccessModal(true);
      } else {
        console.error('Failed to clear cart after purchase');
        
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

    // Update user data to empty cart
    /* const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.cart.cartItems = [];
      currentUser.cart.totalPrice = 0;
      currentUser.cart.updatedAt = new Date();
      updateUserData(currentUser);
    } */


  /**
   * Closes success msg and returns to homepage
   */
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  /**
   * Navigates back to continue shopping
   */
  const handleContinueShopping = () => {
    router.push("/");
  };

   const refreshCart = () => {
    loadCartItems();
  };

  if (isLoading) {
    return (
      <div className="page-layout">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }


  // Show login prompt if not authenticated
  if (!isAuthenticated()) {
    return (
      <div className="page-layout">
        <div className="cart-page">
          <div className="empty-cart">
            <ShoppingCart size={80} color="var(--artisan-beige)" />
            <h2>Please log in to view your cart</h2>
            <p>Sign in to see your saved items and continue shopping</p>
            <button
              className="continue-shopping-btn"
              onClick={() => router.push('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }



  // Empty cart state
  if (cartItems.length === 0 && !showSuccessModal) {
    return (
      <div className="page-layout">
        {/* <Navbar 
          cartItemCount={0}
          isLoggedIn={true}
          userName="John"
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
        <Toolbar 
          categories={categories}
          onCategorySelect={handleCategorySelect}
          isMobile={false}
        /> */}

        <div className="cart-page">
          <div className="empty-cart">
            <ShoppingCart size={80} color="var(--artisan-beige)" />
            <h2>Your cart is empty</h2>
            <p>Shop today's deals and discover handmade treasures</p>
            <button
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      {/* <Navbar 
        cartItemCount={itemCount}
        isLoggedIn={true}
        userName="John"
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      <Toolbar 
        categories={categories}
        onCategorySelect={handleCategorySelect}
        isMobile={false}
      /> */}

      <div className="cart-page">
        <div className="cart-container">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <div className="cart-header">
              <h1>Shopping Cart</h1>
              <div className="cart-header-actions">
                <span className="item-count">{itemCount} items</span>
                <button 
                  className="refresh-btn"
                  onClick={refreshCart}
                  title="Refresh cart"
                >
                  ↻
                </button>
              </div>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-section">
            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Items ({itemCount}):</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>

              <div className="summary-row total">
                <strong>Order total:</strong>
                <strong className="total-price">${cartTotal.toFixed(2)}</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={handlePurchase}
                disabled={cartItems.length === 0 || isProcessingCheckout}
              >
                {isProcessingCheckout ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <div className="shipping-note">
                <p>🚚 FREE shipping on orders over $25</p>
                <p>📦 Estimated delivery: 5-7 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <button className="close-btn" onClick={handleCloseSuccessModal}>
              <X size={24} />
            </button>

            <div className="success-content">
              <CheckCircle size={80} color="var(--artisan-olive)" />
              <h2>Order Placed Successfully! 🎉</h2>
              <p>
                Thank you for your purchase! Your handmade items are being
                prepared for shipment.
              </p>
              

              <button
                className="continue-btn"
                onClick={handleCloseSuccessModal}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>
        {`
        .cart-page {
          min-height: 100vh;
          background: #f3f3f3;
          padding: 1rem;
        }

        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }

        .cart-items-section {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .cart-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
        }

        .cart-header h1 {
          font-size: 1.8rem;
          font-weight: normal;
          color: var(--text-primary);
          margin: 0;
        }

        .cart-header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .item-count {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .refresh-btn {
          background: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.5rem;
          cursor: pointer;
          font-size: 1.2rem;
          color: #666;
          transition: all 0.2s;
        }

        .refresh-btn:hover {
          background: #f5f5f5;
          border-color: #bbb;
        }

        .cart-items-list {
          background: white;
        }

        .order-summary-section {
          height: fit-content;
          position: sticky;
          top: 1rem;
        }

        .order-summary {
          background: white;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .order-summary h3 {
          font-size: 1.2rem;
          margin: 0 0 1rem 0;
          color: var(--text-primary);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }

        .summary-row.total {
          border-top: 2px solid var(--border-light);
          border-bottom: none;
          padding-top: 1rem;
          margin-top: 0.5rem;
          font-size: 1.1rem;
        }

        .total-price {
          color: var(--artisan-terracotta);
          font-size: 1.2rem;
        }

        .checkout-btn {
          width: 100%;
          background: #ff9900;
          color: black;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin: 1.5rem 0;
          transition: background-color 0.3s;
        }

        .checkout-btn:hover:not(:disabled) {
          background: #e88900;
        }

        .checkout-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .shipping-note {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .shipping-note p {
          margin: 0.25rem 0;
        }

        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          min-height: 60vh;
          background: white;
          border-radius: 8px;
          margin: 2rem auto;
          max-width: 500px;
        }

        .empty-cart h2 {
          color: var(--text-primary);
          font-size: 1.8rem;
          margin: 1rem 0;
          font-weight: normal;
        }

        .empty-cart p {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .continue-shopping-btn {
          background: #ff9900;
          color: black;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .continue-shopping-btn:hover {
          background: #e88900;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          gap: 1rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--artisan-beige);
          border-top: 4px solid var(--artisan-terracotta);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .success-modal {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          position: relative;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .close-btn:hover {
          background: var(--artisan-beige);
        }

        .success-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .success-content h2 {
          color: var(--artisan-terracotta);
          font-size: 1.8rem;
          margin: 0;
        }

        .success-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .continue-btn {
          background: var(--artisan-terracotta);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.3s;
        }

        .continue-btn:hover {
          background: #8b332c;
        }

        @media (max-width: 768px) {
          .cart-page {
            padding: 0.5rem;
          }

          .cart-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .cart-header {
            padding: 1rem;
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .cart-header h1 {
            font-size: 1.5rem;
          }

          .order-summary-section {
            position: static;
            order: -1;
          }

          .order-summary {
            padding: 1rem;
          }

          .success-modal {
            margin: 1rem;
            padding: 1.5rem;
          }

          .success-content h2 {
            font-size: 1.5rem;
          }
        }
      `}
      </style>
    </div>
  );
}
