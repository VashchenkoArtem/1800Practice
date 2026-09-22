import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
} from '../handlers/products.js';

export const productsRouter = Router()

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post('/', createProduct);