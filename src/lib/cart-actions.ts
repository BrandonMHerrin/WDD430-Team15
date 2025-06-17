import { CartItem, Cart, User } from '../types/cart';
import { Product, ProductImage } from '../types/product';
import { getCurrentUser, updateUserData, isAuthenticated } from './auth';
import { calculateCartTotal } from '../data/cartItems';


/* Creating a cart Item ID. See if there is another schema on Prisma about it */
const generateCartItemId = (): string => {
  return `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/* Creating the cartItem elements, exportable, from product eLEMENTS */
export const createCartItemFromProduct = (
  product: Product, 
  productImage: ProductImage, 
  quantity: number = 1,
  storeName: string = "Store Sample" // or take it off :)
  ): CartItem => {
  return {
    id: generateCartItemId(),
    productId: product.id,
    productName: product.name,
    productImageUrl: productImage.imageUrl,
    storeName: storeName, // Later I can change to store id: product.storeId
    price: product.price,
    quantity: quantity
  };
};


/* Feature "Add to Cart". If product exists, increase by one.
Returns updated quantities */
export const addToCart = (
  product: Product, 
  productImage: ProductImage, 
  quantity: number = 1,
  storeName?: string //Or storeid
): { success: boolean; message: string; cartItems: CartItem[] } => 

{
    // Checking if user is authenticated
  if (!isAuthenticated()) {
    return {
      success: false,
      message: 'Please log in to add items to your cart',
      cartItems: []
    };
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      message: 'User not found',
      cartItems: []
    };
  }


  try {
    let updatedCartItems = [...currentUser.cart.cartItems];
    
    // Check if product already exists in cart
    const existingItemIndex = updatedCartItems.findIndex(
      item => item.productId === product.id
    );

    if (existingItemIndex > -1) {
      // Product exists, update quantity
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: updatedCartItems[existingItemIndex].quantity + quantity
      };
    } else {
      // Product doesn't exist, add new item
      const newCartItem = createCartItemFromProduct(
        product, 
        productImage, 
        quantity, 
        storeName
      );
      updatedCartItems.push(newCartItem);
    }

    // Update user's cart
    const updatedUser: User = {
      ...currentUser,
      cart: {
        ...currentUser.cart,
        cartItems: updatedCartItems,
        totalPrice: calculateCartTotal(updatedCartItems),
        updatedAt: new Date()
      }
    };

    // Save to localStorage
    updateUserData(updatedUser);

    return {
      success: true,
      message: 'Product added to cart successfully',
      cartItems: updatedCartItems
    };

  } catch (error) {
    console.error('Error adding to cart:', error);
    return {
      success: false,
      message: 'Failed to add product to cart',
      cartItems: currentUser.cart.cartItems
    };
  }
};



/**
 * Updates cart item quantity
 */
export const updateCartItemQuantity = (
  itemId: string, 
  newQuantity: number
): { success: boolean; cartItems: CartItem[] } => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, cartItems: [] };
  }

  try {
    let updatedCartItems = currentUser.cart.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    // Remove items with 0 quantity
    updatedCartItems = updatedCartItems.filter(item => item.quantity > 0);

    const updatedUser: User = {
      ...currentUser,
      cart: {
        ...currentUser.cart,
        cartItems: updatedCartItems,
        totalPrice: calculateCartTotal(updatedCartItems),
        updatedAt: new Date()
      }
    };

    updateUserData(updatedUser);

    return {
      success: true,
      cartItems: updatedCartItems
    };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return { success: false, cartItems: currentUser.cart.cartItems };
  }
};

/**
 * Removes an item from cart
 */
export const removeFromCart = (itemId: string): { success: boolean; cartItems: CartItem[] } => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, cartItems: [] };
  }

  try {
    const updatedCartItems = currentUser.cart.cartItems.filter(
      item => item.id !== itemId
    );

    const updatedUser: User = {
      ...currentUser,
      cart: {
        ...currentUser.cart,
        cartItems: updatedCartItems,
        totalPrice: calculateCartTotal(updatedCartItems),
        updatedAt: new Date()
      }
    };

    updateUserData(updatedUser);

    return {
      success: true,
      cartItems: updatedCartItems
    };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, cartItems: currentUser.cart.cartItems };
  }
};

/**
 * Gets current cart items for the logged-in user
 */
export const getCurrentCartItems = (): CartItem[] => {
  const currentUser = getCurrentUser();
  return currentUser?.cart.cartItems || [];
};

/**
 * Gets current cart item count
 */
export const getCurrentCartItemCount = (): number => {
  const cartItems = getCurrentCartItems();
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Clears the entire cart
 */
export const clearCart = (): { success: boolean } => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false };
  }

  try {
    const updatedUser: User = {
      ...currentUser,
      cart: {
        ...currentUser.cart,
        cartItems: [],
        totalPrice: 0,
        updatedAt: new Date()
      }
    };

    updateUserData(updatedUser);

    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { success: false };
  }
};