const interactionMethod = require("../../methods/interaction")
const collector = require("../../handlers/collector")
const Base = require("../bases/basemuldecla")

class Commands extends Base{
    constructor(bot){
        super(bot)
    }

    create(options, guildId){
        let ID = this._bot?.user?.id
        let informations = {
            bot: this._bot,
            botToken: this._token,
            application_id: ID
        }
        if (guildId) {
            informations.guild_id = guildId
            return interactionMethod.createcommandByGuild(informations, options)
        }
        return interactionMethod.create(informations, options)
    }

    modify(cmdID, options, guildId){
        let ID = this._bot?.user?.id
        let informations = {
            bot: this._bot,
            botToken: this._token,
            application_id: ID,
            id: cmdID
        }
        if (guildId) {
            informations.guild_id = guildId
            return interactionMethod.modifycommandByGuild(informations, options)
        }
        return interactionMethod.modifycommand(informations, options)
    }

    delete(ID, guildId){
        let app = this._bot?.user?.id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: app,
            id: ID
        }
        if (guildId) {
            informations.guild_id = guildId
            return interactionMethod.deletecommandByGuild(informations)
        }
        return interactionMethod.deletecommand(informations)
    }

    fetchAll(queryParams, guildId){
        let ID = this._bot?.user?.id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: ID
        }
        if (guildId) {
            informations.guild_id = guildId
            return interactionMethod.getcommandsByGuild(informations, queryParams)
        }
        return interactionMethod.getcommands(informations, queryParams)
    }

    fetchById(ID, guildId){
        let app = this._bot?.user?.id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: app,
            id: ID
        }
        if (guildId) {
            informations.guild_id = guildId
            return interactionMethod.getcommandByGuild(informations)
        }
        return interactionMethod.getcommand(informations)
    }

    async awaitInteractions(options){
        let collectorVerification = this._bot._handleCollectors(collector.check({channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options, "interaction"), 'await')
        if (collectorVerification) {
            return Promise.resolve([])
        }

        return new Promise((resolve, reject) => {
            collector(this._bot, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
            .then(data => {
                this._bot._handleCollectors(collector.check({channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options, "interaction"), 'await', true)
                return resolve(data)
            })
            .catch(err => {
                this._bot._handleCollectors(collector.check({channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options, "interaction"), 'await', true)
                return reject(err)
            })
        })
    }

    collectInteractions(options){
        return collector.collect(this._bot, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }
}

module.exports = Commands