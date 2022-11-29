const axios = require("axios"),
    mapUrl = `https://tugc.2gis.com/1.0/layers/user?project=almaty&layers=["comment"]`

module.exports = {
    getComments: async () => {
        let comments = await axios.get(mapUrl).catch(err => {console.log(err)})
        comments = comments.data
        let commentsList = []
        console.log(comments)
        comments.forEach( item => {
            const encodedCoords = encodeURIComponent(item.location.coordinates.join(','))
            commentsList.push({
                id: item.id,
                comment: item.comment,
                location: `https://2gis.kz?m=${encodedCoords}%2f15&traffic`,
                user: item.user.name,
                feedback: item.feedbacks,
                timestamp: new Date(item.timestamp * 1000)
            })
        })
        return commentsList
    }

}