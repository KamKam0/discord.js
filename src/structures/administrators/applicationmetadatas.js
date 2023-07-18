const Base = require("../managers/applicationmetadatas")
const applicationMethod = require("../../methods/application")

class ApplicationMetadata extends Base{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    async get(id){
        let informations = {
            id,
            bot: this._bot,
            botToken: this._token,
        }
        return applicationMethod.getMetadata(informations)
    }

    async update(id, options){
        let informations = {
            id,
            bot: this._bot,
            botToken: this._token,
        }
        return applicationMethod.updateMetadata(informations, options)
    }
}

module.exports = ApplicationMetadata