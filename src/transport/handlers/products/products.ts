import type { ProductResponse } from "../../dto/responses.js";
import type { CreateProductRequest } from "../../dto/requests.js";
import type { ErrorResponse } from "../../dto/errors.js";
import type { Request, Response } from "express";
import type { ProductHandlerContract } from "./products.types.js";
import type { ProductServiceContract } from "../../../services/products/products.types.js";

export function createProductHandler(productService: ProductServiceContract): ProductHandlerContract{
    function getAllProducts(
        req: Request,
        res: Response<ProductResponse[] | ErrorResponse>
    ){
        const { take } = req.query
        if (!take) {
            return res.status(200).json(productService.getProducts());
        }
        const takeNum = Number(take)

        if(!takeNum || !Number.isInteger(takeNum) || takeNum < 0) {
            res.status(400).json({
                message: "Query parameter 'take' is incorrect!"
            })
            return
        }
        const products =  productService.getProducts(takeNum)
        res.status(200).json(products)
    }

    function getProductById(
        req: Request, 
        res: Response<ProductResponse | ErrorResponse>
    ) {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                message: 'id must be a positive integer',
            });
        }

        const product = productService.findProduct(productId);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.status(200).json(product);
    }

    async function createProduct(
        req: Request<{}, {}, CreateProductRequest>, 
        res: Response<ProductResponse | ErrorResponse>) {
        const { title, price, description } = req.body;

        if (
            typeof title !== 'string' || !title.trim() ||
            typeof price !== 'number' || price <= 0 ||
            typeof description !== 'string' || !description.trim()
        ) {
            return res.status(422).json({
                message: 'Invalid product data',
            });
        }

        try {
            const createdProduct = await productService.createNewProduct({
                title,
                price,
                description
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
    return { getAllProducts, getProductById, createProduct }
}
