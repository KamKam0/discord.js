const User = require("./user")
const BaseGuild = require("../bases/baseguild")
const banMethod = require("../../methods/ban")

class Ban extends BaseGuild{
    constructor(ban, bot){
        super(ban, bot)
        this.user = new User(ban.user, bot)
        this.user_id = ban.user.id
        this.reason = ban.reason ||  null
    }

    async unban(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return banMethod.unban(informations, options)
    }
}
module.exports = Ban