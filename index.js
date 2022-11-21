require('dotenv').config()

const app = require('express')(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8080,
    commandParser = require("./src/services/CommentParser")

setInterval(async () => await commandParser.getComments(), process.env.UPDATE_COMMENTS_PERIOD * 60 * 1000)

app.listen(PORT, () => {
    process.title = 'comments2gis'
    console.log(`Bot listening ${PORT}`)
})

