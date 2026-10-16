import type { CreateProductInput } from "../../services/products/product.types.js";
import type { Product, ProductWithCategory } from "./entity.ts";

export interface ProductRepositoryContract {
    getAllProducts: (take?: number, categoryId?: number) => Promise<ProductWithCategory[]>;
    createProduct: (product: CreateProductInput) => Promise<Product>;
    findProductById: (id: number) => Promise<ProductWithCategory| null>;
    findProductByTitle: (title: string) => Promise<ProductWithCategory | null>;
}