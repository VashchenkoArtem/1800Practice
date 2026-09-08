const express = require("express")

const PORT = 8000
const HOST = "localhost"

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        text: "Hello World!"
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})


app.get('/api', (req, res) => {
    res.status(200).json({
        name: "Maksym"
    })
})
