const apiBase = require("./base")
const baseReactionAPI = apiBase+"/channels/:channel_id/messages/:id/reactions"

let routes = {
    get: {
        method: "GET",
        url: baseReactionAPI,
        listOne: {
            method: "GET",
            url: baseReactionAPI+"/:emoji"
        }
    },
    create: {
        method: "PUT",
        url: baseReactionAPI+"/:emoji/@me"
    },
    delete: {
        method: "DELETE",
        url: baseReactionAPI+"/:emoji/@me",
        user: {
            method: "DELETE",
            url: baseReactionAPI+"/:emoji/:user_id",
        },
        all: {
            method: "DELETE",
            url: baseReactionAPI
        },
        allOfOne: {
            method: "DELETE",
            url: baseReactionAPI+"/:emoji"
        }
    }
}

module.exports = routes
module.exports.baseReactionAPI = baseReactionAPI