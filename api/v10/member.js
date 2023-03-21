const apiBase = require("./base")
const baseMemberAPI = apiBase+"/guilds/:guild_id/members"

let routes = {
    get: {
        method: "GET",
        url: baseMemberAPI+"/:user_id",
        list: {
            method: "GET",
            url: baseMemberAPI
        }
    },
    search: {
        method: "GET",
        url: baseMemberAPI+"/search",
    },
    create: {
        method: "POST",
        url: baseMemberAPI+"/:user_id"
    },
    modify: {
        method: "PATCH",
        url: baseMemberAPI+"/:user_id",
        current: {
            method: "PATCH",
            url: baseMemberAPI+"/@me",
            nickname: {
                method: "PATCH",
                url: baseMemberAPI+"/@me/nick"
            }
        }
    },
    delete: {
        method: "DELETE",
        url: baseMemberAPI+"/:user_id"
    }
}

module.exports = routes
module.exports.baseMemberAPI = baseMemberAPI