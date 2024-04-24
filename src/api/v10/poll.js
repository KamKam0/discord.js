const apiBase = require("./base")
const baseMemberAPI = apiBase+"/channels/:channel_id/polls/:message_id/"

let routes = {
    get: {
        method: "GET",
        url: baseMemberAPI+"/answers/:answer_id",
    },
    end: {
        method: "POST",
        url: baseMemberAPI+"/expire",
    },
}

module.exports = routes
module.exports.baseMemberAPI = baseMemberAPI