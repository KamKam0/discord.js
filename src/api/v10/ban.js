const apiBase = require("./base")
const baseBansAPI = apiBase+"/guilds/:guild_id/bans"

let routes = {
    get: {
        method: "GET",
        url: baseBansAPI+"/:user_id",
        list: {
            method: "GET",
            url: baseBansAPI
        }
    },
    create: {
        method: "PUT",
        url: baseBansAPI+"/:user_id"
    },
    delete: {
        method: "DELETE",
        url: baseBansAPI+"/:user_id"
    }
}

module.exports = routes
module.exports.baseBansAPI = baseBansAPI