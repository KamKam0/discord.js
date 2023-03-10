const User = require("../Individual/User")
const Base = require("./baseMultiple")
class Users extends Base{
    constructor(_bot){
        super(_bot, null, "user")
    }

    __add(user){
        if(this.container.find(us => us.id === user.id)) this.container.find(us => us.id === user.id).guilds.push(user.guild_id)
        else this.container.push(new User({...user, token: this._bot.discordjs.token}, this._bot))
        return this
    }

    __addMultiple(users){
        let topush = users.filter(us1 => !this.container.find(us2 => us2.id === us1.id))
        let tomodif = users.filter(us1 => this.container.find(us2 => us2.id === us1.id))
        if(topush[0]) topush.map(sti => this.__add(sti))
        if(tomodif[0]) users.forEach(us2 => this.container.find(us => us.id === us2.id).guilds.push(us2.guild_id))
        return this
    }

    __delete(ID){
        let user_i = ID.user
        let guild_i = ID.guild
        let u = this.container.find(sti => sti.id === user_i)
        u.guilds.splice(u.guilds.indexOf(u.guilds.find(gui => gui === guild_i)), 1)
        if(u.guilds.length === 0) this.container.splice(this.container.indexOf(u), 1)
        return this
    }

    __deleteMultiple(IDS){
        IDS.map(us => this.__delete(us))
        return this
    }

    __CheckUsers(guild){
        let tocheck = this.container.filter(us => us.guilds.includes(guild.id))
        let to1 = tocheck.filter(us => !guild.members.find(us2 => us2.user.id === us.id))
        let to2 = tocheck.filter(us => guild.members.find(us2 => us2.user.id === us.id))
        let to3 = guild.members.filter(us => !tocheck.find(us2 => us2.id === us.user.id))
        if(to1[0]) this.__deleteMultiple(to1.map(us => us.id))
        if(to3[0]) this.__addMultiple(to1.map(us => { return {...us.user, guild_id: guild.id}}))
        to2.forEach(user => {
            let comparaison = this.container.find(e => e.id === user.id).__compareuser(guild.members.find(me => me.user.id === user.id))
            if(comparaison.state === false) this.container.find(e => e.id === user.id).__Modify_Datas(guild.members.find(me => me.user.id === user.id))
        })
        return this
    }
}

module.exports = Users