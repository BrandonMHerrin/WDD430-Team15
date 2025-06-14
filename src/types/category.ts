export interface Category {
    id: number;
    name: string;
    description: string | null;
    // imageUrl?: string;
    children?: Category[]; 
    // isActive: boolean;
    sortOrder: number;
    // createdAt: Date;
    // updatedAt: Date;
}