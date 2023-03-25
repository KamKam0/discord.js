const BaseCommands = require("../managers/applicationcommands")
const Command = require("../applicationscommands/command")
const interactionMethod = require("../../methods/interaction")
const collector = require("../../handlers/collector")

class Commands extends BaseCommands{
    constructor(bot){
        super(bot)
    }

    create(options){
        return new Promise(async (resolve, reject) => {
            let ID = this._bot?.user?.id
            if(!ID) ID = (await this._bot.getMe())?.id
            require("../methods/interaction").createcommand(this._bot.discordjs.token, ID, options, this._bot)
            .catch(err => reject(err))
            .then(datas => {
                this._bot.commands._add(options instanceof Command ? options : datas)
                return resolve(this._bot.commands.get(datas.id))
            })
        })
    }

    modify(options){
        return new Promise(async (resolve, reject) => {
            let ID = this._bot?.user?.id
            if(!ID) ID = (await this._bot.getMe())?.id
            require("../methods/interaction").modifycommand(this._bot.discordjs.token, ID, options, this._bot)
            .catch(err => reject(err))
            .then(datas => {
                this._bot.commands._delete(datas.id)
                this._bot.commands._add(options instanceof Command ? options : datas)
                return resolve(this._bot.commands.get(datas.id))
            })
        })
    }

    fetchAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: this._bot.user?.id
        }
        return interactionMethod.getcommands(informations)
    }

    fetchById(ID){
        return new Promise(async (resolve, reject) => {
            let ID2 = this._bot?.user?.id
            if(!ID2) ID2 = (await this._bot.getMe())?.id
            require("../methods/interaction").getcommands(this._bot.discordjs.token, ID, ID2, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    delete(options){
        return new Promise(async (resolve, reject) => {
            let ID = this._bot?.user?.id
            if(!ID) ID = (await this._bot.getMe())?.id
            require("../methods/interaction").deletecommand(this._bot.discordjs.token, ID, options, this._bot)
            .catch(err => reject(err))
            .then(datas => {
                this._bot.commands._delete(datas.id)
                return resolve({})
            })
        })
    }

    async awaitInteractions(options){
        return collector(this, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }

    collectInteractions(options){
        return collector.collect(this, "interaction", {channel_id: options.channel_id || null, guild_id: options.guild_id || null, message_id: options.message_id || null, interaction_id: options.id || null}, options)
    }
}

module.exports = Commands