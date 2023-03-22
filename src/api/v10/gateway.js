const apiBase = require("./base")
const baseGatewayAPI = apiBase+"/gateway"

let routes = {
    get: {
        method: "GET",
        url: baseGatewayAPI,
        bot: {
            method: "GET",
            url: baseGatewayAPI+"/bot"
        }
    }
}

module.exports = routes
module.exports.baseGatewayAPI = baseGatewayAPI