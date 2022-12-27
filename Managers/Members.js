const BaseMember = require("../Gestionnaires/Multiple/Members")
class Members extends BaseMember{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    ban(ID, options){
        return new Promise((resolve, reject) => {
            require("../Methods/ban").ban(this._bot.token, this.guild_id, ID, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - ban, members manager")
                er.content = err
                reject(er)
            })
        })
    }

    unban(ID, options){
        return new Promise((resolve, reject) => {
            require("../Methods/ban").unban(this._bot.token, this.guild_id, ID, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - unban, member manager")
                er.content = err
                reject(er)
            })
        })
    }
}

module.exports = Members