const express = require("express")

const PORT = 8000
const HOST = "localhost"

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        text: "Hello World!"
    })
})

app.get('/Tymur', (req, res) => {
    res.json({Tymur: "Tymur Sennykov. 15yo."});
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
