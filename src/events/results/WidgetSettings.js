const guildBase = require("../../structures/bases/baseguild")
class WidgetSettings extends guildBase{
    constructor(wsettings, bot){
        super(wsettings, bot)
        
        this.channel_id = wsettings.channel_id || null
        this.channel = this.channel_id ? this._bot.channels.get(this.channel_id) : null
        this.enabled = wsettings.enabled
    }
}
module.exports = WidgetSettings