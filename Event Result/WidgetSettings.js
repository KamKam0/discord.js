class WidgetSettings{
    constructor(wsteeings, bot){
        this.channel_id = wsteeings.channel_id
        this.channel = wsteeings.channel
        this.enabled = wsteeings.enabled
        this.vguild_id = null
        this._bot = bot
    }
}
module.exports = WidgetSettings