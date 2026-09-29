import type { ProductRepositoryContract } from "../../domain/products/repository.ts";
import type { CreateProductInput, ProductServiceContract } from "./products.types.js";

export function createProductService(productRepository: ProductRepositoryContract): ProductServiceContract {
    function getProducts(take?: number) {
        return productRepository.getAllProducts(take)
    }

    function findProduct(id: number) {
        return productRepository.findProductById(id)
    }

    async function createNewProduct(data: CreateProductInput) {
        let { title, price, description } = data;

        if(productRepository.findProductByTitle(title)) {
            return null;
        }

        let products = await productRepository.getAllProducts();
        let product = {
            id: products.length + 1,
            title: title,
            price: price,
            description: description
        };

        return productRepository.createProduct(product);
    }

    return { getProducts, findProduct, createNewProduct};
}