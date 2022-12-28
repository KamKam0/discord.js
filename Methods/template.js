module.exports.create = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, type: "object", data_name: "bot", order: 3}], "POST", `guilds/${guildid}/templates`, this.create, "create template")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.delete = (token, guildid, templatecode, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: templatecode, data_name: "templatecode", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/templates/${templatecode}`, this.delete, "delete template")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.get = (token, guildid, templatecode, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: templatecode, data_name: "templatecode", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "GET", `guilds/${guildid}/templates/${templatecode}`, this.get, "get template")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.getall = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, type: "object", data_name: "bot", order: 3}], "GET", `guilds/${guildid}/templates`, this.getall, "getall template")
        .then(datas => {
            const templates = new (require("../Gestionnaires/Multiple/Templates"))(bot)
            templates.AddTemplates(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}
module.exports.createguild = (token, guildid, templatecode, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: templatecode, data_name: "templatecode", order:3}, {value: options, type: "object", data_name: "options", order: 4}, {value: bot, type: "object", data_name: "bot", order: 5}], "POST", `guilds/${guildid}/templates/${templatecode}`, this.createguild, "createguild template")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Guild"))(bot, {...datas, token: token})))
        .catch(err => reject(err))
    })
}
module.exports.sync = (token, guildid, templatecode, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: templatecode, data_name: "templatecode", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "PUT", `guilds/${guildid}/templates/${templatecode}`, this.sync, "sync template")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.modify = (token, guildid, templatecode, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: templatecode, data_name: "templatecode", order:3}, {value: options, type: "object", data_name: "options", order: 4}, {value: bot, type: "object", data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/templates/${templatecode}`, this.modify, "modify template")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Template"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}