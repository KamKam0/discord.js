module.exports = async (args, method, urlc, fonction, name, baseinfo) => {
    return new Promise(async (resolve, reject) => {
        const errors = require("../DB/errors.json")
        const utils = require("./functions")
    
        for (const arg of args){
            if(!arg.value && (String(arg.required) === "true" || String(arg.required) === "undefined")) return reject({code: errors["84"].code, message: errors["84"].message, file: name, variable: arg.data_name})
            if(arg.value){
                if(arg.type !== "array"){
                    if(typeof arg.value !== arg.type) return reject({code: errors["85"].code, message: errors["85"].message+arg.type, file: name, variable: arg.data_name})
                }else if(!Array.isArray(arg.value)) return reject({code: errors["85"].code, message: errors["85"].message+arg.type, file: name, variable: arg.data_name})
                if(arg.value_data === "id" && !utils.check_id(arg.value)) return reject({code: errors["86"].code, message: errors["86"].message, file: name, variable: arg.data_name})
                if(arg.value_data === "overwrite" && !utils.check_overwrites(arg.value)) return reject({code: errors["60"].code, message: errors["60"].message, file: name, variable: arg.data_name})
            }
        }

        const fetch = require("node-fetch")

        let baseinfos;
        if(!baseinfo) baseinfos = require("../Utils/functions").getbaseinfosre(args.find(e => e.data_name === "token").value)
        if(baseinfo === "cp") baseinfos = require("../Utils/functions").getbaseinfosrecp(args.find(e => e.data_name === "token").value)
        if(baseinfo === "xww") baseinfos = require("../Utils/functions").getbaseinfosre_xww(args.find(e => e.data_name === "token").value)
        const baseurl = baseinfos["baseurl"]
        const headers = baseinfos["baseheaders"]
    
        const url = `${baseurl}/${urlc}`
        let basedatas;
        if(["get", "delete"].includes(method.toLowerCase())) basedatas = await fetch(url, {method, headers}).catch(err => {})
        if(["post", "patch", "put"].includes(method.toLowerCase())){
            let options = args.find(e => e.data_name === "options")?.value
            if(options) basedatas = await fetch(url, {method, headers, body: JSON.stringify(options)}).catch(err => {})
            else basedatas = await fetch(url, {method, headers}).catch(err => {})
        }
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else if(basedatas.status === 200 || basedatas.status === 201){
            const datas = await basedatas.json()
            resolve(datas)
        }else{
            const datas = await basedatas.json()
            if(!datas || (datas.code && !datas.retry_after)) reject(createError(name, err))
            else if(datas.retry_after){
                setTimeout(() => {
                    fonction(...args.map(arg => arg.value))
                    .catch(err => reject(createError(name, err)))
                    .then(datas => resolve(datas))
                }, datas.retry_after * 1000)
            }
        }
    })
}

function createError(name, error){
    let er = new Error(`Une erreur s'est produite lors de la requête - ${name}`)
    er.content = error
    return er
}