const Base = require("../bases/basemultiple")
const threadMember = require("../singles/threadmember")

class ThreadMembers extends Base{
    constructor(_bot, guild_id, threadid){
        super(_bot, guild_id, "threadmember")
        this.thread_id = threadid
    }

    _modify(data){
        let instance = this.get(data.user_id)
        if(!instance) return
        let modifications = instance._modifyDatas(data)
        if(modifications.length) return modifications
        this._delete(data.user_id)
        this._add(data)
    }

    _add(data){
        this.container.push(new threadMember({...data, guild_id: this.guild_id, id: this.thread_id}, this._bot))
        return this
    }

    get(ID){
        return this.container.find(el => el.user_id === ID)
    }

    _delete(data){
        if(this.container.find(me => me.user_id === data)) this.container.splice(this.container.indexOf(this.container.find(me => me.user_id === data)), 1)
        return this
    }
}

module.exports = ThreadMembers