const Base = require("../bases/basereplying")
const Mentions = require("../managers/mentions")
const Embed = require("../components/embed")
const messageMethod = require("../../methods/message")
const utils = require("../../utils/functions")
const messageTypes = require("../../types/message")
const componentsClass = {
    button: require("../components/button"),
    selectMenu: require("../components/selectmenu")
}

class Message extends Base{
    constructor(message, bot){
        super(message, bot)

        this._modifyConstants.push({name: "type", data: messageTypes.revert()})
        this._modifyConstants.push({name: "mention_channels", function: this.#treatMentionsChannels})

        this.user_id = (message.user || message.user_id) ? message.user_id : message.author.id
        this.user = this.user_id ? (bot.users.get(this.user_id) ?? null) : null
        this.member = message.guild_id ? (this.guild.members.get(this.user_id) ?? null) : null
        this.id = message.id
        this.channel_id = message.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || null
        this.content = message.content === "" ? null : message.content
        this.timestamp = message.timestamp
        this.edited_timestamp = message.edited_timestamp || null        
        this.tts = message.tts ? message.tts : false
        this.mention_everyone = message.mention_everyone ?? false
        this.mention_roles = (message.mention_roles && message.mention_roles[0]) ? (new Mentions(bot, this.guild_id, "role"))._addMultiple(message.mention_roles) :  new Mentions(bot, this.guild_id, "role")
        this.mention_channels = this.#treatMentionsChannels(this.content)
        this.mention_members = (message.mentions && message.mentions.filter(e => e.member)[0]) ? (new Mentions(bot, this.guild_id, "member"))._addMultiple(message.mentions.filter(e => e.member).map(e => e.id)) :  new Mentions(bot, this.guild_id, "member")
        this.attachments = message.attachments || []
        this.embeds = message.embeds?.map(embed => new Embed(embed)) || []
        this.reactions = message.reactions || []
        this.nonce = message.nonce || null
        this.pinned = message.pinned ?? false
        this.webhook_id = message.webhook_id|| null
        this.type = this._typechange(this._modifyConstants.find(e => e.name === "type").data, message.type)
        this.activity = message.activity || null
        this.message_reference = message.message_reference || null
        this.application_id = message.application_id
        this.flags = message.flags || 0
        this.referenced_message = message.referenced_message ? new Message(message.referenced_message) : null
        this.components = []
        if(message.components){
            let mainComponent = message.components.find(compo => compo.type === 1)?.components
            if(mainComponent){
                let mappedMainComponent = mainComponent.map(component => {
                    if(component.type === 2) return new componentsClass.button(component)
                    if(component.type === 3) return new componentsClass.selectMenu(component)
                    return component
                })
                this.components = mappedMainComponent
            }
        }
        this.sticker_items = message.sticker_items || []
        this.stickers = message.stickers || []
        this.receivingType = "message"
    }

    #treatMentionsChannels(content){
        let clas = new Mentions(this._bot, this.guild_id, "channel")
        if(!content) return clas
        if(content.includes("<#")){
            let splitted = content.split("<#").filter(e => e.includes(">")).map(e => e.split(">")[0]).filter(e => !isNaN(e))
            if(splitted && splitted[0]) clas._add(splitted)
        }
        return clas
    }
    
    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.delete(informations)
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
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.modify(informations, options)
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
            channel_id: this.channel_id
        }
        options = utils.general.correctMessageData(options)
        if(options) options.message_reference = {
            message_id: this.id,
            channel_id: this.channel_id,
            guild_id: this.guild_id
        }
        return messageMethod.send(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async pin(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.pin(informations)
    }

    /**
     * 
     * @returns 
     */
    async unpin(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.unpin(informations)
    }

    /**
     * 
     * @returns 
     */
    async fetchreactions(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.fetch_reactions(informations)
    }

    /**
     * 
     * @param {string} reaction 
     * @returns 
     */
    async fetchreaction(reaction){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.fetch_reaction(informations, reaction)
    }

    /**
     * 
     * @returns 
     */
    async crosspost(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.crosspost(informations)
    }
}
module.exports = Message