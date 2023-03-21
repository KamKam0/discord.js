const router = require("./router")

/**
 * 
 * @param {(string|object|object[])} args 
 * @param {object} options
 * @param {string} options.method
 * @param {string} options.url 
 * @param {string} options.contentType 
 * @param {string} options.token 
 * @param {object} options.urlIDS
 * @param {function} callback 
 * @returns 
 */
module.exports = async (args, options, callbackSuccess, executeDeferently) => {
    return new Promise(async (resolve, reject) => {

        const errors = require("../DB/errors.json")
        const createError = utils.createError

        if(!Array.isArray(args) || !args.length) return reject(createError(errors["88"].message, {code: errors["88"].code, message: errors["88"].message}))
        if(typeof options !== "object" || typeof options.token !== "string" || typeof options.url !== "string" || typeof options.method !== "string" || !["get", "delete", "post", "patch", "put"].includes(options.method.toLowerCase()) || typeof options.urlIDS !== "object") return reject(createError(errors["24"].message, {code: errors["24"].code, message: errors["24"].message}))
        if((callbackSuccess && typeof callbackSuccess !== "function") || (executeDeferently && typeof executeDeferently !== "function")) return reject(createError(errors["90"].message, {code: errors["90"].code, message: errors["90"].message}))

        let headers = require("../headers/base")
        let contentType = require("../headers/contenttypes")[options.contentType]
        if(!contentType) return reject(createError(errors["89"].message, {code: errors["89"].code, message: errors["89"].message}))
        headers = {...headers, "Content-Type": contentType, Authorization: headers.Authorization.replace("TOKEN", options.token)}

        let requestURL = require("./linkmodification")(options.url, options.urlIDS)
        let requestURLWithQuery = require("./urlcheck")(requestURL, args.find(e => e.data_name === "infosURL"))

        let requestVerification = require("./verify")(args)
        if(!requestVerification.state) return reject(createError("Your request is incorrect", requestVerification))

        let requestBody = args.find(e => e.data_name === "options")?.value
        if(requestBody) var basedatas = router(requestURLWithQuery, {method: options.method, headers, body: JSON.stringify(requestBody)})
        else var basedatas = router(requestURLWithQuery, {method: options.method, headers})

        basedatas
        .then(data => {
            if(data.requestStatus < 204){
                if(callbackSuccess) return resolve(callbackSuccess(data))
                return resolve(data)
            }
            else if(data.requestStatus == 204) return resolve(null)
            else if(data.retry_after){
                setTimeout(() => {
                    require("../requests/handler")(args, options, callbackSuccess, executeDeferently)
                    .catch(err => reject(err))
                    .then(datas => resolve(datas))
                }, data.retry_after * 1000)
            }else return reject(err)
        })
        .catch(err => reject(err))
    })
}