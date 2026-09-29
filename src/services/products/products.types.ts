export interface Product {
    id: number,

    title: string,
    price: number,
    description: string
};

export type CreateProductInput = Omit<Product, "id">;

export interface ProductServiceContract {
    getProducts: (take?: number) => Product[],
    findProduct: (id: number) => Product | undefined
    createNewProduct: (product: CreateProductInput) => Promise<Product | null>,
};