const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/stage")

module.exports.create = (informations, options) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options", order: 3}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/stageinstance")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}

module.exports.modify = (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `stage-instances/${channelid}`, this.modify, "modify role")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/StageInstance"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

module.exports.delete = (token, channelid, bot) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}