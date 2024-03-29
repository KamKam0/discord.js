const Message = require("../../singles/message")
const User = require("../../singles/user")
const Base = require("../basereplying")
const interactionMethod = require("../../../methods/interaction")
const generalMethod = require("../../../methods/general")
const { channelBackup } = require("../../../utils/functions").general

class base extends Base{
    constructor(type, interaction, bot){
        super(interaction, bot)
        this.id = interaction.id
        this.application_id = interaction.application_id
        this.name = interaction.data.name || null
        this.channel_id = interaction.channel_id
        this.message = interaction.message ? (new Message({...interaction.message, guild_id: interaction.guild_id, channel_id: interaction.channel_id}, bot)) : null
        this.channel = bot.channels.get(this.channel_id) || channelBackup(interaction.channel_id, bot)
        this.user_id = interaction.user ? interaction.user.id : interaction.member.user.id
        this.user = bot.users.get(this.user_id) ?? new User((interaction.user || interaction.member.user), bot)
        this.member = interaction.member && this.guild ? this.guild.members.get(this.user_id) : null
        this.token = interaction.token
        this.version = interaction.version
        this.guild_locale = interaction.guild_locale
        this.locale = interaction.locale
        this.receivingTypePrecision = type
        this.receivingType = "interaction"
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
            interaction_id: this.id,
            interaction_token: this.token
        }
        return interactionMethod.reply(informations, options)
    }

    async deferredLoadingResponse(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            interaction_id: this.id,
            interaction_token: this.token
        }
        return interactionMethod.defer(informations)
    }

    async getOriginalResponse(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            interaction_id: this.id,
            interaction_token: this.token
        }
        return interactionMethod.getoriginalresponse(informations)
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
        return interactionMethod.modifyreply(informations, options)
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
        return interactionMethod.deletereply(informations)
    }
    
    get createdAt(){
        return  generalMethod.createdAt(this.id, "interaction")
    }

    get isContextMenu(){
        return this.receivingTypePrecision === "menu"
    }

    get isSlash(){
        return this.receivingTypePrecision === "slash"
    }

    get isModal(){
        return this.receivingTypePrecision === "modal"
    }

    get isButton(){
        return this.receivingTypePrecision === "button"
    }
}

module.exports = base