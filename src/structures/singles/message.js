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
const User = require("./user")
const Poll = require('./interactions/Poll')
const optionsTypes = require("../../types/option").types
const ReactionsAdministrator = require('../administrators/reactions')

class Message extends Base{
    constructor(message, bot){
        super(message, bot)

        this._modifyConstants.push({name: "type", data: messageTypes.revert()})
        this._modifyConstants.push({name: "mention_channels", function: this.#treatMentionsChannels})

        this.user_id = (message.user || message.user_id) ? message.user_id : message.author.id
        this.user = !this.user_id ? new User({id: this.user_id}, bot) : ((bot.users.get(this.user_id) ?? null) || new User({id: this.user_id}, bot))
        this.member = message.guild_id ? (this.guild.members.get(this.user_id) ?? null) : null
        this.id = message.id
        this.channel_id = message.channel_id || null
        this.channel = bot.channels.get(this.channel_id) || utils.general.channelBackup(this.channel_id, bot)
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
        this.reactions = new ReactionsAdministrator(bot, this.channel_id, this.id)
        this.reactions = message.reactions || []
        this.nonce = message.nonce || null
        this.pinned = message.pinned ?? false
        this.webhook_id = message.webhook_id|| null
        this.type = this._typechange(this._modifyConstants.find(e => e.name === "type").data, message.type)
        this.activity = message.activity || null
        this.message_reference = message.message_reference || null
        this.application_id = message.application_id
        this.flags = message.flags || 0
        this.referenced_message = message.referenced_message ? new Message({...message.referenced_message, guild_id: this.guild_id}, bot) : null
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
        this.commandName = null
        this.isCommand = this.#handleCommand()
        this.options = this.#handleOptions()
        this.poll = message.poll ? new Poll({...message.poll, message_id: this.id, channel_id: this.channel_id }, bot) : null
    }

    #handleCommand(){
        if(!this.content) return false
        if(!this.content.startsWith(`<@!${this._bot.user.id}>`) && !this.content.startsWith(`<@${this._bot.user.id}>`)) return false
        let name = this.content.split(this._bot.user.id)[1].slice(1).split(" ").filter(e => e !== "")[0]
        if(!name) return false
        this.commandName = name
        return true
    }

    #handleOptions(){
        if(!this.isCommand) return []
        let command = this._bot.handler.getCommand(this.commandName)
        if(!command || !command.help || !command.help.options?.length) return []
        let splittedMessageContent = this.content.split(" ")
        if(splittedMessageContent.length < 3) return []
        let options = command.help.options
        let allowedOptionTypes = ["string", "number", "boolean"]
        splittedMessageContent.splice(0, 2)
        let returnedOptions = []
        for (const option in options){
            let associatedValue = splittedMessageContent[option]
            if(!associatedValue[option]) return returnedOptions
            if(!isNaN(associatedValue)) associatedValue = +associatedValue
            if(!allowedOptionTypes.includes(typeof associatedValue)) continue
            let typeOfAssociatedValue = typeof associatedValue
            let mappedType = typeOfAssociatedValue.charAt(0).toUpperCase() + typeOfAssociatedValue.slice(1)
            let type = optionsTypes[mappedType]
            if(options[option].type === 4 && typeof allowedOptionTypes === "number" && String(allowedOptionTypes).includes(".")){
                allowedOptionTypes = Number((allowedOptionTypes).toFixed(0))
                type = 4
            }
            if(type !== options[option].type) associatedValue = null
            returnedOptions.push({name: options[option].name, value: associatedValue})
        }
        return returnedOptions
    }

    #treatMentionsChannels(content){
        let clas = new Mentions(this._bot, this.guild_id, "channel")
        if(!content) return clas
        if(content.includes("<#")){
            let splitted = content.split("<#").filter(e => e.includes(">")).map(e => e.split(">")[0]).filter(e => !isNaN(e))
            if(splitted && splitted[0]) clas._addMultiple(splitted)
        }
        return clas
    }
    
    /**
     * 
     * @returns 
     */
    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.delete(informations, options)
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
    async pin(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.pin(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async unpin(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id
        }
        return messageMethod.unpin(informations, options)
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
     * @param {object} [queryParams]
     * @param {string} [queryParams.after] ID
     * @param {number} [queryParams.limit] 
     * @returns 
     */
    async fetchreaction(reaction, queryParams){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: this.channel_id,
            emoji: encodeURIComponent(reaction)
        }
        return messageMethod.fetch_reaction(informations, queryParams)
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