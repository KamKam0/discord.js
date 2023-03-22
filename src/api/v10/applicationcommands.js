const apiBase = require("./base")
const baseApplicationCommandsAPI = apiBase+"/applications/:application_id/commands"
const apiGuildBase = apiBase+"/applications/:application_id/guilds/:guild_id/commands"

let routes = {
    get: {
        method: "GET",
        url: baseApplicationCommandsAPI+"/:id",
        global: {
            method: "GET",
            url: baseApplicationCommandsAPI
        },
        guild: {
            method: "GET",
            url: apiGuildBase+"/:id",
            list: {
                method: "GET",
                url: apiGuildBase,
            },
            permissions: {
                method: "GET",
                url: apiGuildBase+"/:id/permissions",
                list: {
                    method: "GET",
                    url: apiGuildBase+"/permissions",
                }
            }
        }
    },
    create: {
        global: {
            method: "POST",
            url: baseApplicationCommandsAPI
        },
        guild: {
            method: "POST",
            url: apiGuildBase
        }
    },
    modify: {
        method: "PATCH",
        url: baseApplicationCommandsAPI+"/:id",
        bulk: {
            method: "PUT",
            url: baseApplicationCommandsAPI,
            guild: {
                method: "PUT",
                url: apiGuildBase,
            }
        },
        guild: {
            method: "PATCH",
            url: apiGuildBase+"/:id",
            permissions: {
                method: "PATCH",
                url: apiGuildBase+"/:id/permissions",
            }
        }
    },
    delete: {
        method: "DELETE",
        url: baseApplicationCommandsAPI+"/:id",
        guild: {
            method: "DELETE",
            url: apiGuildBase+"/:id",
        }
    }
}

module.exports = routes
module.exports.baseApplicationCommandsAPI = baseApplicationCommandsAPI