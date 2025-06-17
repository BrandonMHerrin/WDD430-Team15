import { Product } from '../types/product';

/**
 Mock effects. Connect to Brandom database later
 */
export const storeMap = {
  1: 'Artisan Craft Store',
  2: 'Handmade Treasures',
  3: 'Local Artisan Market',
  4: 'Creative Workshop',
  5: 'Unique Finds Boutique'
};

/**
 * Gets store name by store ID
 */
export const getStoreNameById = (storeId: number): string => {
  return storeMap[storeId as keyof typeof storeMap] || 'Unknown Store';
};

/**
 * Gets product by ID from products data
 */
export const getProductById = (productId: number, productsData: Product[]): Product | null => {
  return productsData.find(product => product.id === productId) || null;
};

/**
 * Default product image for mock tests
 */
export const getDefaultProductImage = () => ({
  id: 0,
  productId: 0,
  imageUrl: '/images/placeholder-product.jpg',
  sortOrder: 1,
  fileType: 'JPG' as const
});