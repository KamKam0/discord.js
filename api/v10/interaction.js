const apiBase = require("./base")
const baseInteractionAPI = apiBase+"/webhooks/:application_id/:interaction_token"

let routes = {
    create: {
        response: {
            method: "POST",
            url: apiBase+"/interactions/:interaction_id/:interaction_token/callback",
        },
        followUp: {
            method: "POST",
            url: baseInteractionAPI
        }
    },
    get: {
        reponse: {
            method: "GET",
            url: baseInteractionAPI+"/messages/@original",
        },
        followUp: {
            method: "GET",
            url: baseInteractionAPI+"/messages/:message_id"
        }
    },
    modify: {
        reponse: {
            method: "PATCH",
            url: baseInteractionAPI+"/messages/@original",
        },
        followUp: {
            method: "PATCH",
            url: baseInteractionAPI+"/messages/:message_id"
        }
    },
    delete: {
        reponse: {
            method: "DELETE",
            url: baseInteractionAPI+"/messages/@original",
        },
        followUp: {
            method: "DELETE",
            url: baseInteractionAPI+"/messages/:message_id"
        }
    }
}

module.exports = routes
module.exports.baseInteractionAPI = baseInteractionAPI