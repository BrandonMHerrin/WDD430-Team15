
import { User } from '../types/cart';

// Mock user 
export const mockUser: User = {
  id: 'user-123',
  firstName: 'Rakell',
  email: 'rakellbandeira@gmail.com',
  lastSignIn: new Date(),
  cart: {
    id: 'cart-123',
    userId: 123,
    cartItems: [],
    totalPrice: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

/*
 Inserrts mock user data inside localStorage
 
 initializeMockAuth changed to mockUserLocalSto

*/
export const mockUserLocalSto = (): void => {
  if (typeof window !== 'undefined') {
    const loginData = {
      user: mockUser,
      loginTimestamp: Date.now()
    };
    localStorage.setItem('authData', JSON.stringify(loginData));
  }
};

/*
 If user is authenticated in localStorage data and 
 and session hasn't expired (giving 8 days max), it
 returns true 
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const authData = localStorage.getItem('authData');
    if (!authData) return false;
    
    const { loginTimestamp } = JSON.parse(authData);
    const now = Date.now();
    const eightDaysInMs = 8 * 24 * 60 * 60 * 1000; // 8 days
    
    return (now - loginTimestamp) < eightDaysInMs;
  } catch {
    return false;
  }
};

/*
 Gets current user from localStorage
 Returns user object if authenticated, null otherwise
 */
export const getCurrentUser = (): User | null => {
  if (!isAuthenticated()) return null;
  
  try {
    const authData = localStorage.getItem('authData');
    if (!authData) return null;
    
    const { user } = JSON.parse(authData);
    return user;
  } catch {
    return null;
  }
};

/*
 This updates user data in localStorage when cart changes
 to keep user data sync
 */
export const updateUserData = (updatedUser: User): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const authData = localStorage.getItem('authData');
    if (!authData) return;
    
    const currentAuthData = JSON.parse(authData);
    currentAuthData.user = updatedUser;
    
    localStorage.setItem('authData', JSON.stringify(currentAuthData));
  } catch (error) {
    console.error('Failed to update user data:', error);
  }
};