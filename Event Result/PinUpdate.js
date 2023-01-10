class Pins{
    constructor(pins, bot){
        this.last_pin_timestamp = pins.last_pin_timestamp
        this.guild_id = pins.guild_id || null
        this.channel_id = pins.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.guild = pins.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }
}

module.exports = Pins