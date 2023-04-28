const baseUser = require("../singles/user")
const methodMe = require("../../methods/me")

class clientUser extends baseUser{
    constructor(user, bot){
        super(user, bot)
    }

    setStatus(options){
        let presence = methodMe.setstatus(this._bot, options)
        this._bot.events.presence = presence
        return presence
    }

    setActivity(options){
        let presence = methodMe.setactivity(this._bot, options)
        this._bot.events.presence = presence
        return presence
    }

    setPresence(options){
        let presence =  methodMe.setpresence(this._bot, options)
        this._bot.events.presence = presence
        return presence
    }
}

module.exports = clientUser