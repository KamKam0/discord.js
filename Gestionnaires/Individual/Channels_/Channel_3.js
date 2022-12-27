const TetxBase = require("./Bases/textBase")
class Channel extends TetxBase{
    constructor(channel, bot){
        super(channel, bot)
        this.name = channel.name
        this.recipients = channel.recipients
        this.icon = channel.icon
        this.owner_id = channel.owner_id
    }

    addmember(userid, nick, accesstoken){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/dm").adduser(this.bot_token, this.id, userid, nick, accesstoken, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - addmember, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    removemember(userid){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/dm").removeuser(this.bot_token, this.id, userid, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - removemember, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Channel