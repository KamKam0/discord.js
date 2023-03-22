const BaseCommands = require("../managers/applicationcommands")
const Command = require("../applicationscommands/command")
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
        return new Promise(async (resolve, reject) => {
            let ID = this._bot?.user?.id
            if(!ID) ID = (await this._bot.getMe())?.id
            require("../methods/interaction").getcommands(this._bot.discordjs.token, ID, null, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
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
}

module.exports = Commands