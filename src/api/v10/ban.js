const apiBase = require("./base")
const baseBansAPI = apiBase+"/guilds/:guild_id/bans"

let routes = {
    get: {
        method: "GET",
        url: baseBansAPI+"/:id",
        list: {
            method: "GET",
            url: baseBansAPI
        }
    },
    create: {
        method: "PUT",
        url: baseBansAPI+"/:id"
    },
    delete: {
        method: "DELETE",
        url: baseBansAPI+"/:id"
    }
}

module.exports = routes
module.exports.baseBansAPI = baseBansAPI