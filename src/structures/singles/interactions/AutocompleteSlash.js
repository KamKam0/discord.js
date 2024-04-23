const Base = require("../../bases/baseguild")
const Attachment = require('../../../handlers/attachment')
const User = require('../user')
const Member = require('../member')
const Role = require('../role')
const interactionMethod = require("../../../methods/interaction")
const channelTypes = require("../../../types/channels")
const { channelBackup } = require("../../../utils/functions").general
const revertChannelTypes = channelTypes.revert()

class AutoComplete extends Base{
    constructor(interaction, bot){
        super(interaction, bot)
        this.id = interaction.id
        this.application_id = interaction.application_id
        this.name = interaction.data.name || null
        this.channel_id = interaction.channel_id
        this.channel = bot.channels.get(this.channel_id) || channelBackup(interaction.channel_id, bot)
        this.user_id = interaction.user ? interaction.user.id : interaction.member.user.id
        this.user = bot.users.get(this.user_id) ?? new User((interaction.user || interaction.member.user), bot)
        this.member = interaction.member && this.guild ? this.guild.members.get(this.user_id) : null
        this.token = interaction.token
        this.version = interaction.version
        this.guild_locale = interaction.guild_locale
        this.locale = interaction.locale
        this.receivingTypePrecision = "slash"
        this.receivingType = "interaction"
        this.id = interaction.id
        this.command_id = interaction.data.id || null
        this.attachments = this.#analyseAttachments(interaction.data.resolved)
        this.options = this.#analyseOptions(interaction.data.options, interaction.data.resolved, this.guild_id, bot)
        this.isAutocomplete = true
    }

    async returnSuggestedChoices(choices) {
        let informations = {
            botToken: this._token,
            bot: this._bot,
            interaction_id: this.id,
            interaction_token: this.token
        }
        return interactionMethod.replyToAutocomplete(informations, choices)
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

module.exports = AutoComplete