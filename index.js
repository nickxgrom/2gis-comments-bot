require('dotenv').config()

const app = require('express')(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8080,
    commandParser = require("./src/services/CommentParser"),
    api = require("./src/utils/api");

app.use(bodyParser.json());

setInterval(async () => {
    const comments = await commandParser.getComments()

    let message = ''
    for (let comment of comments) {
        message += `*${comment.comment.replaceAll('*', '\*')}*\n\n`
        message += `[Link to map place](${comment.location})\n`
        message += `*likes: ${comment.feedback.likes}*, dislikes: ${comment.feedback.dislikes}\n`
        message += `*${comment.user}* at ${comment.timestamp.toLocaleTimeString()}`

        await api.sendMessage(process.env.CHAT_ID, message)
        message = ''
    }
}, process.env.UPDATE_COMMENTS_PERIOD * 60 * 1000)

app.listen(PORT, () => {
    process.title = 'comments2gis'
    console.log(`Bot listening ${PORT}`)
})

