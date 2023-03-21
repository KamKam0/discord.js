const apiBase = require("./base")
const baseStickerAPI = apiBase+"/guilds/:guild_id/roles"

let routes = {
    get: {
        method: "GET",
        url: baseStickerAPI
    },
    create: {
        method: "POST",
        url: baseStickerAPI
    },
    modify: {
        method: "PATCH",
        url: baseStickerAPI+"/:id",
        positions: {
            method: "PATCH",
            url: baseStickerAPI
        }
    },
    delete: {
        method: "DELETE",
        url: baseStickerAPI+"/:id"
    },
    add: {
        method: "PUT",
        url: apiBase+"/guilds/:guild_id/members/:user_id/roles/:role_id"
    },
    remove: {
        method: "DELETE",
        url: apiBase+"/guilds/:guild_id/members/:user_id/roles/:role_id"
    }
}

module.exports = routes
module.exports.baseStickerAPI = baseStickerAPI