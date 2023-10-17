const updateHandler = require('./results/updateHandler')

module.exports = async (bot, newChannel) => {
    let updateParameters = {
        name: name(),
        path: 'channels',
        guild: true,
        bot: true
    }

    updateHandler(updateParameters, newChannel, bot)
}

function name(){ return "CHANNEL_UPDATE" }