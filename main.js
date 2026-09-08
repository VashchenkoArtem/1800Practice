import express from "express"

const PORT = 8000
const HOST = "localhost"

const app = express()

app.get('/Valentin', (req, res) => {
    res.status(200).json({
        text: "Мене звуть Валентин, мені 13 років.Я живу в Україні.Зараз сижу,делаю енд поинт.Люблю грати в игри и иногда кодить самому, ну ето наверно понятно!"
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/Valentin`)
})