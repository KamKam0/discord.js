const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/member")

module.exports = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations,
        contentType: "url"
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}