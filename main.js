const express = require("express")

const PORT = 8000
const HOST = "localhost"
const ENDPOINT = "/Ksyusha"

const app = express()

app.get(`${ENDPOINT}`, (req, res) => {
    res.status(200).json({
        text: "Boboshko Ksyusha",
        age: 15
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/${ENDPOINT}`)
})