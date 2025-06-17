export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  sortOrder: number;
  fileType: string;
}

export interface ProductReview {
  id: number;
  title: string;
  reviewText: string;
  rating: number;
  productId: number;
  userId: number;
  createdAt: Date;
}