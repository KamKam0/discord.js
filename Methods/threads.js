module.exports.create_withoutm = async (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: options, type: "object", data_name: "options", order: 3}, {value: bot, type: "object", data_name: "bot", order: 4}], "POST", `channels/${channelid}/threads`, this.create_withoutm, "create_withoutm threads")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Thread"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.create_withm = async (token, channelid, messageid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: messageid, value_data: "id", data_name: "messageid", order:3}, {value: options, type: "object", data_name: "options", order: 4}, {value: bot, type: "object", data_name: "bot", order: 5}], "POST", `channels/${channelid}/messages/${messageid}/threads`, this.create_withm, "create_withm threads")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Thread"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}
module.exports.jointhread = async (token, threadid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: bot, type: "object", data_name: "bot", order: 3}], "PUT", `channels/${threadid}/thread-members/@me`, this.jointhread, "jointhread threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.addthreadmember = async (token, threadid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "PUT", `channels/${threadid}/thread-members/${memberid}`, this.addthreadmember, "addthreadmember threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.leavethread = async (token, threadid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: bot, type: "object", data_name: "bot", order: 3}], "DELETE", `channels/${threadid}/thread-members/@me`, this.leavethread, "leavethread threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.removethreadmember = async (token, threadid, memberid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: memberid, value_data: "id", data_name: "memberid", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "DELETE", `channels/${threadid}/thread-members/${memberid}`, this.removethreadmember, "removethreadmember threads")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.create_tforum = (token, channelid, options, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: threadid, value_data: "id", data_name: "threadid", order:2}, {value: options, type: "object", data_name: "options", order:3}, {value: bot, type: "object", data_name: "bot", order: 4}], "POST", `channels/${channelid}/threads`, this.create_tforum, "create_tforum threads")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Thread"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}