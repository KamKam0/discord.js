const updateHandler = require('./results/updateHandler')

module.exports = async (bot, newSticker) => {
    let updateParameters = {
        name: name(),
        path: 'stickers',
        guild: true,
    }

    updateHandler(updateParameters, newSticker, bot)
}

function name(){ return "GUILD_STICKER_UPDATE" }