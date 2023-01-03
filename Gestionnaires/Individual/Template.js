const User = require("./User")
class Template{
    constructor(template, bot){
        this.code = template.code
        this.name = template.name
        this.description = template.description || null
        this.creator_id = template.creator_id
        this.creator = template.creator_id ? new User(template.creator, bot) : null
        this.created_at = template.created_at
        this.updated_at = template.updated_at || null
        this.guild_id = template.source_guild_id
        this.guild = template.serialized_source_guild || null
        this.is_dirty = template.is_dirty || false
        this.bot_token = bot.discordjs.token
        this.vguild_id = template.guild ? template.guild.vguild_id : null
        this._bot = bot
    }

    Modify_Datas(template){
        let tocheck = Object.entries(template)
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
    createguildfrom(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").createguild(this.bot_token, this.source_guild_id, this.code, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    sync(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").sync(this.bot_token, this.source_guild_id, this.code, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").modify(this.bot_token, this.source_guild_id, this.code, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    deletetemplate(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").delete(this.bot_token, this.source_guild_id, this.code, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Template