const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/member")
const { checkApplicationCommand } = require("../utils/functions").checks

module.exports.reply = async (token, interaction, response, path, method, bot) => {//cp
    return new Promise(async (resolve, reject) => {
        const createError = require("../utils/functions").createError
        const fetch = require("node-fetch")
        let baseinfos = require("../utils/functions").getbaseinfosre(token)
        let baseurl = baseinfos["baseurl"]
        let baseheaders = baseinfos["baseheaders"]
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Interaction"}))
        if(!interaction) return reject(createError("An error happened", {code: require("../DB/errors.json")["43"].code, message: require("../DB/errors.json")["43"].message, file: "Interaction"}))
        if(!response) return reject(createError("An error happened", {code: require("../DB/errors.json")["44"].code, message: require("../DB/errors.json")["44"].message, file: "Interaction"}))
        if(!interaction.id) return reject(createError("An error happened", {code: require("../DB/errors.json")["45"].code, message: require("../DB/errors.json")["45"].message, file: "Interaction"}))
        if(!interaction.token) return reject(createError("An error happened", {code: require("../DB/errors.json")["45"].code, message: require("../DB/errors.json")["45"].message, file: "Interaction"}))
        
        let  url = (method && path) ? path : `baseurl/interactions/${interaction.id}/${interaction.token}/callback`
        url = url.replace("baseurl", baseurl)
        const fun = require("../utils/functions")
        let options = fun.analyse_data(response)
        if(!options) return reject(createError("An error happened", {code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "Interaction"}))
        if(typeof options !== "object") return reject(createError("An error happened", {code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Interaction"}))
        else{
            if(response.modal && !method) var basedatas = await fetch(url, {method: "POST", headers: baseheaders, body: JSON.stringify({type: 9, data: response.modal})})
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
                body.sticker_ids = checksstickers
                body.content = checkcontent
                if(response.ephemeral === true) body.flags = 64
                if(checkfiles && Array.isArray(checkfiles) === true && checkfiles[0]){
                    const FormData = require("form-data")
                    body_files = new FormData()
                    for(const file in checkfiles){
                        body_files.append(`files[${file}]`, checkfiles[file].buffer, `${checkfiles[file].name}.${checkfiles[file].extension}`);
                    }
                    baseheaders = require("../utils/functions").getbaseinfosrecp(token).baseheaders
                    baseheaders["Content-Type"] += body_files.getBoundary()
                    if(method !== "PATCH") body_files.append("payload_json", JSON.stringify({type: 4, data: body}));
                    else body_files.append("payload_json", JSON.stringify(body));
                    var basedatas = await fetch(url, {method: method || "POST", headers: baseheaders, body: body_files}).catch(err => {})
                }else if(!body.content && body.embeds.length === 0 && body.components.length === 0 && body.sticker_ids.length === 0) return reject(createError("An error happened", {code: require("../DB/errors.json")["74"].code, message: require("../DB/errors.json")["74"].message, file: "Interaction"}))
                if(!checkfiles || !Array.isArray(checkfiles) === true || !checkfiles[0]) {
                    if(method === "PATCH") var  basedatas = await fetch(url, {method: method || "POST", headers: baseheaders, body: JSON.stringify(body)}).catch(err => {})
                    else if (method === "POST" || !method) var basedatas = await fetch(url, {method: method || "POST", headers: baseheaders, body: JSON.stringify({type: 4, data: body})}).catch(err => {})
                }
            }
            if(basedatas.status === 204) return resolve("Done Successfully")
            else if (basedatas.status === 200){
                const datas = await basedatas.json()
                let messageClass = require("../Gestionnaires/Individual/Message")
                let message = new messageClass(datas, bot)
                return resolve(message)
            }
            else{
                const datas = await basedatas.json()
                if(datas && datas.retry_after){
                    setTimeout(() => {
                        this.reply(token, interaction, response, path, method, bot)
                        .catch(err => reject(createError("An error happened", err)))
                        .then(datas => resolve(datas))
                    }, datas.retry_after * 1000)
                }else return reject(createError("Une erreur s'est produite lors de la requête", datas))
            }
        }
    })
}
module.exports.modifyreply = async (token, ID, interaction, response, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!ID){
            let user = await require("../methods/me").getuser(token, bot)
            ID = user.id
        }

        this.reply(token, interaction, response, `baseurl/webhooks/${ID}/${interaction.token}/messages/@original`, "PATCH", bot)
        .catch(err => reject(err))
        .then(datas => resolve(datas))
        
    })
}
module.exports.deletereply = async (token, ID, interaction, bot) => {
    const createError = require("../utils/functions").createError
    return new Promise(async (resolve, reject) => {
        if(!ID){
            let user = await require("../methods/me").getuser(token, bot)
            ID = user.id
        }
        if(!interaction.id) return reject(createError("An error happened", {code: require("../DB/errors.json")["45"].code, message: require("../DB/errors.json")["45"].message, file: "Interaction"}))
        if(!interaction.token) return reject(createError("An error happened", {code: require("../DB/errors.json")["45"].code, message: require("../DB/errors.json")["45"].message, file: "Interaction"}))
        verify([{value: token, data_name: "token", order:1}, {value: ID, value_data: "id", data_name: "ID", order:2}, {value: interaction, type: "object", data_name: "interaction", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `webhooks/${ID}/${interaction.token}/messages/@original`, this.deletereply, "deletereply interaction")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

module.exports.getcommands = async (token, ID,  trueid, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!ID){
            let user = await require("../methods/me").getuser(token, bot)
            ID = user.id
        }
        verify([{value: token, data_name: "token", order:1}, {value: ID, value_data: "id", data_name: "ID", order:2}, {value: trueid, value_data: "id", data_name: "trueid", required: false, order:3}, {value: bot, data_name: "bot", order: 4}], "GET", `applications/${ID}/commands?with_localizations=true`, this.getcommands, "getcommands interaction")
        .then(datas => {
            if(trueid){
                if(datas.find(com => com.id === trueid)) return resolve(new (require("../Classes/ApplicationCommand")(datas.find(com => com.id === trueid), bot)))
                else return reject("No command found")
            }else{
                const commands = new (require("../Gestionnaires/Multiple/Commands"))(bot)
                commands._addMultiple(datas.map(da => { return {...da, token: token}}))
                return resolve(commands)
            }
        })
        .catch(err => reject(err))
    })
}
module.exports.deletecommand = async (token, ID,  interaction, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!ID){
            let user = await require("../methods/me").getuser(token, bot)
            ID = user.id
        }
        verify([{value: token, data_name: "token", order:1}, {value: ID, value_data: "id", data_name: "ID", order:2}, {value: interaction, value_data: "id", data_name: "interaction", order: 3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `applications/${ID}/commands/${interaction}`, this.deletecommand, "deletecommand interaction")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.createcommand = async (token, ID,  options, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!ID){
            let user = await require("../methods/me").getuser(token, bot)
            ID = user.id
        }
        let check = checkApplicationCommand(options)
        if(!check.status) return reject(check)
        verify([{value: token, data_name: "token", order:1}, {value: ID, value_data: "id", data_name: "ID", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `applications/${ID}/commands`, this.createcommand, "createcommand interaction")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modifycommand = async (token, ID,  options, bot) => {
    return new Promise(async (resolve, reject) => {
        if(!ID){
            let user = await require("../methods/me").getuser(token, bot)
            ID = user.id
        }
        let check = checkApplicationCommand(options)
        if(!check.status) return reject(check)
        verify([{value: token, data_name: "token", order:1}, {value: ID, value_data: "id", data_name: "ID", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `applications/${ID}/commands`, this.modifycommand, "modifycommand interaction")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}