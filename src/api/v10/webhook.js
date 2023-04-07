const apiBase = require("./base")
const baseWebhookAPI = apiBase+"/webhooks/:id"
const baseWebhookAPIToken = apiBase+"/webhooks/:id/:token"

let routes = {
    create: {
        method: "POST",
        url: apiBase+"/channels/:channel_id/webhooks"
    },
    get: {
        method: "GET",
        url: baseWebhookAPI,
        withToken: {
            method: "GET",
            url: baseWebhookAPIToken
        },
        guildWebhooks: {
            method: "GET",
            url: apiBase+"/guilds/:guild_id/webhooks"
        },
        channelWebhooks: {
            method: "GET",
            url: apiBase+"/channels/:channel_id/webhooks"
        }
    },
    modify: {
        method: "PATCH",
        url: baseWebhookAPI,
        withToken: {
            method: "PATCH",
            url: baseWebhookAPIToken
        }
    },
    delete: {
        method: "DELETE",
        url: baseWebhookAPI,
        withToken: {
            method: "DELETE",
            url: baseWebhookAPIToken
        }
    },
    execute: {
        method: "POST",
        url: baseWebhookAPIToken,
        slack: {
            method: "POST",
            url: baseWebhookAPIToken+"/slack"
        },
        github: {
            method: "POST",
            url: baseWebhookAPIToken+"/github"
        }
    },
    message: {
        get: {
            method: "GET",
            url: baseWebhookAPIToken+"/messages/:message_id"
        },
        modify: {
            method: "PATCH",
            url: baseWebhookAPIToken+"/messages/:message_id"
        },
        delete: {
            method: "DELETE",
            url: baseWebhookAPIToken+"/messages/:message_id"
        }
    }
}

module.exports = routes
module.exports.baseWebhookAPI = baseWebhookAPI