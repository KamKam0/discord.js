const User = require("./User")
class Ban{
    constructor(ban, bot){
        this.user = new User(ban.user, bot)
        this.user_id = ban.user.id
        this.reason = ban.reason ||  null
        this.guild_id = ban.guild_id || null
        this.guild = ban.guild || bot.guilds.get(this.guild_id) || null
        this.vguild_id = ban.guild ? ban.guild.vguild_id : null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }

    Modify_Datas(ban){
        let tocheck = Object.entries(ban)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    unban(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").unban(this.bot_token, this.guild.id, this.user.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Ban