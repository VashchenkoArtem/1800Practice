import type { Category } from "../category/entity";

export interface Product {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    image: string;
}

export type ProductWithCategory = Product & {category: Category}