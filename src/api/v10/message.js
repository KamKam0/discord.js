const apiBase = require("./base")
const baseMemberAPI = apiBase+"/channels/:channel_id/messages"

let routes = {
    get: {
        method: "GET",
        url: baseMemberAPI+"/:id",
        list: {
            method: "GET",
            url: baseMemberAPI
        }
    },
    create: {
        method: "POST",
        url: baseMemberAPI,
        pin: {
            url: apiBase+"/channels/:channel_id/pins/:id",
            method: "PUT"
        }
    },
    crosspost: {
        method: "POST",
        url: baseMemberAPI+"/:id/crosspost"
    },
    modify: {
        method: "PATCH",
        url: baseMemberAPI+"/:id"
    },
    delete: {
        method: "DELETE",
        url: baseMemberAPI+"/:id",
        pin: {
            url: apiBase+"/channels/:channel_id/pins/:id",
            method: "DELETE"
        }
    }
}

module.exports = routes
module.exports.baseMemberAPI = baseMemberAPI