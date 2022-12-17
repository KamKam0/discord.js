const User = require("../Individual/User")
class Users{
    constructor(_bot){
        this.users = []
        this._bot = _bot
    }

    AddUser(user){
        if(this.users.find(us => us.id === user.id)) this.users.find(us => us.id === user.id).guilds.push(user.guild_id)
        else this.users.push(new User({...user, token: this._bot.discordjs.token}))
        return this
    }

    AddUsers(users){
        let topush = users.filter(us1 => !this.users.find(us2 => us2.id === us1.id))
        let tomodif = users.filter(us1 => this.users.find(us2 => us2.id === us1.id))
        if(topush[0]) this.users.push(...topush.map(sti => new User({...sti, token: this._bot.discordjs.token})))
        if(tomodif[0]) users.forEach(us2 => this.users.find(us => us.id === us2.id).guilds.push(us2.guild_id))
        return this
    }

    DeleteUser(ID){
        let user_i = ID.user
        let guild_i = ID.guild
        let u = this.users.find(sti => sti.id === user_i)
        u.guilds.splice(u.guilds.indexOf(u.guilds.find(gui => gui === guild_i)), 1)
        if(u.guilds.length === 0) this.users.splice(this.users.indexOf(u), 1)
        return this
    }

    DeleteUsers(IDS){
        IDS.forEach(ID => {
            let user_i = ID.user
            let guild_i = ID.guild
            let u = this.users.find(sti => sti.id === user_i)
            u.guilds.splice(u.guilds.indexOf(u.guilds.find(gui => gui === guild_i)), 1)
            if(u.guilds.length === 0) this.users.splice(this.users.indexOf(u), 1)
            return this
        })
        return this
    }

    CheckUsers(guild){
        let tocheck = this.users.filter(us => us.guilds.includes(guild.id))
        let to1 = tocheck.filter(us => !guild.members.find(us2 => us2.user.id === us.id))
        let to2 = tocheck.filter(us => guild.members.find(us2 => us2.user.id === us.id))
        let to3 = guild.members.filter(us => !tocheck.find(us2 => us2.id === us.user.id))
        if(to1[0]) this.DeleteUsers(to1.map(us => us.id))
        if(to3[0]) this.AddUsers(to1.map(us => { return {...us.user, guild_id: guild.id}}))
        to2.forEach(user => {
            let comparaison = this.get(user.id).CompareUser(guild.members.find(me => me.user.id === user.id))
            if(comparaison.state === false) this.get(user.id).Modify_Datas(guild.members.find(me => me.user.id === user.id))
        })
        return this
    }

    get(ID){
        return this.users.find(ba => ba.id === ID)
    }

    filter(filter){
        return this.users.filter(filter)
    }

    find(filter){
        return this.users.find(filter)
    }

    map(filter){
        return this.users.map(filter)
    }

    select(position){
        return this.users[position]
    }

    get length(){
        return this.users.length
    }
}

module.exports = Users