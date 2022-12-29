const BaseMember = require("../Gestionnaires/Multiple/Members")
class Members extends BaseMember{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    ban(ID, options){
        return new Promise((resolve, reject) => {
            require("../Methods/ban").ban(this._bot.discordjs.token, this.guild_id, ID, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    unban(ID){
        return new Promise((resolve, reject) => {
            require("../Methods/ban").unban(this._bot.discordjs.token, this.guild_id, ID, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Members