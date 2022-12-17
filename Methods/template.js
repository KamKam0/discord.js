module.exports.create = (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})
        const url = `${baseurl}/guilds/${guildid}/templates`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create(token, guildid)
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
        else return resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}))
    })
}
module.exports.delete = (token, guildid, templatecode) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!templatecode) return reject({code: require("../DB/errors.json")["31"].code, message: require("../DB/errors.json")["31"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})
        const url = `${baseurl}/guilds/${guildid}/templates/${templatecode}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "DELETE"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.delete(token, guildid, templatecode)
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
        else return resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}))
    })
}
module.exports.get = (token, guildid, templatecode) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!templatecode) return reject({code: require("../DB/errors.json")["31"].code, message: require("../DB/errors.json")["31"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})
        const url = `${baseurl}/guilds/${guildid}/templates/${templatecode}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.get(token, guildid, templatecode)
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
        else return resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}))
    })
}
module.exports.getall = (token, guildid) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})
        const url = `${baseurl}/guilds/${guildid}/templates`
        const basedatas = await fetch(url, {headers: baseheaders, method: "GET"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.getall(token, guildid)
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
            const templates = new (require("../Gestionnaires/Multiple/Templates"))()
            templates.AddTemplates(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        }
    })
}
module.exports.createguild = (token, guildid, templatecode, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!templatecode) return reject({code: require("../DB/errors.json")["31"].code, message: require("../DB/errors.json")["31"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})

        const url = `${baseurl}/guilds/${guildid}/templates/${templatecode}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "POST", boyd: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.createguild(token, guildid, templatecode)
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
        else return resolve(new (require("../Gestionnaires/Individual/Guild"))({...datas, token: token}))
    })
}
module.exports.sync = (token, guildid, templatecode) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!templatecode) return reject({code: require("../DB/errors.json")["31"].code, message: require("../DB/errors.json")["31"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})
        const url = `${baseurl}/guilds/${guildid}/templates/${templatecode}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PUT"}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.sync(token, guildid, templatecode)
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
        else return resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}))
    })
}
module.exports.modify = (token, guildid, templatecode, options) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Template"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Template"})
        if(!templatecode) return reject({code: require("../DB/errors.json")["31"].code, message: require("../DB/errors.json")["31"].message, file: "Template"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Template"})

        
        const url = `${baseurl}/guilds/${guildid}/templates/${templatecode}`
        const basedatas = await fetch(url, {headers: baseheaders, method: "PATCH", boyd: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.modify(token, guildid, templatecode)
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
        else return resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}))
    })
}