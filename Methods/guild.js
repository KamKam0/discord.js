const verify = require("../Utils/verify")
module.exports.deleteinvite = async (token, inviteid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: inviteid, value_data: "id", data_name: "inviteid", order:2}, {value: bot, data_name: "bot", order: 3}], "DELETE", `invites/${inviteid}`, this.deleteinvite, "deleteinvite guild")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Invite"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.modify = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `guilds/${guildid}`, this.modify, "modify guild")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Guild"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.delete = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, data_name: "bot", order: 3}], "DELETE", `guilds/${guildid}`, this.delete, "delete guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.changechposition = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `guilds/${guildid}/channels`, this.changechposition, "changechposition guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.addmember = (token, guildid, userid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: userid, value_data: "id", data_name: "userid", order:3}, {value: options, data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "PUT", `guilds/${guildid}/members/${userid}`, this.addmember, "addmember guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modifymember = (token, guildid, userid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: userid, value_data: "id", data_name: "userid", order:3}, {value: options, data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/members/${userid}`, this.modifymember, "modifymember guild")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Member"))({...datas, token: token, guild_id: guildid}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.modifycurrentmember = (token, guildid, nick, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: nick, data_name: "nick", value_data: "id", order: 3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `guilds/${guildid}/members/@me`, this.modifycurrentmember, "modifycurrentmember guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.prune = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "POST", `guilds/${guildid}/prune`, this.prune, "prune guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getinvites = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, data_name: "bot", order: 3}], "GET", `guilds/${guildid}/invites`, this.getinvites, "getinvites guild")
        .then(datas => {
            const invites = new (require("../Gestionnaires/Multiple/Invites"))(bot)
            invites.AddInvites(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}
module.exports.getintegrations = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, data_name: "bot", order: 3}], "GET", `guilds/${guildid}/integrations`, this.getintegrations, "getintegrations guild")
        .then(datas => {
            const intergations = new (require("../Gestionnaires/Multiple/Integrations"))(guildid, bot)
            intergations.AddIntegrations(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}
module.exports.deleteintegration = (token, guildid, integrationid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: integrationid, value_data: "id", data_name: "integrationid", order: 3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `guilds/${guildid}/integrations/${integrationid}`, this.deleteintegration, "deleteintegration guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getwidgetsttings = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, data_name: "bot", order: 3}], "GET", `guilds/${guildid}/widget`, this.getwidgetsttings, "getwidgetsttings guild")
        .then(datas => resolve(new (require("../Event Result/WidgetSettings"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.getwidget = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: integrationid, value_data: "id", data_name: "integrationid", order: 3}, {value: bot, data_name: "bot", order: 4}], "GET", `guilds/${guildid}/widget.json`, this.getwidget, "getwidget guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getwidgetpng = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: integrationid, value_data: "id", data_name: "integrationid", order: 3}, {value: bot, data_name: "bot", order: 4}], "GET", `guilds/${guildid}/widget.png`, this.getwidgetpng, "getwidgetpng guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modifywidget = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `guilds/${guildid}/widget`, this.modifywidget, "modifywidget guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getvanity = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, data_name: "bot", order: 3}], "GET", `guilds/${guildid}/vanity-url`, this.getvanity, "getvanity guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getwelcomescreen = (token, guildid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: bot, data_name: "bot", order: 3}], "GET", `guilds/${guildid}/welcome-screen`, this.getwelcomescreen, "getwelcomescreen guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modifywelcomescreen = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: options, data_name: "options", order: 3}, {value: bot, data_name: "bot", order: 4}], "PATCH", `guilds/${guildid}/welcome-screen`, this.modifywelcomescreen, "modifywelcomescreen guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.modifyuservoice = (token, guildid, userid,  options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: guildid, value_data: "id", data_name: "guildid", order:2}, {value: userid, value_data: "id", data_name: "userid", order:3}, {value: options, data_name: "options", order: 4}, {value: bot, data_name: "bot", order: 5}], "PATCH", `guilds/${guildid}/voice-states/${userid}`, this.modifyuservoice, "modifyuservoice guild")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}