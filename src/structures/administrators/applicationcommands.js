const interactionMethod = require("../../methods/interaction")
const collector = require("../../handlers/collector")
const Base = require("../bases/basemuldecla")

class Commands extends Base{
    constructor(bot){
        super(bot)
    }

    create(options){
        let ID = this._bot?.user?.id
        let informations = {
            bot: this._bot,
            botToken: this._token,
            application_id: ID
        }
        return interactionMethod.create(informations, options)
    }

    modify(cmdID, options){
        let ID = this._bot?.user?.id
        let informations = {
            bot: this._bot,
            botToken: this._token,
            application_id: ID,
            command_id: cmdID
        }
        return interactionMethod.modifycommand(informations, options)
    }

    delete(ID){
        let app = this._bot?.user?.id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: app,
            command_id: ID
        }
        return interactionMethod.deletecommand(informations)
    }

    fetchAll(queryParams){
        let ID = this._bot?.user?.id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: ID
        }
        return interactionMethod.getcommands(informations, queryParams)
    }

    fetchById(ID){
        let app = this._bot?.user?.id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: app,
            id: ID
        }
        return interactionMethod.getcommand(informations)
    }

    async awaitInteractions(options){
        return collector(this._bot, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }

    collectInteractions(options){
        return collector.collect(this._bot, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }
}

module.exports = Commands