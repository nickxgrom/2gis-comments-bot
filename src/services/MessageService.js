const CommentParser = require("./CommentParser");
const api = require("../utils/api");

let temporaryViewedCommentsList = []

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
        let comments = await CommentParser.getComments()
        comments = comments.filter(comment => {
            const isCommentAlreadySent = temporaryViewedCommentsList.find(item => item === comment.id)
            if (!isCommentAlreadySent) {
                temporaryViewedCommentsList.push(comment.id)
            }

            return !isCommentAlreadySent
        })

        if (!comments.length) {
            await api.sendMessage(chatId, 'No new messages')
        }

        for (let comment of comments) {
            await api.sendMessage(chatId, createCommentMessage(comment))
        }
    }
}