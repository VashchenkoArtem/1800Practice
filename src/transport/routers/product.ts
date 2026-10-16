import { Router } from 'express';
import type { ProductHandlerContract } from '../handlers/product/product.types.js';

export function createProductRouter(productHandler: ProductHandlerContract){
    const productsRouter = Router()
    
    productsRouter.get('/', productHandler.getAllProducts);
    productsRouter.get('/:id', productHandler.getProductById);
    productsRouter.post('/', productHandler.createProduct);

    return productsRouter
}