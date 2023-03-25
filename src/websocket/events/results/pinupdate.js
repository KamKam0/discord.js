const guildBase = require("../../../structures/bases/baseguild")

class Pins extends guildBase{
    constructor(pins, bot){
        super(pins, bot)

        this.last_pin_timestamp = pins.last_pin_timestamp
        this.channel_id = pins.channel_id || null
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
    }
}

module.exports = Pins