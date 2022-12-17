const Message = require("../Message")
const User = require("../User")
class Menu{
    constructor(menu){
        this.id = menu.id
        this.application_id = menu.application_id
        this.custom_id = menu.data.custom_id
        this.values = menu.data.values
        this.guild_id = menu.guild_id
        this.channel_id = menu.channel_id
        this.message = menu.message ? (new Message({...menu.message, guild_id: menu.guild_id, channel_id: menu.channel_id, token: menu.bot_token})) : null
        this.channel = menu.channel ? menu.channel : require("../../../Utils/functions").channel_backup(menu.channel_id, menu.bot_token)
        this.user_id = menu.user ? menu.user.id : menu.member.user.id
        this.user = menu.user ? new User({...menu.user, token: menu.token}) : new User({...menu.member.user, token: menu.token})
        this.member = menu.member ? menu.member : null
        this.token = menu.token
        this.version = menu.version
        this.guild_locale = menu.guild_locale
        this.locale = menu.locale
        this.guild = menu.guild ? menu.guild : null
        this.bot_token = menu.bot_token
        this.bot_id = menu.bot_id
        this.vguild_id = menu.guild ? menu.guild.vguild_id : null
        this.typee = "menu"
    }

    get iscontextmenu(){
        return false
    }

    get isSlash(){
        return false
    }

    get isContextMenu(){
        return true
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

    reply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").reply(this.bot_token, this, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - reply, contextmenu")
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
                let er = new Error("Une erreur s'est produite lors de la requête - modifyreply, contextmenu")
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
                let er = new Error("Une erreur s'est produite lors de la requête - deletereply, contextmenu")
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
                    let er = new Error("Une erreur s'est produite lors de la requête - reply, contextmenu sendspe")
                    er.content = err
                    reject(er)
                })
            } 
            if(type === "send"){
                require("../../../Methods/message").send(this.bot_token, this.channel_id, {embeds: [embed]})
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - send, contextmenu sendspe")
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
                let er = new Error("Une erreur s'est produite lors de la requête - error, contextmenu")
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
                let er = new Error("Une erreur s'est produite lors de la requête - success, contextmenu")
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
                let er = new Error("Une erreur s'est produite lors de la requête - warn_se, contextmenu")
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
                let er = new Error("Une erreur s'est produite lors de la requête - info, contextmenu")
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
                let er = new Error("Une erreur s'est produite lors de la requête - wait, contextmenu")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Menu