const baseForAll = require("./base")

class baseGuild extends baseForAll {
    constructor(datas, bot){
        super(bot)
        this.guild_id = datas.guild_id || null
        this.guild = bot.guilds.get(this.guild_id) || null
    }
}

module.exports = baseGuild