const BaseStage = require("../Gestionnaires/Multiple/Stickers")
class Stickers extends BaseStage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }
    
    create(name, file, tags, description){
        return new Promise((resolve, reject) => {
            require("../Methods/stickers").create(this._bot.token, this.guild_id, name, file, tags, description)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - create, sticker manager")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Stickers