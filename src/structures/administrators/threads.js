const BaseThreads = require("../managers/channels")
const threadMethod = require("../../methods/threads")
const channelMethod = require("../../methods/channel")

class Threads extends BaseThreads{
    constructor(bot, guild_id){
        super(bot, guild_id)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    join(threadid){
        let thread = this.get(threadid)
        if(!thread) return Promise.reject("No thread found")
        return thread.join()
    }

    /**
     * 
     * @param {string} threadid 
     * @param {string} memberid 
     * @returns 
     */
    addMember(threadid, memberid){
        let thread = this.get(threadid)
        if(!thread) return Promise.reject("No thread found")
        return thread.addMember(memberid)
    }

    /**
     * 
     * @param {string} threadid 
     * @param {string} memberid 
     * @returns 
     */
    removeMember(threadid, memberid){
        let thread = this.get(threadid)
        if(!thread) return Promise.reject("No thread found")
        return thread.removeMember(memberid)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    leave(threadid){
        let thread = this.get(threadid)
        if(!thread) return Promise.reject("No thread found")
        return thread.leave()
    }

    /**
     * 
     * @param {string} channelid 
     * @param {string} messageid 
     * @param {object} options 
     * @returns 
     */
    createWithMessage(channelid, messageid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: channelid,
            message_id: messageid
        }
        return threadMethod.create_withm(informations, options)
    }

    /**
     * 
     * @param {string} threadid 
     * @param {object} options 
     * @returns 
     */
    modify(threadid, options){
        let thread = this.get(threadid)
        if(!thread) return Promise.reject("No thread found")
        return thread.modify(options)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    delete(threadid){
        let thread = this.get(threadid)
        if(!thread) return Promise.reject("No thread found")
        return thread.delete()
    }


    /**
     * @param {string} threadid 
     * @param {string} memberid 
     * @param {object} [queryParams] 
     * @param {boolean} [queryParams.with_member]
     * @returns 
     */
    getMember(threadid, memberid, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid,
            user_id: memberid
        }
        return threadMethod.getthreadmember(informations, queryParams)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    getMembers(threadid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid
        }
        return threadMethod.getthreadmembers(informations)
    }

    /**
     * 
     * @param {string} channelid 
     * @param {object} options 
     * @returns 
     */
    createWithoutMessage(channelid, options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: channelid
        }
        return threadMethod.create_withoutm(informations, options)
    }


    /**
     * 
     * @param {object} informations 
     * @param {object} [queryParams] 
     * @param {string} [queryParams.before] ID
     * @param {number} [queryParams.limit] 
     * @returns 
     */
    getPublicArchived(channelid, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return threadMethod.getpublicarchived(informations, queryParams)
    }

    /**
     * 
     * @param {object} informations 
     * @param {object} [queryParams] 
     * @param {string} [queryParams.before] ID
     * @param {number} [queryParams.limit] 
     * @returns 
     */
    getPrivateArchived(channelid, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return threadMethod.getprivatearchived(informations, queryParams)
    }

    /**
     * 
     * @param {object} informations 
     * @param {object} [queryParams] 
     * @param {string} [queryParams.before] ID
     * @param {number} [queryParams.limit] 
     * @returns 
     */
    getPrivateJoinedArchived(channelid, queryParams){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return threadMethod.getprivatejoined(informations, queryParams)
    }
}

module.exports = Threads