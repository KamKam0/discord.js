const apiBase = require("./base")
const baseStickerAPI = apiBase+"/guilds/:guild_id/emojis"

let routes = {
    get: {
        method: "GET",
        url: baseStickerAPI+"/:id",
        list: {
            method: "GET",
            url: baseStickerAPI
        }
    },
    create: {
        method: "POST",
        url: baseStickerAPI
    },
    modify: {
        method: "PATCH",
        url: baseStickerAPI+"/:id"
    },
    delete: {
        method: "DELETE",
        url: baseStickerAPI+"/:id"
    }
}

module.exports = routes
module.exports.baseStickerAPI = baseStickerAPI