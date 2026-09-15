const express = require("express")

const PORT = 8000
const HOST = "localhost"

const app = express()

app.use(express.json())

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

async function addProduct(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            products = [...products, product]
            resolve(product)
        }, 1000 /* типа БД */)
    })
}

app.get('/products', (req, res) => {
    const { take } = req.query

    const takeNum = parseInt(take)
    if(!(takeNum || Number.isInteger(takeNum) || takeNum > 0)) {
        res.status(401).json({ok: false, description: "Query parameter 'take' is incorrect!"})
        return
    }

    const filteredProducts = products.slice(0, take)
    res.status(200).json({
        products: filteredProducts
    })
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params

    const idNum = parseInt(id)
    if(!(idNum || Number.isInteger(idNum) || idNum >= 1 || idNum < products.length-1)) {
        res.status(401).json({ok: false, description: "Route parameter id is incorrect."})
    }

    const foundProduct = products.find((product) => {return product["id"] == idNum})

    res.status(200).json({result: foundProduct})
})

app.post('/products', async (req, res) => {
    const { title, price, description } = req.body;
    console.log(req.body)
    if((typeof title != "string" || title.trim().length == 0) || (!Number.isInteger(price) || price <= 0) || !description) {
        res.status(422).json({ok: false, description: "Semantic error."})
        return
    }

    const newProduct = {
        id: products.length + 1,
        title: title,
        price: price,
        description: description
    }
    try{
        const createdProduct = await addProduct(newProduct)

        res.status(201).json({ok: true, product: createdProduct})
    } catch (error) {
        res.status(500).json({ok: false, description: "Internal server error."})
    }
    
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})