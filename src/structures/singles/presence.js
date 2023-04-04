const BaseGuild = require("../bases/baseguild")
class Presence extends BaseGuild{
    constructor(presence, bot){
        super(presence, bot)
        this.user_id = presence.user ? presence.user.id : presence.user_id
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.status = presence.status || null
        this.activities = presence.activities || []
        this.client_status = presence.client_status
    }
}
module.exports = Presence