const CommentParser = require("./CommentParser");
const api = require("../utils/api");

const createCommentMessage = (comment) => {
    let message = ''
    message += `*${comment.comment.replaceAll('*', '%')}*\n\n`
    message += `[Link to map place](${comment.location})\n`
    message += `*likes: ${comment.feedback.likes}*, dislikes: ${comment.feedback.dislikes}\n`
    message += `*${comment.user}* at ${comment.timestamp.toLocaleTimeString()}`

    return message
}

module.exports = {
    sendCommentsMessages: async (chatId) => {
        const comments = await CommentParser.getComments()
        for (let comment of comments) {
            await api.sendMessage(chatId, createCommentMessage(comment))
        }
    }
}