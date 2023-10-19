const updateHandler = require('./results/updateHandler')
const Message = require('../../structures/singles/message')

module.exports = async (bot, newMessage) => {
    const guild = bot.guilds.get(newMessage.guild_id)

    let oldmessage = null
    if (guild) {
        oldmessage = guild.messages.get(newMessage.id)
    }

    if(!oldmessage){
        if(!newMessage.author && (bot.databaseState || bot.databaseState === null)) return bot.emit(name(), bot, newMessage)
        const messageInstance = new Message(newMessage, bot)

        if(bot.databaseState)  bot.emit(name(), bot, messageInstance)

        return
    }

    if (oldmessage && newMessage.content) {
        let updateParameters = {
            name: name(),
            path: 'messages',
            guild: true,
        }
    
        updateHandler(updateParameters, newMessage, bot)
    }
}

function name(){ return "MESSAGE_UPDATE" }