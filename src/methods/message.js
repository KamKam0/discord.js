const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/message")
const emojiApiPath = require("../api/v10/reaction")

module.exports.send = async (token, channelid, options, path, method, bot) => {//cp
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        let baseheaders = baseinfos["baseheaders"]
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"}))
        if(!channelid) return reject(createError("An error happened", {code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"}))
        if(!require("../utils/functions").check_id(channelid)) return reject(createError("An error happened", {code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"}))
        if(!options) return reject(createError("An error happened", {code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Message"}))
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"}))

        let url = path ? path : `${baseurl}/channels/${channelid}/messages`
        const fun = require("../utils/functions")
        options = fun.analyse_data(options)
        if(!options) return reject(createError("An error happened", {code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Message"}))
        
        if(typeof options !== "object") return reject(createError("An error happened", {code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Message"}))
        else{
            let body = {}
            let body_files;
            let checksembed = fun.check_embed(options.embeds)
            let checkscompo = fun.check_components(options.components)
            let checksstickers = fun.check_stickers(options.sticker_ids)
            let checkcontent = fun.check_content(options.content)
            let checkfiles = fun.check_files(options.files)
            let checkref = fun.check_reference(options.message_reference)
            body.message_reference = checkref
            body.embeds = checksembed
            body.components = checkscompo
            if(!method) body.sticker_ids = checksstickers
            body.content = checkcontent
            if(checkfiles && Array.isArray(checkfiles) === true && checkfiles[0]){
                const FormData = require("form-data")
                body_files = new FormData()
                for(const file in checkfiles){
                    body_files.append(`files[${file}]`, checkfiles[file].buffer, `${checkfiles[file].name}.${checkfiles[file].extension}`);
                }
                baseheaders = require("../utils/functions").getbaseinfosrecp(token).baseheaders
                baseheaders["Content-Type"] += body_files.getBoundary()
                body_files.append("payload_json", JSON.stringify(body))
            }else if(!body.content && body.embeds.length === 0 && body.components.length === 0 && body.sticker_ids.length === 0) return reject(createError("An error happened", {code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Message"}))
            const basedatas = await fetch(url, {method: method ? method : "POST", headers: baseheaders, body: body_files ? body_files : JSON.stringify(body)}).catch(err => {})

            let datas;
            try{
                datas = await basedatas.json()
            }catch(err){
                this.send(token, channelid, options, path, method, bot)
                .catch(err => reject(err))
                .then(datas => resolve(datas))
            }
  
            if(!datas || datas.code || datas.retry_after){
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.send(token, channelid, options, path, method, bot)
                        .catch(err => reject(createError("An error happened", err)))
                        .then(datas => resolve(datas))
                    }, datas.retry_after * 1000)
                }else return reject(createError("Une erreur s'est produite lors de la requête", datas))
            }
            else return resolve(new (require("../Gestionnaires/Individual/Message"))({...datas, token: token}, bot))
        }
    })
}

module.exports.modify = async (token, channelid, messageid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!messageid) return reject(createError("An error happened", {code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"}))
        if(!require("../utils/functions").check_id(channelid)) return reject(createError("An error happened", {code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"}))
        
        let baseinfos = require("../utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}`
        this.send(token, channelid, options, url, "PATCH", bot)
        .catch(err => reject(err))
        .then(res => resolve(res))
    })
}

module.exports.fetch_messages = async (token, channelid, limit, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"}))
        if(!channelid) return reject(createError("An error happened", {code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"}))
        if(!require("../utils/functions").check_id(channelid)) return reject(createError("An error happened", {code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"}))
        if(!limit || isNaN(limit) || Number(limit) < 1 || Number(limit) > 100){
            if(!isNaN(limit) && limit.length >= 22) limit = {type: "sfetch", id: limit}
            else limit = {type: "gfetch", number: limit}
        }else limit = {type: "gfetch", number: limit}
        if(limit.type === "sfetch"){
            const url = `${baseurl}/channels/${channelid}/messages/${limit.id}`
            const basedatas = await fetch(url, {method: "GET", headers: baseheaders}).catch(err => {})
            const datas = await basedatas.json()
            if(!datas || datas.code || datas.retry_after){
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.fetch_messages(token, channelid, limit)
                        .catch(err => reject(err))
                        .then(datas => { 
                            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
                            messages._addMultiple(datas)
                            return resolve(messages)
                        })
                    }, datas.retry_after * 1000)
                }else{
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = datas
                    return reject(er)
                }
            }
            else{
                const messages = new (require("../Gestionnaires/Individual/Messages"))(bot)
                messages._addMultiple(datas.map(da => { return {...da, token: token}}))
                return resolve(messages)
            }
        }else{
            const url = `${baseurl}/channels/${channelid}/messages?limit=${limit.number}`
            const basedatas = await fetch(url, {headers: baseheaders}).catch(err => {})
            const datas = await basedatas.json()
            if(!datas || datas.code || datas.retry_after){
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.fetch_messages(token, channelid, limit)
                        .catch(err => reject(err))
                        .then(datas => { 
                            const messages = new (require("../Gestionnaires/Individual/Messages"))(bot)
                            messages._addMultiple(datas)
                            return resolve(messages)
                        })
                    }, datas.retry_after * 1000)
                }else{
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = datas
                    return reject(er)
                }
            }
            else{
                const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
                messages._addMultiple(datas.map(da => { return {...da, token: token}}))
                return resolve(messages)
            }
        }
        
    })
}

module.exports.crosspost = async (informations) => {
    let passedOptions = {
        method: apiPath.crosspost.method,
        token: informations.botToken,
        url: apiPath.crosspost.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const single = require("../structures/singles/message")
        let newData = new single(data, informations.bot)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}

module.exports.delete = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.method,
        token: informations.botToken,
        url: apiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.addreaction = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.create.method,
        token: informations.botToken,
        url: emojiApiPath.create.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.removereaction = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.method,
        token: informations.botToken,
        url: emojiApiPath.delete.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.removeuserreaction = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.user.method,
        token: informations.botToken,
        url: emojiApiPath.delete.user.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.removeallreactions = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.all.method,
        token: informations.botToken,
        url: emojiApiPath.delete.all.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.removeallreactionemoji = async (informations) => {
    let passedOptions = {
        method: emojiApiPath.delete.allOfOne.method,
        token: informations.botToken,
        url: emojiApiPath.delete.allOfOne.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.pin = async (informations) => {
    let passedOptions = {
        method: apiPath.create.pin.method,
        token: informations.botToken,
        url: apiPath.create.pin.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.unpin = async (informations) => {
    let passedOptions = {
        method: apiPath.delete.pin.method,
        token: informations.botToken,
        url: apiPath.delete.pin.url,
        urlIDS: informations
    }
    let args = [ ]
    return handler(args, passedOptions, null, null)
}

module.exports.fetch_reactions = async (token, channelid, messageid, bot) => {//à tester
    return new Promise(async (resolve, reject) => {
        this.fetch_messages(token, channelid, messageid, bot)
        .catch(err => reject(err))
        .then(datas => resolve(datas.reactions))
    })
}

module.exports.fetch_reaction = async (informations) => {//encodeURIComponent(emoji)//à tester
    let passedOptions = {
        method: emojiApiPath.get.listOne.method,
        token: informations.botToken,
        url: emojiApiPath.get.listOne.url,
        urlIDS: informations
    }
    let args = [ ]
    let callBackSuccess = function (data){
        const multiple = require("../structures/managers/messages")
        let newData = new multiple(informations.bot)
        newData._addMultiple(data)
        return newData
    }
    return handler(args, passedOptions, callBackSuccess, null)
}