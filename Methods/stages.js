const verify = require("../Utils/verify")
module.exports.create = (token, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: options, data_name: "options", order:2}, {value: bot, data_name: "bot", order: 3}], "POST", `stage-instances`, this.create, "create role")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/StageInstance"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.modify = (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: options, data_name: "options", order:3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `stage-instances/${channelid}`, this.modify, "modify role")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/StageInstance"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.delete = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: bot, data_name: "bot", order: 3}], "DELETE", `stage-instances/${channelid}`, this.delete, "delete role")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}