module.exports = async (bot, datas) => {
    const channel = bot.channels.get(datas.id)
    if (!channel) return

    let sanitizedData = {
        channel,
        status: datas.status
    }

    bot.emit(name(), bot, sanitizedData)
}

function name(){ return "VOICE_CHANNEL_STATUS_UPDATE" }