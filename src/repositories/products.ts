import type { Product } from "../domain/products/entity.js"
import type { ProductRepositoryContract } from "../domain/products/repository.js"

export function createProductRepository(): ProductRepositoryContract {
    let products = [
        {
            id: 1,
            title: 'mouse',
            price: 123,
            description: 'Good mouse'
        },
        {
            id: 2,
            title:'keyboard',
            price: 1234,
            description: 'Excellent keyboard'
        }
    ]

    function getAllProducts(take?: number){
        if(!take){
            return [
                ...products
            ]
        } 
        return products.slice(0, take)
    }

    async function createProduct(product: Product){
        return new Promise<Product>((resolve, reject) => {
            setTimeout(() => {
                products = [...products, product]
                resolve(product)
            }, 1000 )})
    }
    function findProductById(id: number){
        return products.find((product) => {return product["id"] == id})
    }

    function findProductByTitle(title: string) {
        return products.find((product) => {return product["title"] == title})
    }

    return { getAllProducts, createProduct, findProductById, findProductByTitle};
}