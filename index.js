require('dotenv').config()

const app = require('express')(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8080,
    MessageService = require("./src/services/MessageService"),
    api = require("./src/utils/api"),
    ServiceError = require('./src/utils/ServiceError'),
    catchError = require('./src/utils/catchError')

app.use(bodyParser.json());

app.post('/', catchError(async (req, res, next) => {
    if (req.body?.message?.text?.trim() === '/get') {
        await MessageService.sendCommentsMessages(process.env.CHAT_ID)
    } else {
        throw new ServiceError(404, 'Unknown command')
    }
    res.sendStatus(200)
}))

app.use( async(err, req, res, next) => {
    if (err instanceof ServiceError) {
        await api.sendMessage(process.env.CHAT_ID, err.message)
    } else {
        console.log(err)
        next()
    }
    res.sendStatus(200)
})

app.listen(PORT, () => {
    process.title = 'comments2gis'
    console.log(`Bot listening ${PORT}`)
})

