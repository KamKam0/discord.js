module.exports.create = async (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: options, type: "object", data_name: "options", order: 3}, {value: bot, type: "object", data_name: "bot", order: 4}], "POST", `channels/${channelid}/webhooks`, this.create, "create webhook")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Webhook"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.get = async (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: bot, type: "object", data_name: "bot", order: 3}], "GET", `channels/${channelid}/webhooks`, this.get, "get webhook")
        .then(datas => {
            const webhooks = new (require("../Gestionnaires/Multiple/Webhooks"))(bot)
            webhooks.AddWebhooks(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}
module.exports.modify = async (token, webhookid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: webhookid, value_data: "id", data_name: "webhookid", order:2}, {value: options, type: "object", data_name: "options", order: 3}, {value: bot, type: "object", data_name: "bot", order: 4}], "PATCH", `webhooks/${webhookid}`, this.modify, "modify webhook")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Webhook"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.delete = async (token, webhookid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: webhookid, value_data: "id", data_name: "webhookid", order:2}, {value: bot, type: "object", data_name: "bot", order: 3}], "DELETE", `webhooks/${webhookid}`, this.delete, "delete webhook")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.execute = async (token, webhook, options, bot) => {//cp
    const fetch = require("node-fetch")
    let baseinfos = require("../Utils/functions").getbaseinfosre(token)
    const baseurl = baseinfos["baseurl"]
    const baseheaders = baseinfos["baseheaders"]
    if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Webhooks"})
    if(!webhook) return reject({code: require("../DB/errors.json")["35"].code, message: require("../DB/errors.json")["35"].message, file: "Webhooks"})
    if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Webhooks"})

    const url = `${baseurl}/webhooks/${webhook.id}/${webhook.token}?wait=true`

    if(typeof options !== "object") return reject({code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Webhooks"})
    else{

        let body = {}
        if(options.files && Array.isArray(options.files) === true){
            const FormData = require("form-data")
            body = new FormData()
            let count = -1
            options.files.forEach(file => {
                if(file.name && file.extension && file.buffer){
                    count++
                    
                    body.append(`files[${count}]`, file.buffer, `${file.name}.${file.extension}`);
                }
            })
            let headers = require("../Utils/functions").getbaseinfosrecp(token).baseheaders
            headers["Content-Type"] += body.getBoundary()
            if(options.content || options.embeds || options.components){
                let vody = {}
                if(options.embeds && Array.isArray(options.embeds) === true && options.embeds[0]) vody.embeds = options.embeds
                if(options.components && Array.isArray(options.components) === true && options.components[0]) vody.components = [{type: 1, components: options.components}]
                if(options.content) vody.content = options.content
                if(options.replyto) vody.message_reference = {"message_id": options.replyto, "fail_if_not_exists": false}
                body.append("payload_json", JSON.stringify(vody))
            }
            
            const basedatas = await fetch(url, {method: "POST", headers: headers, body: body}).catch(err => {})
            const datas = await basedatas.json()
            if(!datas || datas.code || datas.retry_after){
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.execute(token, webhook, options)
                        .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = err
                    reject(er)
                })
                        .then(datas => { return resolve(datas)})
                    }, datas.retry_after * 1000)
                }else{
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = datas
                    return reject(er)
                }
            }
            else return resolve(new (require("../Gestionnaires/Individual/Message"))(datas, bot))
        }else{
            if(options.content && typeof options.content === "string") body.content = options.content
            if(options.embeds && Array.isArray(options.embeds) === true){
                options.embeds.forEach(embed => {
                    if(embed.footer) if(!embed.footer.text) return
                    if(embed.author) if(!embed.author.name) return
                    if(!embed.color || typeof embed.color !== "number") embed.color = 0x000000
                    if(!body.embeds) body.embeds = []
                    body.embeds.push(embed)
                })
            }
            if(options.components && Array.isArray(options.components) === true){
                options.components.forEach(compo => {
                    if(!body.components) body.components = [{type: 1, components: []}]
                    body.components[0].components.push(compo)
                })
            }
            if(options.replyto) body.message_reference = {"message_id": options.replyto, "fail_if_not_exists": true}
            if(!body.content && !body.embeds && !body.components) return reject({code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Webhooks"})
            const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(body)}).catch(err => {})
            const datas = await basedatas.json()
            if(!datas || datas.code || datas.retry_after){
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.execute(token, webhook, options)
                        .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = err
                    reject(er)
                })
                        .then(datas => { return resolve(datas)})
                    }, datas.retry_after * 1000)
                }else{
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = datas
                    return reject(er)
                }
            }
            else return resolve(new (require("../Gestionnaires/Individual/Message"))(datas, bot))
        }
    }
}