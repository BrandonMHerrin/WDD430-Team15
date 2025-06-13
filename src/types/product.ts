export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    storeId: number;
}

export interface ProductReview {
    id:number;
    title: string;
    reviewText: string;
    productId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
}