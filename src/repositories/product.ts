import type { Product, ProductWithCategory } from "../domain/products/entity.js"
import type { ProductRepositoryContract } from "../domain/products/repository.js"
import type { CreateProductInput } from "../services/products/product.types.js";
import { isStructuredError } from "@prisma/orm-postgres/utils";

type Database = typeof import("../prisma/db.js").db;

export function createProductRepository(db: Database): ProductRepositoryContract {
    return {
        async getAllProducts(take, categoryId){
            const query = db.orm.public.Product.orderBy((product) => {
                return product.id.asc();
            })
            .include("category")
            .where({ categoryId });
    
            if(!take){
                return query.all();
            }
    
            return query.limit(take).all();
        },
    
        async createProduct(product) {
            try {
                const { categoryId, ...fields} = product
                return db.orm.public.Product.create({
                    ...fields, category: (category) =>
                        category.connect({id:categoryId})
                });
            } catch (error) {
                if (error instanceof Error && "sqlState" in error) {
                    if (error.sqlState === "23505") {
                        throw new Error("PRODUCT ALREADY EXIST");
                    }
    
                    if (isStructuredError(error) && error.code === "ORM.RELATION_ROW_MISSING") {
                        throw new Error("CATEGORY NOT FOUND");
                    }
                }
                throw error
            }
            
        },
    
        async findProductById(id){
            return db.orm.public.Product
                .where({ id })
                .include("category")
                .first();
        },
    
        async findProductByTitle(name) {
            return db.orm.public.Product
                .where({ name })
                .include("category")
                .first();
        }
    }
}