const BaseStage = require("../Gestionnaires/Multiple/Stickers")
class Stickers extends BaseStage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
    
    create(name, file, tags, description){
        return new Promise((resolve, reject) => {
            require("../Methods/stickers").create(this._bot.discordjs.token, this.guild_id, name, file, tags, description, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Stickers