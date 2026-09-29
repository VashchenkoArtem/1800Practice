import type { Request, Response } from "express"
import type { ProductResponse } from "../../dto/responses.js";
import type { CreateProductRequest } from "../../dto/requests.js";
import type { ErrorResponse } from "../../dto/errors.js";

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