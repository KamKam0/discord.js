const User = require("./user")
const Base = require("../bases/base")
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

    _Modify_Datas(template){
        let tocheck = Object.entries(template)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        this._Modify_Get_Datas()
        return this
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
        return require("../../methods/template").createguild(informations, options)
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
        return require("../../methods/template").sync(informations)
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
        return require("../../methods/template").modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async deletetemplate(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            code: this.code,
            guild_id: this.guild_id
        }
        return require("../../methods/template").delete(informations)
    }
}
module.exports = Template