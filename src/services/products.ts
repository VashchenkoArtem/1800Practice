import { getAllProducts, createProduct, findProductById, findProductByTitle } from "../repositories/products.js"

export function getProducts(take) {
    return getAllProducts(take)
}

export function findProduct(id) {
    return findProductById(id)
}

export function createNewProduct(data) {
    let { title, price, description } = data;

    if(findProductByTitle(title)) {
        return null;
    }

    let products = getAllProducts();
    let product = {
        id: products.length + 1,
        title: title,
        price: price,
        description: description
    };

    return createProduct(product);
}