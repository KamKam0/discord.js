class Emoji{
    constructor(emoji, bot){
        this.id = emoji.id
        this.name = emoji.name
        this.roles_ids = emoji.roles || []
        this.require_colons = emoji.require_colons || null
        this.managed = emoji.managed ?? false
        this.animated = emoji.animated ?? false
        this.available = emoji.available ?? true
        this.guild_id = emoji.guild_id
        this.guild = emoji.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.vguild_id = this.guild ? this.guild.vguild_id : null
        this._bot = bot
    }

    Modify_Datas(emoji){
        let tocheck = Object.entries(emoji)
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
    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/emoji").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/emoji").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Emoji