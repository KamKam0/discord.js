const apiBase = require("./base")
const baseVoiceAPI = apiBase+"/voice/regions"

let routes = {
    get: {
        method: "GET",
        url: baseVoiceAPI
    }
}

module.exports = routes
module.exports.baseVoiceAPI = baseVoiceAPI