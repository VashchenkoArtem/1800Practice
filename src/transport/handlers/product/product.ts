import type { ProductHandlerContract } from "./product.types.js";
import type { ProductServiceContract } from "../../../services/products/product.types.js";

export function createProductHandler(
    productService: ProductServiceContract
): ProductHandlerContract{
    return {
        async getAllProducts(
            req,
            res
        ){
            const { take, categoryId } = req.query

            const takeNum = Number(take)
            const categoryIdNum = Number(categoryId)
            if(takeNum < 0 || categoryIdNum <= 0) {
                res.status(400).json({
                    message: "Query parameters is incorrect!"
                })
                return
            }
            const products = await productService.getProducts(takeNum, categoryIdNum)
            res.status(200).json(products)
        },
    
        async getProductById(
            req, 
            res
        ) {
            const productId = Number(req.params.id);
    
            if (!Number.isInteger(productId) || productId <= 0) {
                return res.status(400).json({
                    message: 'id must be a positive integer',
                });
            }
    
            const product = await productService.findProduct(productId);
    
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
    
            res.status(200).json(product);
        },
    
        async createProduct(
            req, 
            res) {
            const { name, price, image, categoryId } = req.body;
    
            if (
                typeof name !== 'string' || !name.trim() ||
                typeof price !== 'number' || price <= 0 ||
                typeof image !== 'string' || !image.trim() ||
                typeof categoryId !== "number" || categoryId <= 0
            ) {
                return res.status(422).json({
                    message: 'Invalid product data',
                });
            }
    
            try {
                const createdProduct = await productService.createNewProduct({
                    name,
                    price,
                    image,
                    categoryId
                });
    
                if (!createdProduct) {
                    return res.status(409).json({
                        message: 'Product already exists',
                    });
                }
    
                res.status(201).json(createdProduct);
            } catch (error) {
                console.error(error);
    
                res.status(500).json({
                    message: 'Failed to create product',
                });
            }
        }
    }
}
