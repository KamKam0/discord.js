class Emoji{
    constructor(emoji, bot){
        this.id = emoji.id
        this.name = emoji.name
        this.roles_ids = emoji.roles || []
        this.require_colons = emoji.require_colons || null
        this.managed = emoji.managed ?? false
        this.animated = emoji.animated ?? false
        this.available = emoji.available ?? true
        this.guild = emoji.guild || null
        this.guild_id = emoji.guild_id
        this.bot_token = emoji.token
        this.vguild_id = emoji.guild ? emoji.guild.vguild_id : null
        this._bot = bot
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(emoji){
        let tocheck = Object.entries(emoji)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/emoji").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/emoji").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Emoji