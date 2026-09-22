import { getProducts, findProduct, createNewProduct } from "../services/products.js"

export function getAllProducts(req, res){

    const { take } = req.query
    if (!take) {
        return res.status(200).json(getProducts());
    }
    const takeNum = parseInt(take)

    if(!takeNum || !Number.isInteger(takeNum) || takeNum < 0) {
        res.status(400).json({ok: false, description: "Query parameter 'take' is incorrect!"})
        return
    }
    const products =  getProducts(take)
    return res.status(200).json({result: products})
}

export function getProductById(req, res) {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer',
        });
    }

    const product = findProduct(productId);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found',
        });
    }

    return res.status(200).json(product);
}

export async function createProduct(req, res) {
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
        const createdProduct = await createNewProduct({
            title,
            price,
            description
        });

        if (!createdProduct) {
            return res.status(409).json({
                message: 'Product already exists',
            });
        }

        return res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Failed to create product',
        });
    }
}