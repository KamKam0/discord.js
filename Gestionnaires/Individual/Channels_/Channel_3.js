const TetxBase = require("./Bases/textBase")
class Channel extends TetxBase{
    constructor(channel, bot){
        super(channel, bot)
        this.name = channel.name
        this.recipients = channel.recipients
        this.icon = channel.icon
        this.owner_id = channel.owner_id
    }

    /**
     * 
     * @param {string} userid 
     * @param {string} nick 
     * @param {string} accesstoken 
     * @returns 
     */
    addmember(userid, nick, accesstoken){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/dm").adduser(this.bot_token, this.id, userid, nick, accesstoken, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} userid 
     * @returns 
     */
    removemember(userid){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/dm").removeuser(this.bot_token, this.id, userid, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}
module.exports = Channel