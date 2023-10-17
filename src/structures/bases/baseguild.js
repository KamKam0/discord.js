const baseForAll = require("./base")

class baseGuild extends baseForAll {
    constructor(datas, bot){
        super(bot, datas)
        this.guild_id = datas.guild_id || null
        this.guild = datas.guild || bot.guilds.get(this.guild_id) || null
    }
}

module.exports = baseGuild