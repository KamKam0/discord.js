class Presence{
    constructor(presence, bot){
        this.user_id = presence.user ? presence.user.id : presence.user_id
        this.user = presence.user || null
        this.guild = presence.guild || null
        this.guild_id = presence.guild_id
        this.bot_token = presence.token
        this.status = presence.status || null
        this.activities = presence.activities || []
        this.client_status = presence.client_status
        this.vguild_id = presence.guild ? presence.guild.vguild_id : null
        this._bot = bot
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(presence){
        let tocheck = Object.entries(presence)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }
}
module.exports = Presence