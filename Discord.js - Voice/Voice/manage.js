module.exports.connect = async (bot, guildid, channelid) => {
    let playload = {
        op: 4,
        d: {
            guild_id: guildid,
            channel_id: channelid,
            self_mute: false,
            self_deaf: false
        }
    }

    

    bot.discordjs.ws.send(JSON.stringify(playload))

}

module.exports.disconnet = async () => {

}