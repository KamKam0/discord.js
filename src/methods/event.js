const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/event")


module.exports.create = (informations, options) => {
    let passedOptions = {
        method: apiPath.create.method,
        token: informations.botToken,
        url: apiPath.create.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/event")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.modify = (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations,
        xAuditReasonAvailable: true
    }
    let args = [
        {value: options, data_name: "options", order: 3, reason: true, required: true}
    ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/event")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}


module.exports.delete = (informations, options) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations,
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
 * @param {boolean} [queryParams.with_member] 
 * @returns 
 */
module.exports.getusers = (informations, queryParams) => {
    let passedOptions = {
        method: apiPath.get.users.method,
        token: informations.botToken,
        url: apiPath.get.users.url,
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
                {name: "limit", type: "number", limit: 100}, 
                {name: "with_member", type: "boolean"}
            ]
        }
    ]
    let callBackSuccess = function (data){
        const MemberClass = require("../structures/singles/member")
        const UsersClass = require("../structures/singles/user")
        let returnedData = data.filter(element => element.user).map(element => {
            if(element.user) element.user = new UsersClass({...element.user, guild_id: informations.guild_id}, informations.bot)
            if(element.member) element.member = new MemberClass({...element.member, guild_id: informations.guild_id}, informations.bot)
            return element
        })
        return returnedData
    }
    return handler(args, passedOptions, callBackSuccess)
}