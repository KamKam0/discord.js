const Message = require("../../singles/message")
const User = require("../../singles/user")
const Base = require("../basereplying")
class base extends Base{
    constructor(type, interaction, bot){
        super(interaction, bot)
        this.id = interaction.id
        this.application_id = interaction.application_id
        this.custom_id = interaction.data.custom_id
        this.channel_id = interaction.channel_id
        this.message = interaction.message ? (new Message({...interaction.message, guild_id: interaction.guild_id, channel_id: interaction.channel_id}, bot)) : null
        this.channel = bot.channels.get(this.channel_id) || require("../../../utils/functions").channel_backup(interaction.channel_id, bot)
        this.user_id = interaction.user ? interaction.user.id : interaction.member.user.id
        this.user = bot.users.get(this.user_id) ?? new User(interaction.user, bot)
        this.member = interaction.member && this.guild ? this.guild.members.get(this.user_id) : null
        this.token = interaction.token
        this.version = interaction.version
        this.guild_locale = interaction.guild_locale
        this.locale = interaction.locale
        this.receivingTypePrecision = type
    }

    _Modify_Datas(inte){
        let tocheck = Object.entries(inte)
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
    async reply(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: this._bot.user.id,
            interaction_id: this.id
        }
        return require("../../../methods/interaction").reply(informations, options)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modifyReply(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: this._bot.user.id,
            interaction_token: this.token
        }
        return require("../../../methods/interaction").modifyreply(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async deleteReply(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: this._bot.user.id,
            interaction_token: this.token
        }
        return require("../../../methods/interaction").deletereply(informations)
    }
    
    get createdAt(){
        return  require("../../../methods/general").createdAt(this.id, "interaction")
    }

    get isContextMenu(){
        return this.receivingTypePrecision === "menu"
    }

    get isSlash(){
        return this.receivingTypePrecision === "slash"
    }

    get isForm(){
        return this.receivingTypePrecision === "form"
    }

    get isForm(){
        return this.receivingTypePrecision === "button"
    }
}

module.exports = base