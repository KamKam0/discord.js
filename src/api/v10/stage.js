const apiBase = require("./base")
const baseStageAPI = apiBase+"/stage-instances"

let routes = {
    create: {
        method: "POST",
        url: baseStageAPI
    },
    get: {
        method: "GET",
        url: baseStageAPI+"/:id"
    },
    modify: {
        method: "PATCH",
        url: baseStageAPI+"/:id"
    },
    delete: {
        method: "DELETE",
        url: baseStageAPI+"/:id"
    }
}

module.exports = routes
module.exports.baseStageAPI = baseStageAPI