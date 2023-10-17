const apiBase = require("./base")
const baseGuildAPI = apiBase+"/guilds/:id"

let routes = {
    create: {
        method: "POST",
        url: apiBase+"/guilds",
        channel: {
            method: "POST",
            url: baseGuildAPI+"/channels",
        },
        prune: {
            method: "POST",
            url: baseGuildAPI+"/prune",
        }
    },
    modify: {
        method: "PATCH",
        url: apiBase+"/guilds",
        channelPosition: {
            method: "PATCH",
            url: baseGuildAPI+"/channels"
        },
        mfa: {
            method: "POST",
            url: baseGuildAPI+"/mfa"
        },
        widget: {
            method: "PATCH",
            url: baseGuildAPI+"/widget",
        },
        welcomeScreen: {
            method: "PATCH",
            url: baseGuildAPI+"/welcome-screen",
        },
        onBoarding: {
            method: "PUT",
            url: baseGuildAPI+"/onboarding",
        },
        currentUserVoice: {
            method: "PATCH",
            url: baseGuildAPI+"/voice-states/@me",
        },
        vanity: {
            method: "PATCH",
            url: baseGuildAPI+"/vanity-url",
        },
        userVoice: {
            method: "PATCH",
            url: baseGuildAPI+"/voice-states/:user_id",
        }
    },
    delete: {
        method: "DELETE",
        url: apiBase+"/guilds",
        integration: {
            method: "DELETE",
            url: baseGuildAPI+"/integrations/:integration_id",
        }
    },
    get: {
        method: "GET",
        url: baseGuildAPI,
        preview: {
            method: "GET",
            url: baseGuildAPI+"/preview",
        },
        pruneCount: {
            method: "GET",
            url: baseGuildAPI+"/prune",
        },
        voiceRegions: {
            method: "GET",
            url: baseGuildAPI+"/regions",
        },
        invites: {
            method: "GET",
            url: baseGuildAPI+"/invites",
        },
        integrations: {
            method: "GET",
            url: baseGuildAPI+"/integrations",
        },
        widgetSettings: {
            method: "GET",
            url: baseGuildAPI+"/widget",
        },
        widget: {
            method: "GET",
            url: baseGuildAPI+"/widget.json",
        },
        widgetImage: {
            method: "GET",
            url: baseGuildAPI+"/widget.png",
        },
        vanity: {
            method: "GET",
            url: baseGuildAPI+"/vanity-url",
        },
        welcomeScreen: {
            method: "GET",
            url: baseGuildAPI+"/welcome-screen",
        },
        onBoarding: {
            method: "GET",
            url: baseGuildAPI+"/onboarding",
        },
        logs: {
            method: "GET",
            url: baseGuildAPI+"/audit-logs",
        }
    }
}

module.exports = routes
module.exports.baseGuildAPI = baseGuildAPI