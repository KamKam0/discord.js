module.exports.send = async (token, channelid, options, path, method) => {//cp
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
            else return resolve(new (require("../Gestionnaires/Individual/Message"))({...datas, token: token}))
        }
    })
}
module.exports.modify = async (token, channelid, messageid, options) => {
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
module.exports.crosspost = async (token, channelid, messageid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/crosspost`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.crosspost(token, channelid, messageid)
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
        else return resolve(new (require("../Gestionnaires/Individual/Message"))({...datas, token: token}))
    })
}
module.exports.fetch_messages = async (token, channelid, limit) => {
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
                            const messages = new (require("../Gestionnaires/Multiple/Messages"))()
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
                const messages = new (require("../Gestionnaires/Individual/Messages"))()
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
                            const messages = new (require("../Gestionnaires/Individual/Messages"))()
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
                const messages = new (require("../Gestionnaires/Multiple/Messages"))()
                messages.AddMessages(datas.map(da => { return {...da, token: token}}))
                return resolve(messages)
            }
        }
        
    })
}
module.exports.delete = async (token, channelid, messageid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.delete(token, channelid, messageid)
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

module.exports.addreaction = async (token, channelid, messageid, emoji) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!emoji) return reject({code: require("../DB/errors.json")["25"].code, message: require("../DB/errors.json")["25"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}/@me`
        const basedatas = await fetch(url, {method: "PUT", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.addreaction(token, channelid, messageid, emoji)
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

module.exports.removereaction = async (token, channelid, messageid, emoji) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!emoji) return reject({code: require("../DB/errors.json")["25"].code, message: require("../DB/errors.json")["25"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}/@me`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.removereaction(token, channelid, messageid, emoji)
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
module.exports.removeuserreaction = async (token, channelid, messageid, userid, emoji) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!emoji) return reject({code: require("../DB/errors.json")["25"].code, message: require("../DB/errors.json")["25"].message, file: "Message"})
        if(!userid) return reject({code: require("../DB/errors.json")["7"].code, message: require("../DB/errors.json")["7"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(userid)) return reject({code: require("../DB/errors.json")["47"].code, message: require("../DB/errors.json")["47"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}/${userid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.removeuserreaction(token, channelid, messageid, userid, emoji)
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
module.exports.removeallreactions = async (token, channelid, messageid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/reactions`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.removeallreactions(token, channelid, messageid)
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
module.exports.removeallreactionemoji = async (token, channelid, messageid, emoji) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!emoji) return reject({code: require("../DB/errors.json")["25"].code, message: require("../DB/errors.json")["25"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.removeallreactionemoji(token, channelid, messageid, emoji)
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
module.exports.pin = async (token, channelid, messageid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/pins/${messageid}`
        const basedatas = await fetch(url, {method: "PUT", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.pin(token, channelid, messageid)
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
module.exports.unpin = async (token, channelid, messageid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/pins/${messageid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.pin(token, channelid, messageid)
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
module.exports.fetch_reactions = async (token, channelid, messageid) => {
    return new Promise(async (resolve, reject) => {
        this.fetch_messages(token, channelid, messageid)
        .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête")
                    er.content = err
                    reject(er)
                })
        .then(datas => {
            return resolve(datas.reactions)
        })
    })
}
module.exports.fetch_reaction = async (token, channelid, messageid, emoji) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Message"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Message"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Message"})
        if(!emoji) return reject({code: require("../DB/errors.json")["25"].code, message: require("../DB/errors.json")["25"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Message"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Message"})
        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/reactions/${encodeURIComponent(emoji)}`
        const basedatas = await fetch(url, {method: "GET", headers: baseheaders}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.fetch_reaction(token, channelid, messageid, emoji)
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
            const messages = new (require("../Gestionnaires/Multiple/Messages"))()
            messages.AddMessages(datas.map(da => { return {...da, token: token}}))
            return resolve(messages)
        }
    })
}