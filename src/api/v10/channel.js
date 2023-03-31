const apiBase = require("./base")
const baseChannelAPI = apiBase+"/channels"

let routes = {
    create: {
        method: "POST",
        url: apiBase+"/guilds/:guild_id/channels"
    },
    get: {
        method: "GET",
        url: baseChannelAPI+"/:id"
    },
    modify: {
        method: "PATCH",
        url: baseChannelAPI+"/:id"
    },
    bulkDelete: {
        method: "POST",
        url: baseChannelAPI+"/:id/messages/bulk-delete"
    },
    invites: {
        getInvites: {
            method: "GET",
            url: baseChannelAPI+"/:id/invites"
        },
        createInvite: {
            method: "POST",
            url: baseChannelAPI+"/:id/invites"
        },
    },
    permissions: {
        editPermissions: {
            method: "PUT",
            url: baseChannelAPI+"/:id/permissions/:overwrite_id"
        },
        deletePermissions: {
            method: "DELETE",
            url: baseChannelAPI+"/:id/permissions/:overwrite_id"
        },
    },
    followNews: {
        method: "POST",
        url: baseChannelAPI+"/:id/followers"
    },
    getPins: {
        method: "POST",
        url: baseChannelAPI+"/:id/pins"
    },
    triggerTyping: {
        method: "POST",
        url: baseChannelAPI+"/:id/pins/typing"
    },
    addGroupDM: {
        method: "PUT",
        url: baseChannelAPI+"/:id/recipients/:user_id"
    },
    removeGroupDM: {
        method: "DELETE",
        url: baseChannelAPI+"/:id/recipients/:user_id"
    },
    delete: {
        method: "DELETE",
        url: baseChannelAPI+"/:id"
    }
}

module.exports = routes
module.exports.baseChannelAPI = baseChannelAPI