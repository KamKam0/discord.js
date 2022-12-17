module.exports.create_withoutm = async (token, channelid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Threads"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Threads"})

        
        const url = `${baseurl}/channels/${channelid}/threads`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create_withoutm(token, channelid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Thread"))({...datas, token: token}))
    })
}
module.exports.create_withm = async (token, channelid, messageid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Threads"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Threads"})
        if(!messageid) return reject({code: require("../DB/errors.json")["3"].code, message: require("../DB/errors.json")["3"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(messageid)) return reject({code: require("../DB/errors.json")["69"].code, message: require("../DB/errors.json")["69"].message, file: "Threads"})


        const url = `${baseurl}/channels/${channelid}/messages/${messageid}/threads`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create_withm(token, channelid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Thread"))({...datas, token: token}))
    })
}
module.exports.jointhread = async (token, threadid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!threadid) return reject({code: require("../DB/errors.json")["6"].code, message: require("../DB/errors.json")["6"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(threadid)) return reject({code: require("../DB/errors.json")["73"].code, message: require("../DB/errors.json")["73"].message, file: "Threads"})
        const url = `${baseurl}/channels/${threadid}/thread-members/@me`
        const basedatas = await fetch(url, {method: "PUT", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.jointhread(token, threadid)
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
module.exports.addthreadmember = async (token, threadid, memberid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Threads"})
        if(!threadid) return reject({code: require("../DB/errors.json")["6"].code, message: require("../DB/errors.json")["6"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(threadid)) return reject({code: require("../DB/errors.json")["73"].code, message: require("../DB/errors.json")["73"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Threads"})
        const url = `${baseurl}/channels/${threadid}/thread-members/${memberid}`
        const basedatas = await fetch(url, {method: "PUT", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.addthreadmember(token, threadid, memberid)
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
module.exports.leavethread = async (token, threadid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!threadid) return reject({code: require("../DB/errors.json")["6"].code, message: require("../DB/errors.json")["6"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(threadid)) return reject({code: require("../DB/errors.json")["73"].code, message: require("../DB/errors.json")["73"].message, file: "Threads"})
        const url = `${baseurl}/channels/${threadid}/thread-members/@me`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.leavethread(token, threadid)
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
module.exports.removethreadmember = async (token, threadid, memberid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Threads"})
        if(!threadid) return reject({code: require("../DB/errors.json")["6"].code, message: require("../DB/errors.json")["6"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(threadid)) return reject({code: require("../DB/errors.json")["73"].code, message: require("../DB/errors.json")["73"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Threads"})
        const url = `${baseurl}/channels/${threadid}/thread-members/${memberid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.removethreadmember(token, threadid, memberid)
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
module.exports.create_tforum = (token, channelid, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Threads"})
        if(!channelid) return reject({code: require("../DB/errors.json")["2"].code, message: require("../DB/errors.json")["2"].message, file: "Threads"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Threads"})
        if(!require("../Utils/functions").check_id(channelid)) return reject({code: require("../DB/errors.json")["57"].code, message: require("../DB/errors.json")["57"].message, file: "Threads"})



        const url = `${baseurl}/channels/${channelid}/threads`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create_withoutm(token, channelid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Thread"))({...datas, token: token}))
    })
}