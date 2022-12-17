const BaseRole = require("../Gestionnaires/Multiple/Roles")
class Roles extends BaseRole{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        return new Promise((resolve, reject) => {
            require("../Methods/roles").create(this._bot.token, this.guild_id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - create, roles manager")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Roles