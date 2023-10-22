const updateHandler = require('../../handlers/updateHandler')

module.exports = async (bot, newEmoji) => {
    let updateParameters = {
        name: name(),
        path: 'emojis',
        guild: true,
    }

    updateHandler(updateParameters, newEmoji, bot)
}

function name(){ return "GUILD_EMOJI_UPDATE" }