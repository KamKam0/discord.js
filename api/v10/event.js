const apiBase = require("./base")
const baseEventAPI = apiBase+"/guilds/:guild_id/scheduled-events"

let routes = {
    create: {
        method: "POST",
        url: baseEventAPI
    },
    get: {
        method: "GET",
        url: baseEventAPI+"/:id",
        guild: {
            method: "GET",
            url: baseEventAPI
        },
        users: {
            method: "GET",
            url: baseEventAPI+"/:id/users"
        }
    },
    modify: {
        method: "PATCH",
        url: baseEventAPI+"/:id"
    },
    delete: {
        method: "DELETE",
        url: baseEventAPI+"/:id"
    }
}

module.exports = routes
module.exports.baseEventAPI = baseEventAPI