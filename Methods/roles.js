module.exports.add = async (token, guildid, roleid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Roles"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Roles"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Roles"})
        if(!roleid) return reject({code: require("../DB/errors.json")["5"].code, message: require("../DB/errors.json")["5"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(roleid)) return reject({code: require("../DB/errors.json")["70"].code, message: require("../DB/errors.json")["70"].message, file: "Roles"})
        const url = `${baseurl}/guilds/${guildid}/members/${memberid}/roles/${roleid}`
        const basedatas = await fetch(url, {method: "PUT", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.add(token, guildid, roleid, memberid)
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
module.exports.remove = async (token, guildid, roleid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Roles"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Roles"})
        if(!memberid) return reject({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Roles"})
        if(!roleid) return reject({code: require("../DB/errors.json")["5"].code, message: require("../DB/errors.json")["5"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(memberid)) return reject({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(roleid)) return reject({code: require("../DB/errors.json")["70"].code, message: require("../DB/errors.json")["70"].message, file: "Roles"})
        const url = `${baseurl}/guilds/${guildid}/members/${memberid}/roles/${roleid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.remove(token, guildid, roleid, memberid)
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
module.exports.delete = async (token, guildid, roleid, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Roles"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Roles"})
        if(!roleid) return reject({code: require("../DB/errors.json")["5"].code, message: require("../DB/errors.json")["5"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(roleid)) return reject({code: require("../DB/errors.json")["70"].code, message: require("../DB/errors.json")["70"].message, file: "Roles"})
        const url = `${baseurl}/guilds/${guildid}/roles/${roleid}`
        const basedatas = await fetch(url, {method: "DELETE", headers: baseheaders}).catch(err => {})
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else{
            const datas = await basedatas.json()
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.delete(token, guildid, roleid)
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
module.exports.create = async (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Roles"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Roles"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Roles"})
        let list = ["DEFAULT", "AQUA","BLUE","DARK","DEFAULT","FUCHSIA","GOLD","GREEN","GREY","NAVY","ORANGE","PURPLE","RANDOM","RED","WHITE","YELLOW"]
        if(!list.includes(options.color) && require("../Utils/functions").check_color(options.color) === false) color = "GREY"
        if(list.includes(options.color)) options.color = require("../constants").Colors[options.color]

        else options.color = parseInt(options.color.replace('#', ''), 16)
        const url = `${baseurl}/guilds/${guildid}/roles`
        const basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.create(token, guildid, options)
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
        else return resolve(new (require("../Gestionnaires/Individual/Role"))({...datas, token: token, guild_id: guildid}, bot))
    })
}
module.exports.changepositions = async (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Roles"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Roles"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Roles"})


        const url = `${baseurl}/guilds/${guildid}/roles`
        const basedatas = await fetch(url, {method: "PATCH", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.changepositions(token, guildid, options)
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
        }else return resolve(datas)
    })
}
module.exports.modify = async (token, guildid, roleid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        const baseurl = baseinfos["baseurl"]
        const baseheaders = baseinfos["baseheaders"]
        if(!token) return reject({code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Roles"})
        if(!guildid) return reject({code: require("../DB/errors.json")["1"].code, message: require("../DB/errors.json")["1"].message, file: "Roles"})
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Roles"})
        if(!roleid) return reject({code: require("../DB/errors.json")["5"].code, message: require("../DB/errors.json")["5"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(guildid)) return reject({code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "Roles"})
        if(!require("../Utils/functions").check_id(roleid)) return reject({code: require("../DB/errors.json")["70"].code, message: require("../DB/errors.json")["70"].message, file: "Roles"})

        
        const url = `${baseurl}/guilds/${guildid}/roles/${roleid}`
        const basedatas = await fetch(url, {method: "PATCH", headers: baseheaders, body: JSON.stringify(options)}).catch(err => {})
        const datas = await basedatas.json()
        if(!datas || datas.code || datas.retry_after){
            if(datas && datas.retry_after){
                setTimeout(() => {
                    this.modify(token, guildid, roleid, options)
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
        }else return resolve(new (require("../Gestionnaires/Individual/Role"))({...datas, token: token, guild_id: guildid}, bot))
    })
}