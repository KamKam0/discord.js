const User = require("../../structures/singles/user")
const guildBase = require("../../structures/bases/baseguild")

class Unban extends guildBase{
    constructor(ban, bot){
        super(ban, bot)
        this.user = new User(ban.user, bot)
        this.user_id = ban.user.id || null
    }

    _Modify_Datas(ban){
        let tocheck = Object.entries(ban)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    ban(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return require("../../methods/ban").ban(informations, options)
    }
}
module.exports = Unban