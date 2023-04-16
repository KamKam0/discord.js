const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/ban")


module.exports.ban = async (informations, options) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations,
        contentType: "url",
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}


module.exports.unban = async (informations, options) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations,
        contentType: "url",
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: false}
    ]
    return handler(args, passedOptions, null)
}

/**
 * 
 * @param {object} informations 
 * @param {object} [queryParams] 
 * @param {string} [queryParams.before] ID
 * @param {string} [queryParams.after] ID
 * @param {number} [queryParams.limit] 
 * @returns 
 */
module.exports.fetch = async (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.get.list.method,
        token: informations.botToken,
        url: apiPath.get.list.url,
        urlIDS: informations
    }
    let args = [
        {
            value: queryParams, 
            data_name: "infosURL",
            required: false,  
            check: [
                {name: "before", type: "number", data_type: "id"}, 
                {name: "after", type: "number", data_type: "id"}, 
                {name: "limit", type: "number", limit: 100}
            ]
        }
    ]
    let callBackSuccess = function (data){
        const manager = require("../structures/managers/bans")
        let newData = new manager(informations.bot, informations.guild_id)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.fetchspe = async (informations) => {
    let passedOptions = {
        method: apiPath.get.method,
        token: informations.botToken,
        url: apiPath.get.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/ban")
        data.guild_id = informations.guild_id
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}