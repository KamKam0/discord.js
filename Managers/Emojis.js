const BaseEmojis = require("../Gestionnaires/Multiple/Emojis")
class Emojis extends BaseEmojis{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(name, imagedata, roles){
        return new Promise((resolve, reject) => {
            require("../Methods/emoji").create(this._bot.token, this.guild_id, name, imagedata, roles, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - create, emoji manager")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Emojis