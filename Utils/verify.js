module.exports = async (args, method, urlc, fonction, name, baseinfo) => {
    return new Promise(async (resolve, reject) => {
        const errors = require("../DB/errors.json")
        const utils = require("./functions")
        const optionsVerify = require("./checkoptions")
        
        for (const num in args){
            if(!args[num].value && (String(args[num].required) === "true" || String(args[num].required) === "undefined")) return reject({code: errors["84"].code, message: errors["84"].message, file: name, variable: args[num].data_name})
            if(args[num].value){
                if(!args[num].type){
                    switch(args[num].data_name){
                        case("bot"):
                            args[num].type = ["function", "object"]
                        break
                        case("options"):
                            args[num].type = "object"
                        break
                        default:
                            args[num].type = "string"
                        break
                    }
                }
                if(Array.isArray(args[num].type)){
                    if(!args[num].type.includes("array")){
                        if(!args[num].type.includes(typeof args[num].value)) return reject({code: errors["85"].code, message: errors["85"].message+args[num].type, file: name, variable: args[num].data_name})
                    }else if(!args[num].type.includes(typeof args[num].value) && !Array.isArray(args[num].value)) return reject({code: errors["85"].code, message: errors["85"].message+args[num].type, file: name, variable: args[num].data_name})
                }else{
                    if(args[num].type !== "array"){
                        if(typeof args[num].value !== args[num].type) return reject({code: errors["85"].code, message: errors["85"].message+args[num].type, file: name, variable: args[num].data_name})
                    }else if(!Array.isArray(args[num].value)) return reject({code: errors["85"].code, message: errors["85"].message+args[num].type, file: name, variable: args[num].data_name})
                }
                if(args[num].value_data === "id" && !utils.check_id(args[num].value)) return reject({code: errors["86"].code, message: errors["86"].message, file: name, variable: args[num].data_name})
                if(args[num].value_data === "overwrite" && !utils.check_overwrites(args[num].value)) return reject({code: errors["60"].code, message: errors["60"].message, file: name, variable: args[num].data_name})
                if(args[num].data_name === "options" && args[num].checks && !optionsVerify(args[num])) return reject({code: errors["87"].code, message: errors["87"].message, file: name, variable: args[num].data_name}) 
            }
            if(!args[num].order && args[num].data_name !== "options") args[num].order = num
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
        if(["get", "delete"].includes(method.toLowerCase())) basedatas = await fetch(url, {method: method, headers}).catch(err => {})
        if(["post", "patch", "put"].includes(method.toLowerCase())){
            let options = args.find(e => e.data_name === "options")?.value
            if(options) basedatas = await fetch(url, {method: method, headers, body: JSON.stringify(options)}).catch(err => {})
            else basedatas = await fetch(url, {method: method, headers}).catch(err => {})
        }
        if(!basedatas) return reject(basedatas)
        else if(basedatas.status === 204) return resolve("Done Successfully")
        else if(basedatas.status === 200 || basedatas.status === 201){
            const datas = await basedatas.json()
            resolve(datas)
        }else{
            const datas = await basedatas.json()
            if(!datas || (datas.code && !datas.retry_after)) reject(createError(name, datas))
            else if(datas.retry_after){
                setTimeout(() => {
                    fonction(...args.filter(arg => arg.data_name !== "options" || (arg.data_name === "options" && arg.order)).sort((a, b) => a.order - b.order).map(arg => arg.value))
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