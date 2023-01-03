const verify = require("../Utils/verify")

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {string} userid 
 * @param {string} nick 
 * @param {string} accesstoken 
 * @param {object} bot 
 * @returns 
 */
module.exports.adduser = (token, channelid, userid, nick, accesstoken, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: nick, data_name: "nick", order:4}, {value: accesstoken, data_name: "accesstoken", order:5}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: {access_token: accesstoken, nick: nick}, data_name: "options"}, {value: userid, value_data: "id", data_name: "userid", order:3}, {value: bot, data_name: "bot", order: 6}], "PUT", `channels/${channelid}/recipients/${userid}`, this.adduser, "adduser dm")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {string} channelid 
 * @param {string} userid 
 * @param {object} bot 
 * @returns 
 */
module.exports.removeuser = (token, channelid, userid, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: channelid, value_data: "id", data_name: "channelid", order:2}, {value: userid, value_data: "id", data_name: "userid", order:3}, {value: bot, data_name: "bot", order: 4}], "DELETE", `channels/${channelid}/recipients/${userid}`, this.removeuser, "removeuser dm")
        .then(datas => resolve(datas))
        .catch(err => reject(err))
    })
}