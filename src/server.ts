import express from "express"
import { productsRouter } from "./transport/routers/products.js"

const PORT = 8000
const HOST = "localhost"

const app = express()

app.use(express.json())
app.use("/products", productsRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

// DTO (Data Transfer Object)