const User = require("../../../structures/singles/user")
const guildBase = require("../../../structures/bases/baseguild")
const banMethod = require("../../../methods/ban")

class Unban extends guildBase{
    constructor(ban, bot){
        super(ban, bot)
        this.user = new User(ban.user, bot)
        this.user_id = ban.user.id || null
    }
    
    ban(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            user_id: this.user_id,
            guild_id: this.guild_id
        }
        return banMethod.ban(informations, options)
    }
}
module.exports = Unban