module.exports.create = async (token, channelid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Webhooks"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Webhooks"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Webhooks"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Webhooks"})


        const url = `${baseurl}/channels/${channelid}/webhooks`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create(token, channelid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Webhook"))({...datas, token: token}))
    })
}
module.exports.get = async (token, channelid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Webhooks"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Webhooks"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Webhooks"})
        const url = `${baseurl}/channels/${channelid}/webhooks`
        const basedatas = await fetch(url, {method: "GET", headers: baseheaders}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.get(token, channelid)
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
        else{
            const webhooks = new (require("../Gestionnaires/Multiple/Webhooks"))()
            webhooks.AddWebhooks(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        }
    })
}
module.exports.modify = async (token, webhookid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Webhooks"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Webhooks"})
        if(!webhookid) return reject({code: require("../DB/errors.json")["36"].code, message: require("../DB/errors.json")["36"].message, file: "Webhooks"})
        if(!require("../Utils/functions").check_id(webhookid)) return reject({code: require("../DB/errors.json")["72"].code, message: require("../DB/errors.json")["72"].message, file: "Webhooks"})


        const url = `${baseurl}/webhooks/${webhookid}`
        const basedatas = await fetch(url, {method: "PATCH", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.modify(token, webhookid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Webhook"))({...datas, token: token}))
    })
}
module.exports.delete = async (token, webhookid) => {
    return new Promise(async (resolve, reject) => {
        if(!webhookid) return reject({code: require("../DB/errors.json")["36"].code, message: require("../DB/errors.json")["36"].message, file: "Webhooks"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Webhooks"})
        if(!require("../Utils/functions").check_id(webhookid)) return reject({code: require("../DB/errors.json")["72"].code, message: require("../DB/errors.json")["72"].message, file: "Webhooks"})
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        const url = `${baseurl}/webhooks/${webhookid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.delete(token, webhookid)
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
    })
}
module.exports.execute = async (token, webhook, options) => {//cp
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
            else return resolve(new (require("../Gestionnaires/Individual/Message"))(datas))
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
            else return resolve(new (require("../Gestionnaires/Individual/Message"))(datas))
        }
    }
}