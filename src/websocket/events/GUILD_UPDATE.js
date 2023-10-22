const updateHandler = require('../../handlers/updateHandler')

module.exports = async (bot, newGuild) => {
    let updateParameters = {
        name: name(),
        path: 'guilds',
        bot: true,
    }

    updateHandler(updateParameters, newGuild, bot)
}

function name(){ return "GUILD_UPDATE" }