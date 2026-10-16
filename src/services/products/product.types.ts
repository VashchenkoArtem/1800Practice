import type { Category } from "../../domain/category/entity";

export interface Product {
    id: number,

    name: string,
    price: number,

    image: string,
    categoryId: number,
    category?: Category
};

export type CreateProductInput = Omit<Product, "id">;

export interface ProductServiceContract {
    getProducts: (take?: number, categoryId?: number) => Promise<Product[]>,
    findProduct: (id: number) => Promise<Product | null>
    createNewProduct: (product: CreateProductInput) => Promise<Product | null>,
};