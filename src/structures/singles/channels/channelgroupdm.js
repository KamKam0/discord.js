const TetxBase = require("../../bases/channels/textbase")
const dmMethod = require("../../../methods/dm")

class Channel extends TetxBase{
    constructor(channel, bot){
        super(channel, bot)
        this.name = channel.name
        this.recipients = channel.recipients
        this.icon = channel.icon
        this.owner_id = channel.owner_id
    }

    /**
     * 
     * @param {string} userid 
     * @param {string} nick 
     * @param {string} accesstoken 
     * @returns 
     */
    async addMember(userid, nick, accesstoken){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: userid
        }
        return dmMethod.adduser(informations, nick, accesstoken)
    }

    /**
     * 
     * @param {string} userid 
     * @returns 
     */
    async removeMember(userid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: userid
        }
        return dmMethod.removeuser(informations)
    }
}
module.exports = Channel