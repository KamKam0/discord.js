class StageInstance{
    constructor(stage, bot){
        this.id = stage.id
        this.guild_id = stage.guild_id || null
        this.channel_id = stage.channel_id
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.topic = stage.topic || null
        this.privacy_level = stage.privacy_level || null
        this.discoverable_disabled = stage.discoverable_disabled ?? false
        this.guild = stage.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }

    __Modify_Datas(stage){
        let tocheck = Object.entries(stage)
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
            require("../../Methods/stages").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
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
            require("../../Methods/stages").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = StageInstance