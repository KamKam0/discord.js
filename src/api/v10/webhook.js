const apiBase = require("./base")
const baseWebhookAPI = apiBase+"/webhooks/:id"

let routes = {
    create: {
        method: "POST",
        url: apiBase+"/channels/:channel_id/webhooks"
    },
    get: {
        method: "GET",
        url: baseWebhookAPI+"/:id",
        withToken: {
            method: "GET",
            url: baseWebhookAPI+"/:id/:webhook_token"
        },
        guildWebhooks: {
            method: "GET",
            url: baseWebhookAPI+"/guilds/:guild_id/webhooks"
        },
        channelWebhooks: {
            method: "GET",
            url: baseWebhookAPI+"/channels/:channel_id/webhhoks"
        }
    },
    modify: {
        method: "PATCH",
        url: baseWebhookAPI+"/:id",
        withToken: {
            method: "PATCH",
            url: baseWebhookAPI+"/:id/:webhook_token"
        }
    },
    delete: {
        method: "DELETE",
        url: baseWebhookAPI+"/:id",
        withToken: {
            method: "DELETE",
            url: baseWebhookAPI+"/:id/:webhook_token"
        }
    },
    execute: {
        method: "POST",
        url: baseWebhookAPI+"/:id/:webhook_token",
        slack: {
            method: "POST",
            url: baseWebhookAPI+"/:id/:webhook_token/slack"
        },
        github: {
            method: "POST",
            url: baseWebhookAPI+"/:id/:webhook_token/github"
        }
    },
    message: {
        get: {
            method: "GET",
            url: baseWebhookAPI+"/:id/:webhook_token/message/:message_id"
        },
        modify: {
            method: "PATCH",
            url: baseWebhookAPI+"/:id/:webhook_token/message/:message_id"
        },
        delete: {
            method: "DELETE",
            url: baseWebhookAPI+"/:id/:webhook_token/message/:message_id"
        }
    }
}

module.exports = routes
module.exports.baseWebhookAPI = baseWebhookAPI