import type { Request, Response } from "express"
import type { ErrorResponse } from "../../dto/errors.js";
import type { ProductResponse } from "../../dto/product/responses.js";
import type { CreateProductRequest } from "../../dto/product/requests.js";

export interface ProductHandlerContract{
    getAllProducts: (
        req: Request, 
        res: Response<ProductResponse[] | ErrorResponse>
    ) => void;
    getProductById: (
        req: Request,
        res: Response<ProductResponse | ErrorResponse>
    ) => void;
    createProduct: (
        req: Request<{}, {}, CreateProductRequest>,
        res: Response<ProductResponse | ErrorResponse>
    ) => void
}