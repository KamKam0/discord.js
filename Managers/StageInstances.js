const BaseStage = require("../Gestionnaires/Multiple/StageInstances")
class StageInstances extends BaseStage{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    create(options){
        return new Promise(async (resolve, reject) => {
            require("../Methods/stages").create(this._bot.token, this.guild_id, options, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - create, stage manager")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}

module.exports = StageInstances