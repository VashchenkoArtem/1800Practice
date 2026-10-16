import type { ProductRepositoryContract } from "../../domain/products/repository.js";
import type { CreateProductInput, ProductServiceContract } from "./product.types.js";

export function createProductService(productRepository: ProductRepositoryContract): ProductServiceContract {
    return {
        getProducts(take, categoryId) {
            return productRepository.getAllProducts(take, categoryId)
        },
    
        findProduct(id) {
            return productRepository.findProductById(id)
        },
        async createNewProduct(data) {
            let { name, price, image, categoryId } = data;
    
            if(await productRepository.findProductByTitle(name)) {
                return null;
            }
    
            let product = {
                name: name,
                price: price,
    
                image: image,
                categoryId: categoryId
            };
    
            return await productRepository.createProduct(product);
        }
    }
}