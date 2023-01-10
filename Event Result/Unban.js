const User = require("../Gestionnaires/Individual/User")
class Unban{
    constructor(ban, bot){
        this.guild_id = ban.guild_id || null
        this.guild = ban.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.user = new User({...ban.user, token: this.bot_token}, bot)
        this.user_id = ban.user.id || null
        this._bot = bot
    }

    __Modify_Datas(ban){
        let tocheck = Object.entries(ban)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    ban(options){
        return new Promise((resolve, reject) => {
            require("../Methods/ban").ban(this.bot_token, this.guild.id, this.user.id, options)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Unban