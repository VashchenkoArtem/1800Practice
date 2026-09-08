const express = require("express")

const PORT = 8000
const HOST = "localhost"

const app = express()

app.get('/YaromirTrehub', (req, res) => {
    res.status(200).json({
        name: "Yaromir Trehub",
        age: 14
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})