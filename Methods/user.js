const verify = require("../Utils/verify")

/**
 * 
 * @param {string} token 
 * @param {string} user 
 * @param {object} bot 
 * @returns 
 */
module.exports.createDM = async (token, user, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: user, value_data: "id", data_name: "user", order:2}, {value: {recipient_id: user}, data_name: "options"}, {value: bot, data_name: "bot", order: 3}], "POST", `users/@me/channels`, this.createDM, "createDM user")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Channels_/Channel_1"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {string} token 
 * @param {object[]} accesses 
 * @param {object[]} nicks 
 * @param {object} bot 
 * @returns
 */
module.exports.createGroup = async (token, accesses, nicks, bot) => {
    return new Promise(async (resolve, reject) => {
        verify([{value: token, data_name: "token", order:1}, {value: accesses, type: "array", data_name: "accesses", order:2}, {value: nicks, type: "array", data_name: "nicks", order:3}, {value: {access_tokens: accesses, nicks: nicks}, data_name: "options"}, {value: bot, data_name: "bot", order: 4}], "POST", `users/@me/channels`, this.createGroup, "createGroup user")
        .then(datas => resolve(new (require("../Gestionnaires/Individual/Channels_/Channel_1"))({...datas, token: token}, bot)))
        .catch(err => reject(err))
    })
}

/**
 * 
 * @param {object} bot 
 * @param {string} userid 
 * @param {object} options 
 * @returns 
 */
module.exports.send = async (bot, userid, options) => {
    return new Promise(async (resolve, reject) => {
        if(!options) return reject({code: require("../DB/errors.json")["8"].code, message: require("../DB/errors.json")["8"].message, file: "User"})
        if(!user) return reject({code: require("../DB/errors.json")["7"].code, message: require("../DB/errors.json")["7"].message, file: "User"})
        if(!bot) return reject({code: require("../DB/errors.json")["34"].code, message: require("../DB/errors.json")["34"].message, file: "User"})
        
        this.createDM(bot, userid)
        .catch(err => reject(err))
        .then(channel => {
            require("./message").send(bot, channel.id, options, undefined, undefined, bot)
            .catch(err => reject(err))
            .then(message => resolve(message))
        })
        
    })
}