const apiBase = require("./base")
const baseAutoModerationAPI = apiBase+"/guilds/:guild_id/auto-moderation/rules"

let routes = {
    get: {
        method: "GET",
        url: baseAutoModerationAPI+"/:id",
        list: {
            method: "GET",
            url: baseAutoModerationAPI
        }
    },
    create: {
        method: "POST",
        url: baseAutoModerationAPI
    },
    modify: {
        method: "PATCH",
        url: baseAutoModerationAPI+"/:id"
    },
    delete: {
        method: "DELETE",
        url: baseAutoModerationAPI+"/:id"
    }
}

module.exports = routes
module.exports.baseAutoModerationAPI = baseAutoModerationAPI