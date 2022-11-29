const axios = require("axios"),
    botToken = `bot${process.env.BOT_TOKEN}`,
    baseUrl = 'https://api.telegram.org'

module.exports = {
    sendMessage: async (chatId, message) => {
        await axios.post(`${baseUrl}/${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
            disable_web_page_preview: true,
            parse_mode: 'Markdown'
        }).catch(err => {console.log(err)})
    }
}