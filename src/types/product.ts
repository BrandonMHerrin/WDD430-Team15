// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  store?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  primaryImage?: {
    id: number;
    productId: number;
    imageUrl: string;
    sortOrder: number;
    fileType: string;
  } | null;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  sortOrder: number;
  fileType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductReview {
  id: number;
  title: string;
  reviewText: string;
  rating: number;
  productId: number;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}