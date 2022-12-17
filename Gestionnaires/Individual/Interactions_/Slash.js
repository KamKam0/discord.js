const User = require("../User")
class Slash{
    constructor(slash){
        this.id = slash.id
        this.application_id = slash.application_id
        this.guild_id = slash.guild_id
        this.channel_id = slash.channel_id
        this.data = slash.data
        this.channel = slash.channel ? slash.channel : require("../../../Utils/functions").channel_backup(slash.channel_id, slash.bot_token)
        this.user_id = slash.user ? slash.user.id : slash.member.user.id
        this.user = slash.user ? new User({...slash.user, token: slash.token}) : new User({...slash.member.user, token: slash.token})
        this.member = slash.member ? slash.member : null
        this.token = slash.token
        this.version = slash.version
        this.guild_locale = slash.guild_locale
        this.locale = slash.locale
        this.guild = slash.guild ? slash.guild : null
        this.bot_token = slash.bot_token
        this.bot_id = slash.bot_id
        this.vguild_id = slash.guild ? slash.guild.vguild_id : null
        this.typee = "slash"
    }

    get isslash(){
        return false
    }

    get isSlash(){
        return true
    }

    get isContextMenu(){
        return false
    }

    get isForm(){
        return false
    }

    SetMember(member){
        this.member = member
        if(this.message) this.message.SetMember(member)
        return this
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetChannel(channel){
        this.channel = channel
        if(this.message) this.message.SetChannel(channel)
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        if(this.message) this.message.SetGuild(guild)
        return this
    }

    Modify_Datas(inte){
        let tocheck = Object.entries(inte)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    GetOption(name){
        if(!receiving.data.options[0]) return null
        let toreturn = receiving.data.options.find(opt => opt.name.toLowerCase() === String(name).toLowerCase())
        if(toreturn) return toreturn
        else return null
    }

    GetOptions(){
        return receiving.data.options
    }

    reply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").reply(this.bot_token, this, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - reply, slash")
                er.content = err
                reject(er)
            })
        })
    }

    modifyreply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").modifyreply(this.bot_token, this.bot_id, this, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modifyreply, slash")
                er.content = err
                reject(er)
            })
        })
    }

    deletereply(){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").deletereply(this.bot_token, this.bot_id, this)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - deletereply, slash")
                er.content = err
                reject(er)
            })
        })
    }
    
    get createdAt(){
        return  require("../../../Methods/general").createdAt(this.id, "interaction")
    }

    SendSpe(msg, truetype, type){
        return new Promise(async (resolve, reject) => {
            if(!type) type = "reply"
            let embed = new (require("../../../Classes/Embed"))()
            switch(truetype){
                case("error"): 
                    embed
                    .setDescription(`❌ | ${msg}`)
                    .setColor("RED")
                break;
                case("success"): 
                    embed
                    .setDescription(`✅ | ${msg}`)
                    .setColor("GREEN")
                break;
                case("warn"): 
                    embed
                    .setDescription(`❗️ | ${msg}`)
                    .setColor("ORANGE")
                break;
                case("info"): 
                    embed
                    .setDescription(`📣 | ${msg}`)
                    .setColor("WHITE")
                break;
                case("wait"): 
                    embed
                    .setDescription(`💤 | ${msg}`)
                    .setColor("YELLOW")
                break;
                default: 
                    return reject(new Error("invalid truetype"))
                break;
            }
            if(type === "reply"){
                require("../../../Methods/interaction").reply(this.bot_token, this, {embeds: [embed]})
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - reply, slash sendspe")
                    er.content = err
                    reject(er)
                })
            } 
            if(type === "send"){
                require("../../../Methods/message").send(this.bot_token, this.channel_id, {embeds: [embed]})
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - send, slash sendspe")
                    er.content = err
                    reject(er)
                })
            }
        })
    }

    error(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "error", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - error, slash")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    success(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "success", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - success, slash")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    warn_se(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "warn", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - warn_se, slash")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    info(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "info", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - info, slash")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    wait(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "wait", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - wait, slash")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Slash