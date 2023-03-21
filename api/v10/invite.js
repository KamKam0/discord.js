const apiBase = require("./base")
const baseInviteAPI = apiBase+"/invites/:id"

let routes = {
    get: {
        method: "GET",
        url: baseInviteAPI
    },
    delete: {
        method: "DELETE",
        url: baseInviteAPI
    }
}

module.exports = routes
module.exports.baseInviteAPI = baseInviteAPI