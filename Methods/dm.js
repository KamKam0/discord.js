const verify = require("../Utils/verify")
module.exports.adduser = (token, channelid, userid, nick, accesstoken, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: nick, type: "string", data_name: "nick"}, {value: accesstoken, type: "string", data_name: "accesstoken"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: {access_token: accesstoken, nick: nick}, type: "object", data_name: "options"}, {value: userid, value_data: "id", type: "string", data_name: "userid"}], "PUT", `channels/${channelid}/recipients/${userid}`, this.adduser, "adduser dm")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}
module.exports.removeuser = (token, channelid, userid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, type: "string", data_name: "token"}, {value: channelid, value_data: "id", type: "string", data_name: "channelid"}, {value: userid, value_data: "id", type: "string", data_name: "userid"}], "DELETE", `channels/${channelid}/recipients/${userid}`, this.removeuser, "removeuser dm")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}