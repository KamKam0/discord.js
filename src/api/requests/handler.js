const router = require("./router")
const errors = require("../../utils/errors.json")

/**
 * 
 * @param {(string|object|object[])} args 
 * @param {object} options
 * @param {string} options.method
 * @param {string} options.url 
 * @param {string} options.contentType 
 * @param {string} options.token 
 * @param {object} options.urlIDS
 * @param {function} callbackSuccess
 * @returns 
 */
module.exports = async (args, options, callbackSuccess) => {
    return new Promise(async (resolve, reject) => {
        const utils = require("../../utils/functions")
        const createError = utils.general.createError

        //check des params
        if(!Array.isArray(args)) return reject(createError(errors["88"].message, {code: errors["88"].code, message: errors["88"].message}))
        if(typeof options !== "object"  || typeof options.url !== "string" || typeof options.method !== "string" || !["get", "delete", "post", "patch", "put"].includes(options.method.toLowerCase()) || typeof options.urlIDS !== "object") return reject(createError(errors["24"].message, {code: errors["24"].code, message: errors["24"].message}))
        if((callbackSuccess && typeof callbackSuccess !== "function")) return reject(createError(errors["90"].message, {code: errors["90"].code, message: errors["90"].message}))

        //Déclaration des headers et la variable de requête
        let headers = require("../headers/base")
        let basedata;

        // mise en place des headers
        let contentType = require("../headers/contenttypes")[(options.contentType || "basic")]
        if(!contentType) return reject(createError(errors["89"].message, {code: errors["89"].code, message: errors["89"].message}))
        if(options.contentType === "file") contentType+=options.boundary
        headers = {...headers, "Content-Type": contentType}
        if(options.token) headers = {...headers, Authorization: headers.Authorization.replace("TOKEN", options.token)}
        
        if(options.xAuditReasonAvailable){
            let optionField = args.find(e => e.data_name === "options")

            if(optionField && optionField.value && optionField.reason){

                if(typeof optionField.value === "string"){
                    headers = {...headers, "X-Audit-Log-Reason": optionField.value}
                    args.splice(args.indexOf(optionField))
                }
                else if(optionField.value.reason){
                    
                    headers = {...headers, "X-Audit-Log-Reason": optionField.value.reason}

                    if(Object.entries(optionField.value).length === 1) args.splice(args.indexOf(optionField))
                    else delete optionField.value.reason
                }

            }

            delete options.xAuditReasonAvailable
        }

        // modification des params donnés pour être compatibles discord
        let requestURL = require("./linkmodification")(options.url, options.urlIDS)
        let requestURLWithQuery = require("./urlcheck")(requestURL, args.find(e => e.data_name === "infosURL"))
        
        // verification des arguments
        let requestVerification = require("./verify")(args)
        if(!requestVerification.state) return reject(createError("Your request is incorrect", requestVerification))

        //request via le router
        let requestBody = args.find(e => e.data_name === "options")?.value
        if(requestBody) {
            if(!contentType.includes("multipart/form-data;")) requestBody = JSON.stringify(requestBody)
            basedata = router(requestURLWithQuery, {method: options.method, headers, body: requestBody })
        }
        else basedata = router(requestURLWithQuery, {method: options.method, headers})

        //response à la requête
        basedata
        .then(data => {
            if(data.requestStatus < 204){
                if(callbackSuccess) return resolve(callbackSuccess(data.response))
                return resolve(data.response)
            }
            else if(data.requestStatus == 204) return resolve(null)
            else if(data.response.retry_after){
                setTimeout(() => {
                    require("../requests/handler")(args, options, callbackSuccess)
                    .catch(err => reject(err))
                    .then(datas => resolve(datas))
                }, data.response.retry_after * 1000)
            }else return reject(data.response)
        })
        .catch(err => reject(err))
    })
}