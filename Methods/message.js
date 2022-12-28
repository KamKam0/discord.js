module.exports.send = async (token, channelid, options, path, method, bot) => {//cp
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        let baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Message"})
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})

        let url = path ? path : `${baseurl}/channels/${channelid}/messages`
        const fun = require("../Utils/functions")
        options = fun.analyse_data(options)
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Message"})
        
        if(typeof options !== "object") return reject({code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Message"})
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
                baseheaders = require("../Utils/functions").getbaseinfosrecp(token).baseheaders
                baseheaders["Content-Type"] += body_files.getBoundary()
                body_files.append("payload_json", JSON.stringify(body))
            }else if(!body.content && body.embeds.length === 0 && body.components.length === 0 && body.sticker_ids.length === 0) return reject({code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Message"})
            const basedatas = await fetch(url, {method: method ? method : "POST", headers: baseheaders, body: body_files ? body_files : JSON.stringify(body)}).catch(err => {})
            console.log("message1")
            console.log(basedatas)
            console.log(method)
            console.log(path)
            console.log("message1")
            const datas = await basedatas.json()
            console.log("message")
            console.log(datas)
            console.log(method)
            console.log(path)
            console.log("message")
            if(!datas || datas.code || datas.retry_after){
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.send(token, channelid, options)
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
            else return resolve(new (require("../Gestionnaires/Individual/Message"))({...datas, token: token}, bot))
        }
    })
}
module.exports.modify = async (token, channelid, messageid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}`
        this.send(token, channelid, options, url, "PATCH")
        .catch(err => reject(err))
        .then(res => resolve(res))
    })
}
module.exports.fetch_messages = async (token, channelid, limit, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!limit || isNaN(limit) || Number(limit) < 1 || Number(limit) > 100){
            if(!isNaN(limit) && limit.length === 18) limit = {type: "sfetch", id: limit}
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
                        .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = err
                    reject(er)
                })
                        .then(datas => { 
                            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
                            messages.AddMessages(datas)
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
                messages.AddMessages(datas.map(da => { return {...da, token: token}}))
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
                        .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = err
                    reject(er)
                })
                        .then(datas => { 
                            const messages = new (require("../Gestionnaires/Individual/Messages"))(bot)
                            messages.AddMessages(datas)
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
                messages.AddMessages(datas.map(da => { return {...da, token: token}}))
                return resolve(messages)
            }
        }
        
    })
}
module.exports.crosspost = async (token, channelid, messageid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1},  {value: channelid, value_data: "id", data_name: "guildid", order:2},  {value: channelid, value_data: "id", data_name: "channelid", order:3},  {value: bot, type: "object", data_name: "bot", order: 4}], "POST", `channels/${channelid}/messages/${messageid}/crosspost`, this.crosspost, "crosspost message")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Message"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.delete = async (token, channelid, messageid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "DELETE", `channels/${channelid}/messages/${messageid}`, this.delete, "delete message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

module.exports.addreaction = async (token, channelid, messageid, emoji, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: emoji, data_name: "emoji", order:4}, {value: bot, type: "object", data_name: "bot", order: 5}], "PUT", `channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}/@me`, this.addreaction, "addreaction message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

module.exports.removereaction = async (token, channelid, messageid, emoji, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: emoji, data_name: "emoji", order:4}, {value: bot, type: "object", data_name: "bot", order: 5}], "DELETE", `channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}/@me`, this.removereaction, "removereaction message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.removeuserreaction = async (token, channelid, messageid, userid, emoji, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: userid, value_data: "id", data_name: "userid", order:4}, {value: emoji, data_name: "emoji", order:5}, {value: bot, type: "object", data_name: "bot", order: 6}], "DELETE", `channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}/${userid}`, this.removeuserreaction, "removeuserreaction message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.removeallreactions = async (token, channelid, messageid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "DELETE", `channels/${channelid}/messages/${messageid}/reactions`, this.removeallreactions, "removeallreactions message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.removeallreactionemoji = async (token, channelid, messageid, emoji, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: emoji, data_name: "emoji", order:4}, {value: bot, type: "object", data_name: "bot", order: 5}], "DELETE", `channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}`, this.removeallreactionemoji, "removeallreactionemoji message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.pin = async (token, channelid, messageid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "PUT", `channels/${channelid}/pins/${messageid}`, this.pin, "pin message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.unpin = async (token, channelid, messageid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "DELETE", `channels/${channelid}/pins/${messageid}`, this.unpin, "unpin message")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.fetch_reactions = async (token, channelid, messageid, bot) => {
    return new Promise(async (resolve, reject) => {
        this.fetch_messages(token, channelid, messageid, bot)
        .catch(err => reject(err))
        .then(datas => resolve(datas.reactions))
    })
}
module.exports.fetch_reaction = async (token, channelid, messageid, emoji, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: emoji, data_name: "emoji", order:4}, {value: bot, type: "object", data_name: "bot", order: 5}], "GET", `channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}`, this.fetch_reaction, "fetch_reaction message")
        .then(datas => {
            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
            messages.AddMessages(datas.map(da => { return {...da, token: token}}))
            return resolve(messages)
        })
        .catch(err => reject(err))
    })
}