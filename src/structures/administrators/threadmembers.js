const Base = require("../bases/basemuldecla")
const threadMethod = require("../../methods/threads")

class ThreadMembers extends Base{
    constructor(bot, guild_id, thread_id){
        super(bot, guild_id)
        this.thread_id = thread_id
    }
    
    async add(user_id){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.thread_id,
            user_id
        }
        return threadMethod.addthreadmember(informations)
    }
    
    async remove(user_id){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.thread_id,
            user_id
        }
        return threadMethod.removethreadmember(informations)
    }

    /**
     * 
     * @param {string} memberid 
     * @param {object} [queryParams] 
     * @param {boolean} [queryParams.with_member]
     * @returns 
     */
    getMember(memberid, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.thread_id,
            user_id: memberid
        }
        return threadMethod.getthreadmember(informations, queryParams)
    }

    getMembers(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: this.thread_id
        }
        return threadMethod.getthreadmembers(informations)
    }
}

module.exports = ThreadMembers