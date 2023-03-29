const BaseThreads = require("../managers/threads")
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
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid
        }
        return threadMethod.jointhread(informations)
    }

    /**
     * 
     * @param {string} threadid 
     * @param {string} memberid 
     * @returns 
     */
    addMember(threadid, memberid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid,
            user_id: memberid
        }
        return threadMethod.addthreadmember(informations)
    }

    /**
     * 
     * @param {string} threadid 
     * @param {string} memberid 
     * @returns 
     */
    removeMember(threadid, memberid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid,
            user_id: memberid
        }
        return threadMethod.removethreadmember(informations)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    leave(threadid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid
        }
        return threadMethod.leavethread(informations)
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
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid
        }
        return channelMethod.modify(informations, options)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    delete(threadid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid
        }
        return channelMethod.delete(informations)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    getMember(threadid, memberid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            guild_id: this.guild_id,
            channel_id: threadid,
            user_id: memberid
        }
        return threadMethod.getthreadmember(informations)
    }

    /**
     * 
     * @param {string} threadid 
     * @returns 
     */
    getMember(threadid){
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

    getPublicArchived(channelid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return threadMethod.getpublicarchived(informations)
    }

    getPrivateArchived(channelid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return threadMethod.getprivatearchived(informations)
    }

    getPrivateJoinedArchived(channelid){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            channel_id: channelid
        }
        return threadMethod.getprivatejoined(informations)
    }
}

module.exports = Threads