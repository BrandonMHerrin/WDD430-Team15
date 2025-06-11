export interface CartItem {
  id: string;
  productId: number;
  productName: string;
  productImageUrl: string;
  storeName: string;
  price: number; // decimal is number in typescript
  quantity: number;
}


export interface Cart {
  id: string;
  userId: number;
  cartItems: CartItem[];
  totalPrice: number; 
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  lastSignIn: Date;
  cart: Cart;
}