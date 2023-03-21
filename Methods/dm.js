const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/channel")

module.exports.adduser = (informations, nick, accesstoken) => {
    let passedOptions = {
        method: apiPath.addGroupDM.method,
        token: informations.botToken,
        url: apiPath.addGroupDM.url,
        urlIDS: informations
    }
    let args = [
        {value: nick, data_name: "nick", order:4}, 
        {value: accesstoken, data_name: "accesstoken", order:5},
        {value: {access_token: accesstoken, nick: nick}, data_name: "options"}
    ]
    return handler(args, passedOptions, null, null)
}

module.exports.removeuser = (informations) => {
    let passedOptions = {
        method: apiPath.removeGroupDM.method,
        token: informations.botToken,
        url: apiPath.removeGroupDM.url,
        urlIDS: informations
    }
    let args = [
        {value: nick, data_name: "nick", order:4}, 
        {value: accesstoken, data_name: "accesstoken", order:5},
        {value: {access_token: accesstoken, nick: nick}, data_name: "options"}
    ]
    return handler(args, passedOptions, null, null)
}