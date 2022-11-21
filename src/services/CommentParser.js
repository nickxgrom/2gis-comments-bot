const axios = require("axios"),
    mapUrl = `https://tugc.2gis.com/1.0/layers/user?project=almaty&layers=["comment"]`,
    api = require('../utils/api')

module.exports = {
    getComments: async () => {
        let comments = await axios.get(mapUrl)
        let msg = ''
        comments.data.forEach( item => {
            msg += `${item.comment}\n`
        })
        console.log(msg)
        await api.sendMessage(process.env.CHAT_ID, msg)
    }

}