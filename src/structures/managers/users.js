const User = require("../singles/user")
const Base = require("../bases/basemultiple")
class Users extends Base{
    constructor(_bot){
        super(_bot, null, "user")
    }

    _modify(data){
        let instance = this.get(data.id)
        if(!instance) return
        let modifications = instance._modifyDatas(data)
        if(modifications.length) return modifications
    }

    _add(user){
        if(this.container.find(us => us.id === user.id)) this.container.find(us => us.id === user.id).guilds.push(user.guild_id)
        else this.container.push(new User(user, this._bot))
        return this
    }

    _addMultiple(users){
        let topush = users.filter(us1 => !this.container.find(us2 => us2.id === us1.id))
        let tomodif = users.filter(us1 => this.container.find(us2 => us2.id === us1.id))
        if(topush[0]) topush.map(sti => this._add(sti))
        if(tomodif[0]) users.forEach(us2 => this.container.find(us => us.id === us2.id).guilds.push(us2.guild_id))
        return this
    }

    _delete(data){
        let user = this.get(data.user)
        if(!user) return
        user.guilds.splice(user.guilds.indexOf(user.guilds.find(gui => gui === data.guild)), 1)
        if(user.guilds.length === 0) this.container.splice(this.container.indexOf(this.get(data.user)), 1)
        return this
    }

    _deleteMultiple(IDS){
        IDS.map(us => this._delete(us))
        return this
    }

    _CheckUsers(guild){
        let tocheck = this.container.filter(us => us.guilds.includes(guild.id))
        let to1 = tocheck.filter(us => !guild.members.find(us2 => us2.user.id === us.id))
        let to2 = tocheck.filter(us => guild.members.find(us2 => us2.user.id === us.id))
        let to3 = guild.members.filter(us => !tocheck.find(us2 => us2.id === us.user.id))
        if(to1[0]) this._deleteMultiple(to1.map(us => us.id))
        if(to3[0]) this._addMultiple(to1.map(us => { return {...us.user, guild_id: guild.id}}))
        to2.forEach(user => {
            let comparaison = this.container.find(e => e.id === user.id)._compareuser(guild.members.find(me => me.user.id === user.id))
            if(comparaison.state === false) this.container.find(e => e.id === user.id)._modifyDatas(guild.members.find(me => me.user.id === user.id))
        })
        return this
    }
}

module.exports = Users