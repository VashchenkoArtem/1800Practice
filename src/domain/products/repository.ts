import type { Product } from "./entity.ts";

export interface ProductRepositoryContract {
    getAllProducts: (take?: number) => Product[];
    createProduct: (product: Product) => Promise<Product> | null;
    findProductById: (id: number) => Product | undefined;
    findProductByTitle: (title: string) => Product | undefined;
}