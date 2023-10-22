const updateHandler = require('../../handlers/updateHandler')

module.exports = async (bot, newEvent) => {
    let updateParameters = {
        name: name(),
        path: 'guild_scheduled_events',
        guild: true,
    }

    updateHandler(updateParameters, newEvent, bot)
}
    
function name(){ return "GUILD_SCHEDULED_EVENT_UPDATE" }