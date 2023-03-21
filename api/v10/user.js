const apiBase = require("./base")
const baseUserAPI = apiBase+"/users"

let routes = {
    get: {
        method: "GET",
        url: baseUserAPI+"/:id",
        current: {
            method: "GET",
            url: baseUserAPI+"/@me",
            connections: {
                method: "GET",
                url: baseUserAPI+"/@me/connections",
            },
            guilds: {
                method: "GET",
                url: baseUserAPI+"/@me/guilds"
            },
            guild: {
                member: {
                    method: "GET",
                    url: baseUserAPI+"/@me/guilds/:guild_id/member"
                }
            }
        },
        connection: {
            method: "GET",
            url: baseUserAPI+"/@me/applications/:application_id/role-connection"
        }
    },
    modifCurrent: {
        method: "PATCH",
        url: baseUserAPI+"/@me"
    },
    create: {
        dm: {
            method: "POST",
            url: baseUserAPI+"/@me/channels",
            group: {
                method: "POST",
                url: baseUserAPI+"/@me/channels",
            }
        }
    },
    updateApplicationRoleConnection: {
        method: "PUT",
        url: baseUserAPI+"/@me/applications/:application_id/role-connection",
    },
    leave: {
        method: "DELETE",
        url: baseUserAPI+"/@me/guilds/:guild_id"
    }
}

module.exports = routes
module.exports.baseUserAPI = baseUserAPI