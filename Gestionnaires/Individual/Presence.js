class Presence{
    constructor(presence, bot){
        this.user_id = presence.user ? presence.user.id : presence.user_id
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.guild = presence.guild || bot.guilds.get(presence.guild_id) || null
        this.guild_id = presence.guild_id
        this.bot_token = bot.discordjs.token
        this.status = presence.status || null
        this.activities = presence.activities || []
        this.client_status = presence.client_status
        this._bot = bot
    }

    __Modify_Datas(presence){
        let tocheck = Object.entries(presence)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }
}
module.exports = Presence