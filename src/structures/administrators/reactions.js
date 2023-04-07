const Base = require("../bases/basemuldecla")
const messageMethod = require("../../methods/message")

class Reactions extends Base{
    constructor(bot, channel_id, message_id){
        super(bot)
        this.message_id = message_id
        this.channel_id = channel_id
    }

    fetch(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id
        }
        return messageMethod.fetch_reactions(informations)
    }

    /**
     * 
     * @param {object} [queryParams]
     * @param {string} [queryParams.after] ID
     * @param {number} [queryParams.limit] 
     * @returns 
     */
    fetchEmoji(emoji, queryParams){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id,
            emoji: encodeURIComponent(emoji)
        }
        return messageMethod.fetch_reaction(informations, queryParams)
    }
    
    /**
     * 
     * @param {string} emoji 
     * @returns 
     */
    async add(emoji){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id,
            emoji: encodeURIComponent(emoji)
        }
        return messageMethod.addreaction(informations)
    }

    /**
     * 
     * @param {string} emoji 
     * @returns 
     */
    async remove(emoji){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id,
            emoji: encodeURIComponent(emoji)
        }
        return messageMethod.removereaction(informations)
    }

    /**
     * 
     * @param {string} userid 
     * @param {string} emoji 
     * @returns 
     */
    async removeUserEmoji(userid, emoji){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id,
            emoji: encodeURIComponent(emoji),
            user_id: userid
        }
        return messageMethod.removeuserreaction(informations)
    }

    /**
     * 
     * @param {string} emoji 
     * @returns 
     */
    async removeAllEmoji(emoji){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id,
            emoji: encodeURIComponent(emoji)
        }
        return messageMethod.removeallreactionemoji(informations, emoji)
    }

    /**
     * 
     * @returns 
     */
    async removeAll(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.message_id,
            channel_id: this.channel_id
        }
        return messageMethod.removeallreactions(informations)
    }
}

module.exports = Reactions