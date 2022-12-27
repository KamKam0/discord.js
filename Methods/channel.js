const verify = require("../Utils/verify")
module.exports.modify = (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: options, type: "object", data_name: "options"}], "PATCH", `channels/${channelid}`, this.modify, "modify channel")
        .then(datas => resolve(new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.bulkdelete = (token, channelid, ids, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: {messages: ids}, type: "object", data_name: "options"}, {value: ids, type: "array", data_name: "ids"}], "PATCH", `channels/${channelid}/messages/bulk-delete`, this.bulkdelete, "bulkdelete channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getinvites = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}], "GET", `channels/${channelid}/invites`, this.getinvites, "getinvites channel")
        .then(datas => {
            const invites = new (require("../Gestionnaires/Multiple/Invites"))(bot)
            invites.AddInvites(datas.map(da => { return {...da, token: token}}))
            return resolve(invites)
        })
        .catch(err => reject(err))
    })
}
module.exports.createinvite = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: {}, type: "object", data_name: "options"}], "POST", `channels/${channelid}/invites`, this.createinvite, "createinvite channel")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Invite")({...datas, token: token}, bot))))
        .catch(err => reject(err))
    })
}
module.exports.editpermissions = (token, channelid, newoverwrite, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: newoverwrite, value_data: "overwrite", type: "array", data_name: "options"}], "PUT", `channels/${channelid}/permissions/${newoverwrite.id}`, this.editpermissions, "editpermissions channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.deletepermission = (token, channelid, overwrite, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: overwrite, value_data: "overwrite", type: "array", data_name: "overwrite"}], "DELETE", `channels/${channelid}/permissions/${overwrite.id}`, this.deletepermission, "deletepermission channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.follownews = (token, channelid, targetid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: targetid, value_data: "id", type: "string", data_name: "targetid"}, {value: {webhook_channel_id: targetid}, type: "object", data_name: "options"}], "POST", `channels/${channelid}/followers`, this.follownews, "follownews channel")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.getpins = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}], "POST", `channels/${channelid}/pins`, this.getpins, "getpins channel")
        .then(datas => {
            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
            messages.AddMessages(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}
module.exports.triggertyping = (token, channelid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}], "POST", `channels/${channelid}/typing`, this.triggertyping, "triggertyping channel")
        .then(datas => {
            const messages = new (require("../Gestionnaires/Multiple/Messages"))(bot)
            messages.AddMessages(datas.map(da => { return {...da, token: token}}))
            return resolve(datas)
        })
        .catch(err => reject(err))
    })
}
module.exports.create = (token, guildid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: guildid, value_data: "id", type: "string", data_name: "guildid"}, {value: options, value_data: "options", type: "object", data_name: "options"}], "POST", `guilds/${guildid}`, this.create, "create channel")
        .then(datas => resolve(new (require(`../Gestionnaires/Individual/Channels_/Channel_${datas.type}`)({...datas, token: token, guildid: guildid}, bot))))
        .catch(err => reject(err))
    })
}