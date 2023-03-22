const apiBase = require("./base")
const baseThreadAPI = apiBase+"/channel/:channel_id/threads"

let routes = {
    create: {
        method: "POST",
        url: apiBase+"/channel/:channel_id/messages/:message_id/threads",
        withoutMessage: {
            method: "POST",
            url: baseThreadAPI
        },
        forum: {
            method: "POST",
            url: baseThreadAPI
        }
    },
    join: {
        method: "PUT",
        url: baseThreadAPI.slice(0, -1)+"-members/@me"
    },
    add: {
        method: "PUT",
        url: baseThreadAPI.slice(0, -1)+"-members/:user_id"
    },
    leave: {
        method: "DELETE",
        url: baseThreadAPI.slice(0, -1)+"-members/@me"
    },
    remove: {
        method: "DELETE",
        url: baseThreadAPI.slice(0, -1)+"-members/:user_id"
    },
    get: {
        members: {
            method: "GET",
            url: baseThreadAPI.slice(0, -1)+"-members"
        },
        member: {
            method: "GET",
            url: baseThreadAPI.slice(0, -1)+"-members/:user_id"
        },
        publicsArchived: {
            method: "GET",
            url: baseThreadAPI+"/archived/public"
        },
        privatesArchived: {
            method: "GET",
            url: baseThreadAPI+"/archived/private"
        },
        privatesJoinedArchived: {
            method: "GET",
            url: apiBase+"/channels/{channel.id}/users/@me/threads/archived/private"
        }
    },
    modify: {
        method: "DELETE",
        url: apiBase+"/channels/:id"
    },
    delete: {
        method: "DELETE",
        url: apiBase+"/channels/:id"
    }
}

module.exports = routes
module.exports.baseThreadAPI = baseThreadAPI