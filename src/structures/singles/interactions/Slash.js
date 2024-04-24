const Base = require("../../bases/interactions/base")
const Attachment = require('../../../handlers/attachment')
const User = require('../user')
const Member = require('../member')
const Role = require('../role')
const interactionTypes = require("../../../types/slashcommand")
const channelTypes = require("../../../types/channels")
const revertChannelTypes = channelTypes.revert()

class Slash extends Base{
    constructor(slash, bot){
        super("slash", slash, bot)
        
        this._modifyConstants.push({name: "context", data: interactionTypes.revert()})

        this.id = slash.id
        this.context = this._typechange(this._modifyConstants.find(e => e.name === "context").data, slash.context)
        this.command_id = slash.data.id || null
        this.attachments = this.#analyseAttachments(slash.data.resolved)
        this.options = this.#analyseOptions(slash.data.options, slash.data.resolved, this.guild_id, bot)
    }

    getOption(name){
        if(!this.options) return null
        return this.options.find(compo => compo.name === name) || null
    }

    #analyseAttachments(resolved) {
        if (!resolved || !resolved.attachments) {
            return []
        }

        if (!Object.keys(resolved.attachments).length) {
            return []
        }

        return Object.values(resolved.attachments).map(attachment => new Attachment(attachment))
    }

    #analyseOptions(options, resolvedData, guildId, bot) {
        if (!options || !options.length) {
            return []
        }

        const definitiveOptions = options.map(option => {
            if (!option.value) {
                return option
            }

            switch(option.type) {
                case (6):
                    if (resolvedData.members[option.value]) {
                        resolvedData.members[option.value].user = resolvedData.users[option.value]
                        resolvedData.members[option.value].guild_id = guildId
                        option.value = new Member(resolvedData.members[option.value], bot)
                    } else {
                        option.value = new User(resolvedData.users[option.value], bot)
                    }
                break;
                case (7):
                    let channelClass = require(`../channels/channel${revertChannelTypes[resolvedData.channels[option.value].type].toLowerCase()}`)
                    resolvedData.channels[option.value].guild_id = guildId
                    option.value = new channelClass(resolvedData.channels[option.value], bot)
                break;
                case (8):
                    resolvedData.roles[option.value].guild_id = guildId
                    option.value = new Role(resolvedData.roles[option.value], bot)
                break;
                case (9):
                    if (resolvedData.members[option.value]) {
                        resolvedData.members[option.value].user = resolvedData.users[option.value]
                        resolvedData.members[option.value].guild_id = guildId
                        option.value = new Member(resolvedData.members[option.value], bot)
                    } else if (resolvedData.users[option.value]) {
                        option.value = new User(resolvedData.users[option.value], bot)
                    } else {
                        resolvedData.roles[option.value].guild_id = guildId
                        option.value = new Role(resolvedData.roles[option.value], bot)
                    }
                break;
                case (11):
                    let linkedAttachment = this.attachments.find(attachment => attachment.id === option.value)
                    if (linkedAttachment) {
                        option.value = linkedAttachment
                    }
                break;
            }
            
            return option
        })

        return definitiveOptions
    }
}

module.exports = Slash