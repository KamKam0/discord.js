const apiBase = require("./base")
const baseApplicationMetadataAPI = apiBase+"/applications/:id/role-connections/metadata"

let routes = {
    get: {
        method: "GET",
        url: apiBase+'/applications/@me'
    },
    modify: {
        method: "PATCH",
        url: apiBase+'/applications/@me'
    },
    metadata: {
        get: {
            method: "GET",
            url: baseApplicationMetadataAPI
        },
        modify: {
            method: "PUT",
            url: baseApplicationMetadataAPI
        }
    }
}

module.exports = routes
module.exports.baseApplicationMetadataAPI = baseApplicationMetadataAPI