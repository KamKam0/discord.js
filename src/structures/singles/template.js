const User = require("./user")
const Base = require("../bases/base")
const templateMethod = require("../../methods/template")

class Template extends Base{
    constructor(template, bot){
        super(bot)
        this.code = template.code
        this.name = template.name
        this.description = template.description || null
        this.creator_id = template.creator_id
        this.creator = template.creator_id ? new User(template.creator, bot) : null
        this.created_at = template.created_at
        this.updated_at = template.updated_at || null

        this.guild_id = template.source_guild_id
        this.guild = template.serialized_source_guild || null

        this.is_dirty = template.is_dirty ?? false
    }
    
    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async createguildfrom(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            code: this.code,
            guild_id: this.guild_id
        }
        return templateMethod.createguild(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async sync(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            code: this.code,
            guild_id: this.guild_id
        }
        return templateMethod.sync(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            code: this.code,
            guild_id: this.guild_id
        }
        return templateMethod.modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            code: this.code,
            guild_id: this.guild_id
        }
        return templateMethod.delete(informations)
    }
}
module.exports = Template