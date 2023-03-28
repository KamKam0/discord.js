const apiBase = require("./base")
const baseTemplateAPI = apiBase+"/guilds/:guild_id/templates"

let routes = {
    getGuild: {
        template: {
            method: "GET",
            url: apiBase+"/guilds/templates/:code"
        },
        templates: {
            method: "GET",
            url: baseTemplateAPI
        }
    },
    create: {
        method: "POST",
        url: baseTemplateAPI,
        fromTemplate: {
            method: "POST",
            url: "/guilds/templates/:code"
        }
    },
    sync: {
        method: "PUT",
        url: baseTemplateAPI+"/:code",
    },
    modify: {
        method: "PATCH",
        url: baseTemplateAPI+"/:code",
    },
    delete: {
        method: "DELETE",
        url: baseTemplateAPI+"/:code",
    }
}

module.exports = routes
module.exports.baseTemplateAPI = baseTemplateAPI