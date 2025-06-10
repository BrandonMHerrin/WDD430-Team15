export interface Category {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    subcategories?: string[]; 
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}