const apiBase = require("./base")
const baseStickerAPI = apiBase+"/guilds/:guild_id/stickers"

let routes = {
    get: {
        method: "GET",
        url: apiBase+"/stickers/:id",
        guild: {
            method: "GET",
            url: baseStickerAPI+"/:id"
        }
    },
    list: {
        nitro: {
            method: "GET",
            url: apiBase+"/sticker-packs"
        },
        guild: {
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