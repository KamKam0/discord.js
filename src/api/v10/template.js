const apiBase = require("./base")
const baseTemplateAPI = apiBase+"/guilds/:guild_id/templates"

let routes = {
    getGuild: {
        template: {
            method: "GET",
            url: "guilds/templates/:id"
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
            url: "guilds/templates/:id"
        }
    },
    sync: {
        method: "PUT",
        url: baseTemplateAPI+"/:id",
    },
    modify: {
        method: "PATCH",
        url: baseTemplateAPI+"/:id",
    },
    delete: {
        method: "DELETE",
        url: baseTemplateAPI+"/:id",
    }
}

module.exports = routes
module.exports.baseTemplateAPI = baseTemplateAPI