const BaseEmojis = require("../Gestionnaires/Multiple/Emojis")
class Emojis extends BaseEmojis{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {string} name 
     * @param {buffer} imagedata 
     * @param {object[]} roles 
     * @returns 
     */
    create(name, imagedata, roles){
        return new Promise((resolve, reject) => {
            require("../Methods/emoji").create(this._bot.discordjs.token, this.guild_id, name, imagedata, roles, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}

module.exports = Emojis