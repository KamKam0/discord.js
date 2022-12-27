class Pins{
    constructor(pins, bot){
        this.last_pin_timestamp = pins.last_pin_timestamp
        this.channel_id = pins.channel_id
        this.channel = pins.channel
        this.guild = pins.guild
        this.guild_id = pins.guild_id
        this.bot_token = pins.token
        this.vguild_id = null
        this._bot = bot
    }

    SetChannel(channel){
        this.channel = channel
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }
}

module.exports = Pins