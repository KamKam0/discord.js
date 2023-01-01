const Member = require("../Individual/Member")
const Base = require("./baseMultiple")
class Members extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid)
    }

    get(ID){
        return this.container.find(ba => ba.user_id === ID)
    }

    AddMember(member){
        this.container.push(new Member({...member, token: this._bot.discordjs.token, guild_id: this.guild_id}, this._bot))
        return this
    }

    AddMembers(members){
        members.map(me => this.AddMember(me))
        return this
    }

    DeleteMember(ID){
        this.container.splice(this.container.indexOf(this.container.find(me => me.user.id === ID)), 1)
        return this
    }
}

module.exports = Members