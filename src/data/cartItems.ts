
import { CartItem, Cart } from '../types/cart';

// Mock cart items 
export const mockCartItems: CartItem[] = [
  {
    id: 'cart-item-1',
    productId: 101,
    productName: 'Handwoven Ceramic Vase',
    productImageUrl: '/images/placeholder-product.jpg',
    storeName: 'Maria\'s Pottery Studio',
    price: 89.99,
    quantity: 1
  },
  {
    id: 'cart-item-2',
    productId: 102,
    productName: 'Sterling Silver Necklace',
    productImageUrl: '/images/placeholder-product.jpg',
    storeName: 'Silversmith Jewelry Co.',
    price: 129.50,
    quantity: 2
  },
  {
    id: 'cart-item-3',
    productId: 103,
    productName: 'Organic Cotton Scarf',
    productImageUrl: '/images/placeholder-product.jpg',
    storeName: 'Emma\'s Textile Workshop',
    price: 45.00,
    quantity: 1
  },
  {
    id: 'cart-item-4',
    productId: 104,
    productName: 'Wooden Cutting Board Set',
    productImageUrl: '/images/placeholder-product.jpg',
    storeName: 'Robert\'s Woodcraft',
    price: 67.99,
    quantity: 1
  },
  {
    id: 'cart-item-5',
    productId: 105,
    productName: 'Hand-knitted Wool Sweater',
    productImageUrl: '/images/placeholder-product.jpg',
    storeName: 'Cozy Knits Boutique',
    price: 95.00,
    quantity: 1
  }
];

/*
 Total price for items which type is: array of CartItems  */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/*
 Sum of all quantities */
export const getCartItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

/*
 A mock cart
 */
export const createMockCart = (items: CartItem[] = mockCartItems): Cart => {
  return {
    id: 'cart-123',
    userId: 123,
    cartItems: items,
    totalPrice: calculateCartTotal(items),
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date()
  };
};