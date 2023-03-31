class baseMultiple{
    constructor(_bot, guild_id){
        this._bot = _bot
        this._token = _bot.token
        this.guild_id = guild_id || null
    }
}

module.exports = baseMultiple