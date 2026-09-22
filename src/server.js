import express from "express"

const PORT = 8000
const HOST = "localhost"

const app = express()

app.use(express.json())

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})

