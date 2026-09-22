let products = [
    {
        id: 1,
        title: 'mouse',
        price: 123,
        description: 'Good mouse'
    },
    {
        id: 2,
        title:'keyboard',
        price: 1234,
        description: 'Excellent keyboard'
    }
]

export function getAllProducts(take){
    if(!take){
        return [
            ...products
        ]
    } 
    return products.slice(0, take)
}

export function createProduct(product){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            products = [...products, product]
            resolve(product)
        }, 1000 )})
}
export function findProductById(id){
    return products.find((product) => {return product["id"] == id})
}

export function findProductByTitle(title) {
    return products.find((product) => {return product["title"] == title})
}