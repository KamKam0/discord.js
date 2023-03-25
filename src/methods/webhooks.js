const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/webhook")
const errors = require("../utils/errors.json")

module.exports.create = async (informations, options) => {
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
        const single = require("../structures/singles/webhook")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.get = async (informations) => {
    let passedOptions = {
        method: apiPath.get.channelWebhooks.method,
        token: informations.botToken,
        url: apiPath.get.channelWebhooks.url,
        urlIDS: informations
    }
    let args = []
    let callBackSuccess = function (data){
        const manager = require("../structures/managers/webhooks")
        let newManager = new manager(informations.bot)
        newManager._addMultiple(data)
        return newManager
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.modify = async (informations, options) => {
    let passedOptions = {
        method: apiPath.modify.method,
        token: informations.botToken,
        url: apiPath.modify.url,
        urlIDS: informations
    }
    let args = [
        {value: options, data_name: "options"}
    ]
    let callBackSuccess = function (data){
        const manager = require("../structures/managers/webhooks")
        let newManager = new manager(informations.bot)
        newManager._addMultiple(data)
        return newManager
    }
    return handler(args, passedOptions, callBackSuccess)
}

module.exports.delete = async (token, webhookid, bot) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null)
}

module.exports.execute = async (token, webhook, options, bot) => {//cp
    return
    // return new Promise(async (resolve, reject) => {
    //     const createError = require("../utils/functions").createError
    //     const fetch = require("node-fetch")
    //     let baseinfos = require("../utils/functions").getbaseinfosre(token)
    //     const baseurl = baseinfos["baseurl"]
    //     const baseheaders = baseinfos["baseheaders"]
    //     if(!options) return reject(createError("An error happened", {code: errors["8"].code, message: errors["8"].message, file: "Webhooks"}))
    //     if(!webhook) return reject(createError("An error happened", {code: errors["35"].code, message: errors["35"].message, file: "Webhooks"}))
    //     if(!token) return reject(createError("An error happened", {code: errors["12"].code, message: errors["12"].message, file: "Webhooks"}))
    
    //     const url = `${baseurl}/webhooks/${webhook.id}/${webhook.token}?wait=true`
    
    //     if(typeof options !== "object") return reject(createError("An error happened", {code: errors["74"].code, message: errors["74"].message, file: "Webhooks"}))
    //     else{
    
    //         let body = {}
    //         if(options.files && Array.isArray(options.files) === true){
    //             const FormData = require("form-data")
    //             body = new FormData()
    //             let count = -1
    //             options.files.forEach(file => {
    //                 if(file.name && file.extension && file.buffer){
    //                     count++
                        
    //                     body.append(`files[${count}]`, file.buffer, `${file.name}.${file.extension}`);
    //                 }
    //             })
    //             let headers = require("../utils/functions").getbaseinfosrecp(token).baseheaders
    //             headers["Content-Type"] += body.getBoundary()
    //             if(options.content || options.embeds || options.components){
    //                 let vody = {}
    //                 if(options.embeds && Array.isArray(options.embeds) === true && options.embeds[0]) vody.embeds = options.embeds
    //                 if(options.components && Array.isArray(options.components) === true && options.components[0]) vody.components = [{type: 1, components: options.components}]
    //                 if(options.content) vody.content = options.content
    //                 if(options.replyto) vody.message_reference = {"message_id": options.replyto, "fail_if_not_exists": false}
    //                 body.append("payload_json", JSON.stringify(vody))
    //             }
                
    //             const basedatas = await fetch(url, {method: "POST", headers: headers, body: body}).catch(err => {})
    //             const datas = await basedatas.json()
    //             if(!datas || datas.code || datas.retry_after){
    //                 if(datas && datas.retry_after){
    //                     setTimeout(() => {
    //                         this.execute(token, webhook, options)
    //                         .catch(err => reject(createError("An error happened", err)))
    //                         .then(datas => resolve(datas))
    //                     }, datas.retry_after * 1000)
    //                 }else return reject(createError("Une erreur s'est produite lors de la requête", datas))
    //             }
    //             else return resolve(new (require("../Gestionnaires/Individual/Message"))(datas, bot))
    //         }else{
    //             if(options.content && typeof options.content === "string") body.content = options.content
    //             if(options.embeds && Array.isArray(options.embeds) === true){
    //                 options.embeds.forEach(embed => {
    //                     if(embed.footer && !embed.footer.text) return
    //                     if(embed.author && !embed.author.name) return
    //                     if(!embed.color || typeof embed.color !== "number") embed.color = 0x000000
    //                     if(!body.embeds) body.embeds = []
    //                     body.embeds.push(embed)
    //                 })
    //             }
    //             if(options.components && Array.isArray(options.components) === true){
    //                 options.components.forEach(compo => {
    //                     if(!body.components) body.components = [{type: 1, components: []}]
    //                     body.components[0].components.push(compo)
    //                 })
    //             }
    //             if(options.replyto) body.message_reference = {"message_id": options.replyto, "fail_if_not_exists": true}
    //             if(!body.content && !body.embeds && !body.components) return reject({code: errors["74"].code, message: errors["74"].message, file: "Webhooks"})
    //             const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(body)}).catch(err => {})
    //             const datas = await basedatas.json()
    //             if(!datas || datas.code || datas.retry_after){
    //                 if(datas && datas.retry_after){
    //                     setTimeout(() => {
    //                         this.execute(token, webhook, options)
    //                         .catch(err => reject(createError("An error happened", err)))
    //                         .then(datas => resolve(datas))
    //                     }, datas.retry_after * 1000)
    //                 }else return reject(createError("Une erreur s'est produite lors de la requête", datas))
    //             }
    //             else return resolve(new (require("../Gestionnaires/Individual/Message"))(datas, bot))
    //         }
    //     }
    // })
}

module.exports.modify = async (token, webhook, options, bot) => {//cp
    return
}