const updateHandler = require('../../handlers/updateHandler')
const Message = require('../../structures/singles/message')

module.exports = async (bot, newMessage) => {
    const guild = bot.guilds.get(newMessage.guild_id)

    let oldmessage = null
    if (guild) {
        oldmessage = guild.messages.get(newMessage.id)
    }

    if(!oldmessage){
        if(!newMessage.author) return bot.emit(name(), bot, newMessage)
        const messageInstance = new Message(newMessage, bot)

        bot.emit(name(), bot, messageInstance)

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