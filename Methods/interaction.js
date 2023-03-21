const handler = require("../api/requests/handler")
const apiPath = require("../api/v10/member")
module.exports.reply = async (token, interaction, response, path, method, bot) => {//cp
    return new Promise(async (resolve, reject) => {
        const createError = require("../Utils/functions").createError
        const fetch = require("node-fetch")
        let baseinfos = require("../Utils/functions").getbaseinfosre(token)
        let baseurl = baseinfos["baseurl"]
        let baseheaders = baseinfos["baseheaders"]
        if(!token) return reject(createError("An error happened", {code: require("../DB/errors.json")["12"].code, message: require("../DB/errors.json")["12"].message, file: "Interaction"}))
        if(!interaction) return reject(createError("An error happened", {code: require("../DB/errors.json")["43"].code, message: require("../DB/errors.json")["43"].message, file: "Interaction"}))
        if(!response) return reject(createError("An error happened", {code: require("../DB/errors.json")["44"].code, message: require("../DB/errors.json")["44"].message, file: "Interaction"}))
        if(!interaction.id) return reject(createError("An error happened", {code: require("../DB/errors.json")["45"].code, message: require("../DB/errors.json")["45"].message, file: "Interaction"}))
        if(!interaction.token) return reject(createError("An error happened", {code: require("../DB/errors.json")["45"].code, message: require("../DB/errors.json")["45"].message, file: "Interaction"}))
        
        let  url = (method && path) ? path : `baseurl/interactions/${interaction.id}/${interaction.token}/callback`
        url = url.replace("baseurl", baseurl)
        const fun = require("../Utils/functions")
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
                    baseheaders = require("../Utils/functions").getbaseinfosrecp(token).baseheaders
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
    const createError = require("../Utils/functions").createError
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
        let check = this.VerifyInteraction(options)
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
        let check = this.VerifyInteraction(options)
        if(!check.status) return reject(check)
        verify([{value: token, data_name: "token", order:1}, {value: ID, value_data: "id", data_name: "ID", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "POST", `applications/${ID}/commands`, this.modifycommand, "modifycommand interaction")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {object} object 
 * @param {boolean} state 
 * @param {object[]} languages 
 * @returns 
 */
module.exports.VerifyInteraction = (object, state, languages) => {
    if(typeof object !== "object") return {errors: [{err: "invalid object"}], status: false}
    let first = check_command(object, state, languages)
    if(!first.status) return first
    if(object.options){
        let second = check_options(object, state, languages)
        if(!second.status) return second
        let third = check_choices(object, state, languages)
        if(!third.status) return third
    }
    return {status: true}
}

function check_command(object, state, languages){
    let error = []
    if(!object.name){
        error.push({err: "no name"})
        return {type: "command", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
    }
    if(object.name.length > 32) error.push({err: "name too long", cmd: object.name})
    if(state){
        languages.forEach(la => {
            const Des_Lan = la["Help"]
            if(!Des_Lan[`${object.name}_name`]) error.push({err: "no name", cmd: object.name, langue: la.Langue_Code})
            else if(Des_Lan[`${object.name}_name`].length > 32) error.push({err: "name too long", cmd: object.name, langue: la.Langue_Code, taille: Des_Lan[`${object.name}_name`].length})
            else if(Des_Lan[`${object.name}_name`].toLowerCase() !== Des_Lan[`${object.name}_name`]) error.push({err: "character in uppercase", cmd: object.name, langue: la.Langue_Code})
            else if(!(/^[\w-]{1,32}$/gm).test(Des_Lan[`${object.name}_name`])) error.push({err: "name does not match regex", cmd: object.name, langue: la.Langue_Code})
            if(!Des_Lan[`${object.name}_description`]) error.push({cmd: object.name, err: "no description", langue: la.Langue_Code})
            else if(Des_Lan[`${object.name}_description`].length > 99) error.push({cmd: object.name, err: "description too long", langue: la.Langue_Code, taille: Des_Lan[`${object.name}_description`].length})
            if(!Des_Lan[`${object.name}_exemple`]) error.push({cmd: object.name, err: "no exemple", langue: la.Langue_Code})
            if(!Des_Lan[`${object.name}_composition`] && !Des_Lan[`${object.name}_usage`]) error.push({cmd: object.name, err: "no usage and composition", langue: la.Langue_Code})
        })
    }else{
        if(!object.description) error.push({cmd: object.name, err: "no description"})
        else if(object.description.length > 99) error.push({cmd: object.name, err: "description too long", taille: object.description.length})
        
    }
    if(object.options && !Array.isArray(object.options)) error.push({err: "options invalid", cmd: object.name})
    if(object.options && object.options.length > 25) error.push({err: "trop d'options", taille: object.options.length, cmd: object.name})
    return {type: "command", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
}

function check_options(object, state, languages){
    let error = []
    object.options.forEach(option => {
        if(!option.name) error.push({err: "no option name", cmd: object.name})
        else{
            if(!option.name.length > 32) error.push({opt: option.name, err: "name too long", taille: option.name.length, cmd: object.name})
            if(!(/^[\w-]{1,32}$/gm).test(option.name)) error.push({opt: option.name, err: "name does not match regex", taille: option.name.length, cmd: object.name})
            if(state){
                languages.forEach(la => {
                    const Des_Lan = la["Options"]
                    if(!Des_Lan[`${object.name}_${option.name}_name`]) error.push({err: "no name", cmd: object.name, langue: la.Langue_Code, opt: option.name})
                    else if(Des_Lan[`${object.name}_${option.name}_name`].length > 32) error.push({err: "name too long", cmd: object.name, langue: la.Langue_Code, opt: option.name, taille: Des_Lan[`${object.name}_${option.name}_name`].length})
                    else if(Des_Lan[`${object.name}_${option.name}_name`].toLowerCase() !== Des_Lan[`${object.name}_${option.name}_name`]) error.push({err: "character in uppercase", cmd: object.name, langue: la.Langue_Code, opt: option.name})
                    else if(!(/^[\w-]{1,32}$/gm).test(Des_Lan[`${object.name}_${option.name}_name`])) error.push({err: "name does not match regex", cmd: object.name, langue: la.Langue_Code, opt: option.name})
                    if(!Des_Lan[`${object.name}_${option.name}_description`]) error.push({cmd: object.name, err: "no description", langue: la.Langue_Code, opt: option.name})
                    else if(Des_Lan[`${object.name}_${option.name}_description`].length > 99) error.push({cmd: object.name, err: "description too long", langue: la.Langue_Code, taille: Des_Lan[`${object.name}_${option.name}_description`].length, opt: option.name})
                })
            }else{
                if(!option.description) error.push({cmd: object.name, err: "no description", opt: option.name})
                else if(option.description.length > 99) error.push({cmd: object.name, err: "description too long", taille: option.description.length, opt: option.name})
            }
            if(!option.type) error.push({opt: option.name, err: "no type", cmd: object.name})
            else if(typeof option.type !== "number") error.push({opt: option.name, err: "type invalid", cmd: object.name})
            else if(![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(option.type)) error.push({opt: option.name, err: "type invalid", cmd: object.name})
            if(String(option.required) === "undefined") error.push({opt: option.name, err: "pas de required", cmd: object.name})
            else if(typeof option.required !== "boolean") error.push({opt: option.name, err: "required invalid", cmd: object.name})
            if(option.choices){
                if(!Array.isArray(option.choices)) error.push({opt: option.name, err: "choices invalid", cmd: object.name})
                else if(option.choices.length > 25) error.push({opt: option.name, err: "trop de choix", taille: option.choices.length, cmd: object.name})
                if(option.type !== 3 && option.choices.length !== 0) error.push({opt: option.name, err: "type not compatible with option", cmd: object.name})
            }
        }
    })
    return {type: "option", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
}

function check_choices(object, state, languages){
    let error = []
    object.options.filter(opi => opi.choices && opi.choices.length !== 0).forEach(option => {
        option.choices.forEach(choice => {
            if(!choice.name || choice.name.length === 0) error.push({opt: option.name, err: "no choice name", cmd: object.name})
            else{
                if(choice.name.length > 100) error.push({opt: option.name, err: "name choice too long", taille: choice.name.length, cho: choice.name, cmd: object.name})
                if(!(/^[\w-]{1,32}$/gm).test(choice.name)) error.push({opt: option.name, err: "name does not match regex", taille: choice.name.length, cho: choice.name, cmd: object.name})
                if(state){
                    languages.forEach(la => {
                        const Des_Lan = la["Choices"]
                        if(!Des_Lan[`${object.name}_${option.name}_${choice.name}_name`]) error.push({err: "no name", opt: option.name, cmd: object.name, langue: la.Langue_Code, choice: choice.name})
                        else if(Des_Lan[`${object.name}_${option.name}_${choice.name}_name`].length > 32) error.push({err: "name too long", opt: option.name, cmd: object.name, langue: la.Langue_Code, choice: choice.name, taille: Des_Lan[`${object.name}_${option.name}_${choice.name}_name`].length})
                        else if(!(/^[\w-]{1,32}$/gm).test(Des_Lan[`${object.name}_${option.name}_${choice.name}_name`])) error.push({err: "name does not match regex", opt: option.name, cmd: object.name, choice: choice.name, langue: la.Langue_Code})
                        else if(Des_Lan[`${object.name}_${option.name}_${choice.name}_name`].toLowerCase() !== Des_Lan[`${object.name}_${option.name}_${choice.name}_name`]) error.push({err: "character in uppercase", opt: option.name, cmd: object.name, langue: la.Langue_Code, choice: choice.name})
                    })
                }else{
                    
                }
                if(!choice.value) error.push({opt: option.name, err: "no choice value", cho: choice.name, cmd: object.name})
                else if(option.type === 3 && choice.value.length > 100) error.push({opt: option.name, err: "choice value too long", cho: choice.name, taille: choice.value.length, cmd: object.name})
            }
        })
    })
    return {type: "choice", errors: error.length === 0 ? null : error, status: error.length === 0 ? true : false}
}